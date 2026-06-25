# Codebase Concerns

**Analysis Date:** 2026-06-25

## Tech Debt

**LinkedIn scrape pipeline (dev-only, high maintenance):**
- Issue: Entire content refresh depends on Playwright scraping a logged-in LinkedIn session against a DOM that LinkedIn changes frequently. Selectors, `innerText` parsing, fixed `waitForTimeout` delays, and hardcoded page markers (`prophub`, `Berrytech`, `Hurb` in `EXPERIENCE_PAGE_MARKERS`) are brittle.
- Files: `src/lib/linkedin/scrape-playwright.ts`, `src/lib/linkedin/parse-testimonials.ts`, `src/lib/linkedin/parse-dates.ts`, `scripts/sync-linkedin.ts`, `scripts/linkedin-login.ts`
- Impact: Sync fails silently or produces partial/wrong data after LinkedIn UI changes; markers tied to one person's employers break for other profiles.
- Fix approach: Treat scrape as best-effort; commit `public/data/profile.json` as source of truth; consider manual edit workflow or official API; parameterize markers via env/config; replace fixed sleeps with deterministic waits; add scrape integration tests with HTML fixtures.

**Google Translate unofficial API for EN adaptation:**
- Issue: `translate-text.ts` calls `translate.googleapis.com/translate_a/single?client=gtx` — an undocumented endpoint that can rate-limit, block, or change response shape without notice. Adaptation prompts are sent through the same translate path (not a real LLM).
- Files: `src/lib/linkedin/translate-text.ts`, `src/lib/linkedin/translate-testimonials.ts`, `scripts/translate-testimonials.ts`
- Impact: Testimonial EN text may be untranslated, garbled, or include leaked prompt fragments (detected via `needsEnglishVersion` heuristics); sync/translate scripts fail on HTTP errors.
- Fix approach: Use a supported translation API with key; or hand-review EN copy in `profile.json`; cache translations; add retry/backoff.

**Dead Proxycurl normalization path:**
- Issue: `normalizeProxycurl()` in `normalize.ts` maps a Proxycurl API shape that is not wired into `scripts/sync-linkedin.ts` or any runtime path — only referenced in unit tests.
- Files: `src/lib/linkedin/normalize.ts`, `src/lib/linkedin/__tests__/normalize.test.ts`
- Impact: Misleading architecture; maintenance burden for unused code.
- Fix approach: Remove or document as optional future path; wire behind env flag if still planned.

**English fallback helper is incomplete / buggy:**
- Issue: `applyEnglishFallback()` applies `translateLine()` only to headlines and experience titles. `aboutEn` and `descEn` branches assign `profile.about.en` / `exp.description.en` in both branches of the ternary — when PT and EN are identical (common when EN scrape fails), about and descriptions are never translated.
- Files: `src/lib/linkedin/english-fallback.ts`
- Impact: English locale can show Portuguese about body or experience descriptions after sync when LinkedIn EN locale returns PT copy.
- Fix approach: Mirror headline logic for about/description; or rely solely on dual-locale scrape + translate pipeline.

**Experience logo index coupling:**
- Issue: `extractExperiences()` assigns `logoUrl: logos[i]` by array index, assuming DOM logo order matches parsed experience order.
- Files: `src/lib/linkedin/scrape-playwright.ts` (lines 287–293)
- Impact: Wrong company logo on experience cards after UI reorder or extra images in `main`.
- Fix approach: Match logos to companies by alt text, nearby text, or company name heuristics.

**Fuzzy locale merge for experiences/testimonials:**
- Issue: `mergeLocales()` matches EN experiences to PT by `companyKey()` substring/includes logic; testimonial merge uses similar fuzzy key matching.
- Files: `src/lib/linkedin/normalize.ts` (lines 159–200)
- Impact: Duplicate experience entries or merged wrong rows when company names differ slightly between PT/EN scrapes.
- Fix approach: Stable IDs from LinkedIn URLs or normalized company+date keys; stricter equality before fuzzy fallback.

**Skills not scraped:**
- Issue: `normalizeScraped()` always sets `skills: []`; skills survive sync only via `mergeApiWithSeed()` preserving seed `profile.json` values.
- Files: `src/lib/linkedin/normalize-scraped.ts`, `src/lib/linkedin/normalize.ts` (`mergeApiWithSeed`)
- Impact: Fresh sync without seed file drops skills; skills drift from LinkedIn unless manually edited.
- Fix approach: Scrape skills section or maintain skills as hand-curated field outside sync.

**Unused `avatarUrl` in UI:**
- Issue: `Profile.avatarUrl` is populated (often from LinkedIn CDN) but no section component renders it; local fallback `/img/avatarzin.jpg` exists but is unused in React tree.
- Files: `src/types/profile.ts`, `public/data/profile.json`, `src/components/sections/HeroSection.tsx`
- Impact: Dead field; expiring CDN URL committed with no user-visible benefit.
- Fix approach: Wire avatar into Hero or drop field from schema; pin to `/img/avatarzin.jpg` on sync.

**No ESLint / Prettier:**
- Issue: No lint or format scripts in `package.json`; no eslint/prettier config in repo.
- Files: `package.json`
- Impact: Style drift; no automated catch for common TS/React issues.
- Fix approach: Add minimal ESLint + Prettier aligned with Vite/React 19 stack.

**Locale preference not persisted:**
- Issue: `LocaleProvider` detects browser language on mount but does not persist manual toggle to `localStorage`; refresh reverts to browser default.
- Files: `src/context/LocaleContext.tsx`
- Impact: User language choice lost on reload.
- Fix approach: Persist `locale` to `localStorage` with same detection as initial fallback.

**Hardcoded copy inconsistencies:**
- Issue: Hero scroll hint is English-only (`"Scroll"`); mobile nav shows `"Menu"` for both locales.
- Files: `src/components/sections/HeroSection.tsx`, `src/components/layout/Sidebar.tsx`
- Impact: Mixed-language UI when locale is PT.
- Fix approach: Use `lang`/`t()` pattern like other sections.

## Known Bugs

**Session expiry during scrape:**
- Symptoms: Sync throws `Sessão expirada. Rode: npm run linkedin:login` or redirect to `/login` / `/checkpoint`.
- Files: `src/lib/linkedin/scrape-playwright.ts` (`assertLoggedIn`), `src/lib/linkedin/browser-context.ts`
- Trigger: LinkedIn session cookies in `.linkedin/browser-profile` expire or checkpoint challenge.
- Workaround: Re-run `npm run linkedin:login`, then `SYNC_LINKEDIN=1 npm run sync:linkedin`.

**English fallback no-op for about/descriptions:**
- Symptoms: EN locale shows PT text in About or experience bullets when scrape returns identical PT/EN strings.
- Files: `src/lib/linkedin/english-fallback.ts` (lines 22–24, 31–33)
- Trigger: LinkedIn EN locale page still serves Portuguese content; `applyEnglishFallback` runs before testimonial translation.
- Workaround: Manually edit `public/data/profile.json` EN fields; or run full dual-locale scrape that populates distinct EN copy.

**Silent swallow of "see more" click failures:**
- Symptoms: Truncated about/experience/testimonial text when expand buttons fail to click.
- Files: `src/lib/linkedin/scrape-playwright.ts` (`expandAllSeeMore`, `.catch(() => {})`)
- Trigger: Button label change, overlay, or timeout.
- Workaround: Re-run sync; inspect scraped JSON length.

**Chrome channel dependency for Playwright:**
- Symptoms: `openLinkedInBrowser()` fails if Google Chrome is not installed (`channel: "chrome"`).
- Files: `src/lib/linkedin/browser-context.ts`
- Trigger: CI, Linux without Chrome, or headless-only environments.
- Workaround: Install Chrome locally; or switch to bundled Chromium for scrape-only runs.

## Security Considerations

**LinkedIn session stored on disk:**
- Risk: `.linkedin/browser-profile` holds authenticated session cookies; compromise of dev machine exposes LinkedIn account.
- Files: `.linkedin/browser-profile` (gitignored), `src/lib/linkedin/browser-context.ts`, `.gitignore`
- Current mitigation: Directory gitignored; sync is opt-in (`SYNC_LINKEDIN=1`).
- Recommendations: Never commit browser profile; treat as credential; document rotation; avoid running sync on shared machines.

**Scraping LinkedIn ToS:**
- Risk: Automated scraping may violate LinkedIn Terms of Service; account restriction possible.
- Files: Entire `src/lib/linkedin/` scrape pipeline
- Current mitigation: Scrape is local dev-only; production serves static JSON.
- Recommendations: Keep runtime scrape-free; prefer manual content updates for production.

**External image URLs (LinkedIn CDN):**
- Risk: Hotlinked `media.licdn.com` URLs in committed JSON can expire (`e=` query param); broken images; third-party request leaks visitor IP to LinkedIn when images load.
- Files: `public/data/profile.json`, `src/components/ui/CompanyLogo.tsx`
- Current mitigation: `preferLocalLogo()` maps known companies to `/public/img/` overrides.
- Recommendations: Download avatar and uncached logos to `/public/img/` during sync; replace CDN URLs before commit.

**No Content-Security-Policy:**
- Risk: No CSP in `index.html` or `vercel.json`; default browser behavior allows any script/img origin.
- Files: `index.html`, `vercel.json`
- Current mitigation: Static SPA with no user-generated runtime content.
- Recommendations: Add CSP allowing self + known img hosts if keeping CDN images temporarily.

**Environment config minimal:**
- Risk: Only `LINKEDIN_PROFILE_URL` documented; hardcoded fallback slug `zaqueu1` in scrape and normalize if env missing.
- Files: `.env.example`, `src/lib/linkedin/scrape-playwright.ts`, `src/lib/linkedin/normalize-scraped.ts`
- Recommendations: Fail fast when `LINKEDIN_PROFILE_URL` unset during sync; remove hardcoded personal defaults from library code.

## Performance Bottlenecks

**Playwright postinstall (~300MB Chromium):**
- Problem: `postinstall` runs `playwright install chromium` on every local `npm install` when not on Vercel.
- Files: `package.json` (`postinstall`)
- Cause: Playwright bundled as devDependency for scrape scripts.
- Improvement path: Move Playwright to optional dependency or document `npx playwright install` as manual step; keep `$VERCEL` skip (already present).

**Sequential testimonial translation:**
- Problem: `translateTestimonials()` processes testimonials one-by-one in a `for` loop with multiple API calls each.
- Files: `src/lib/linkedin/translate-testimonials.ts`
- Cause: No batching or concurrency control.
- Improvement path: Bounded parallel map (e.g. 2–3 at a time) with delay to respect rate limits.

**Fixed scrape timeouts stack:**
- Problem: Each locale scrape uses three page loads with 2.5s waits plus up to 90s `waitForFunction` timeouts — full sync runs PT + EN sequentially (~minutes).
- Files: `src/lib/linkedin/scrape-playwright.ts`, `scripts/sync-linkedin.ts`
- Cause: Intentional conservative waits for LinkedIn SPA.
- Improvement path: Parallel locale scrapes in separate contexts (if session allows); reduce redundant waits after stable selectors.

**Runtime profile fetch:**
- Problem: Client fetches `/data/profile.json` on every page load with no cache headers strategy in app code.
- Files: `src/hooks/useProfile.ts`
- Cause: Simple `fetch()` with no SWR/cache.
- Improvement path: Acceptable for small JSON; add `Cache-Control` on Vercel or import JSON at build time for zero client fetch.

## Fragile Areas

**Text-based LinkedIn parsers:**
- Files: `src/lib/linkedin/scrape-playwright.ts` (`parseExperiencesFromText`), `src/lib/linkedin/parse-testimonials.ts`
- Why fragile: Depend on `main.innerText` layout, noise regexes, and UI-specific markers like `\n\n· 1º\n\n`; legacy fallback path when badge line missing.
- Safe modification: Add fixture tests from saved HTML/text snapshots before changing regexes; run against real scrape output.
- Test coverage: `parse-testimonials.test.ts` has one fixture; no tests for experience parser or scrape orchestration.

**Date range parsing:**
- Files: `src/lib/linkedin/parse-dates.ts`
- Why fragile: Regex-only; chooses PT vs EN month map from single line heuristic; misses formats like "March 2023 - Present" without day.
- Safe modification: Add unit tests for PT/EN variants seen in production JSON.
- Test coverage: None.

**Merge + seed pipeline:**
- Files: `scripts/sync-linkedin.ts`, `src/lib/linkedin/normalize.ts`
- Why fragile: Order of operations (merge locales → merge seed → english fallback → translate testimonials) affects final JSON; seed file masks scrape gaps.
- Safe modification: Diff `profile.json` after sync in review; document pipeline order in script header.
- Test coverage: Partial (`mergeLocales`, `normalizeProxycurl` only).

**React error surface:**
- Files: `src/App.tsx`, `src/hooks/useProfile.ts`
- Why fragile: No React error boundaries; render errors in any section crash entire app; profile load error shows plain text only.
- Safe modification: Wrap sections in error boundary; improve empty/error states.
- Test coverage: No component tests.

## Scaling Limits

**LinkedIn sync concurrency:**
- Current capacity: One browser context, sequential PT then EN scrape.
- Limit: Cannot sync multiple profiles or parallelize without separate browser profiles.
- Scaling path: N/A for current scope.

**Translation throughput:**
- Current capacity: Unbounded sequential HTTP to Google Translate endpoint.
- Limit: Rate limits or IP blocks on bulk re-translate.
- Scaling path: Official API with quotas; offline batch.

## Dependencies at Risk

**Playwright 1.60 + Chrome channel:**
- Risk: Requires local Chrome install; Playwright version tied to Chromium compatibility; heavy install.
- Impact: Broken dev sync on machines without Chrome; CI complexity if scrape tested in CI.
- Migration plan: Use Playwright bundled browser for headless scrape; document Chrome requirement only for login flow.

**Unofficial Google Translate endpoint:**
- Risk: No SLA; Google can block `client=gtx` traffic.
- Impact: `translate:testimonials` and sync translation step fail.
- Migration plan: DeepL, Google Cloud Translation API, or remove auto-translate.

**LinkedIn DOM (external):**
- Risk: Class names (`pvs-list`, profile picture selectors) and section headings change without notice.
- Impact: Empty testimonials, wrong header fields, failed ready checks.
- Migration plan: DOM fixtures + periodic manual sync verification.

## Missing Critical Features

**SEO / social meta:**
- Problem: `index.html` has static title `"zaqueu.tech"` and generic description; no Open Graph, Twitter cards, canonical URL, or locale-specific meta. Content is invisible to crawlers that do not execute JS.
- Blocks: Rich link previews, search indexing of profile content, per-locale SERP.

**Analytics:**
- Problem: No analytics integration (Plausible, GA, Vercel Analytics, etc.).
- Blocks: Traffic and conversion measurement on CTA.

**Client routing:**
- Problem: Single page with hash-less scroll navigation only; no deep links to sections beyond `#about` etc.; no 404 handling.
- Blocks: Shareable section URLs with full SSR meta (minor for portfolio).

**Error boundaries:**
- Problem: No `ErrorBoundary` components anywhere in tree.
- Blocks: Graceful degradation when a child component throws.

**Profile schema validation:**
- Problem: `useProfile()` casts JSON to `Profile` without runtime validation; corrupt JSON fails at render time.
- Blocks: Early detection of bad sync output.

## Test Coverage Gaps

**LinkedIn scrape orchestration:**
- What's not tested: Full `scrapeLinkedInProfile`, `parseExperiencesFromText`, browser login flow.
- Files: `src/lib/linkedin/scrape-playwright.ts`, `scripts/*.ts`
- Risk: Regressions only found on manual sync.
- Priority: High

**Translation pipeline:**
- What's not tested: `translatePtToEn`, `adaptPtToEn`, `translateTestimonials`, chunk splitting, prompt stripping.
- Files: `src/lib/linkedin/translate-text.ts`, `src/lib/linkedin/translate-testimonials.ts`
- Risk: Silent bad EN copy or thrown errors in CI-less path.
- Priority: Medium

**English fallback:**
- What's not tested: `applyEnglishFallback` (including known about/description bug).
- Files: `src/lib/linkedin/english-fallback.ts`
- Risk: EN locale content wrong after sync.
- Priority: Medium

**UI components and hooks:**
- What's not tested: Sections, `useProfile`, `LocaleContext`, `formatDescription`, `heroIntro`.
- Files: `src/components/**`, `src/hooks/**`, `src/context/LocaleContext.tsx`
- Risk: Visual/regression bugs undetected.
- Priority: Low (small surface)

**E2E / Playwright tests:**
- What's not tested: No Playwright test suite despite dependency; Playwright used only for scraping.
- Files: `package.json`
- Risk: No automated verification of deployed portfolio.
- Priority: Low

---

*Concerns audit: 2026-06-25*
