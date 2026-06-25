<!-- refreshed: 2026-06-25 -->
# Architecture

**Analysis Date:** 2026-06-25

## System Overview

```text
┌─────────────────────────────────────────────────────────────────┐
│                     Browser (SPA, no router)                     │
├─────────────────────────────────────────────────────────────────┤
│  index.html → main.tsx → App.tsx                                 │
│    └── LocaleProvider (locale state, t() resolver)               │
│         ├── GlassBackground (fixed #000 backdrop)              │
│         └── PortfolioContent                                     │
│              └── useProfile() → fetch /data/profile.json       │
│                   └── AppShell (header + main)                   │
│                        ├── HeroSection                           │
│                        ├── AboutSection                          │
│                        ├── ExperienceSection                     │
│                        ├── TestimonialsSection                   │
│                        ├── CtaSection                            │
│                        └── Footer                                │
└────────────────────────────┬────────────────────────────────────┘
                             │ build-time / dev-only
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  LinkedIn (Playwright session)                                   │
│    scripts/sync-linkedin.ts                                      │
│      → scrape PT + EN → normalize → merge → translate            │
│      → public/data/profile.json (committed, served statically)   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| `App` | Root composition: locale provider, background, profile loading gate | `src/App.tsx` |
| `LocaleProvider` | Browser locale detection, manual toggle, `t()` for `LocalizedString` | `src/context/LocaleContext.tsx` |
| `PortfolioContent` | Fetches profile, handles loading/error, renders sections | `src/App.tsx` |
| `AppShell` | Fixed header (nav, social, lang toggle), scroll layout shell | `src/components/layout/AppShell.tsx` |
| `HeroSection` | Name, headline, hero intro, skills, scroll hint | `src/components/sections/HeroSection.tsx` |
| `AboutSection` | Remaining about paragraphs (skips hero intro) | `src/components/sections/AboutSection.tsx` |
| `ExperienceSection` | Experience cards with logos, bullets, periods | `src/components/sections/ExperienceSection.tsx` |
| `TestimonialsSection` | Recommendation quotes and attribution | `src/components/sections/TestimonialsSection.tsx` |
| `CtaSection` | Contact mailto CTA | `src/components/sections/CtaSection.tsx` |
| `Footer` | Social links, copyright | `src/components/layout/Footer.tsx` |
| `GlassBackground` | Pure black fixed backdrop (no blur/glass) | `src/components/glass/GlassBackground.tsx` |
| `MobileNav` | Sheet sidebar for section anchor navigation | `src/components/layout/Sidebar.tsx` |

## Pattern Overview

**Overall:** Static-site React SPA with build-time data pipeline

**Key Characteristics:**
- No client-side router — single page with `#section` anchor scroll navigation
- All portfolio content lives in committed JSON; runtime is read-only fetch
- Bilingual via `LocalizedString { pt, en }` resolved at render time through `useLocale().t()`
- LinkedIn scraping is dev-only; production never calls Playwright or external APIs
- Dark-only design; tokens and typography live in CSS custom properties and `.ds-*` classes

## Layers

**Presentation (React components):**
- Purpose: Render sections, layout chrome, and shadcn/Radix UI primitives
- Location: `src/components/`
- Contains: Section components, layout (`AppShell`, `Footer`, `Sidebar`), UI primitives (`button`, `sheet`, `TagList`, etc.)
- Depends on: `useLocale()`, `useProfile()` (indirectly via props), lib formatters
- Used by: `src/App.tsx`

**Application state (React context + hooks):**
- Purpose: Locale selection and profile loading lifecycle
- Location: `src/context/LocaleContext.tsx`, `src/hooks/`
- Contains: `LocaleProvider`, `useProfile`, `useScrollHintOpacity`
- Depends on: `src/types/profile.ts`
- Used by: All section and layout components

**Domain / view helpers (pure functions):**
- Purpose: Text splitting, date formatting, logo resolution, LinkedIn text cleanup
- Location: `src/lib/`
- Contains: `hero-intro.ts`, `format.ts`, `company-logos.ts`, `utils.ts` (`cn`)
- Depends on: Nothing at runtime (LinkedIn modules also used by scripts)
- Used by: Section components and LinkedIn sync pipeline

**Data (static JSON + types):**
- Purpose: Single source of truth for portfolio content at runtime
- Location: `public/data/profile.json`, `src/types/profile.ts`
- Contains: `Profile`, `Experience`, `Testimonial`, `LocalizedString`, `SocialLink`
- Depends on: Nothing
- Used by: `useProfile()` → section props

**Build / sync pipeline (Node scripts, dev-only):**
- Purpose: Scrape LinkedIn, normalize locales, translate testimonials, write JSON
- Location: `scripts/`, `src/lib/linkedin/`
- Contains: Playwright scraper, normalizers, translators, merge logic
- Depends on: `.env` (`LINKEDIN_PROFILE_URL`), `.linkedin/browser-profile` session
- Used by: `npm run sync:linkedin` (opt-in via `SYNC_LINKEDIN=1`)

## Data Flow

### Primary Request Path (runtime)

1. **Bootstrap** — `index.html` loads `/src/main.tsx`, which mounts `<App />` in `#root` with `StrictMode` (`src/main.tsx:6-9`).
2. **Locale init** — `LocaleProvider` runs `detectLocale()` from `navigator.languages`; PT if any tag starts with `pt`, else EN (`src/context/LocaleContext.tsx:23-31`). Sets `document.documentElement.lang` to `pt-BR` or `en-US`.
3. **Profile fetch** — `PortfolioContent` calls `useProfile()`, which `fetch("/data/profile.json")` once on mount (`src/hooks/useProfile.ts:9-17`).
4. **Loading gate** — While loading, `AppShell` renders `ProfileSkeleton`; on error, shows destructive message (`src/App.tsx:30-44`).
5. **Render sections** — On success, `profile` is passed as props to each section. Each section calls `t(field)` for localized strings and `lang` for hardcoded UI copy (section titles, CTA text).
6. **Navigation** — `onNavigate(sectionId)` calls `document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })` (`src/App.tsx:26-28`). Section IDs: `top`, `about`, `experiences`, `testimonials`, `contact`.

### LinkedIn Sync Path (dev-only)

1. **Opt-in** — `scripts/sync-linkedin.ts` exits unless `SYNC_LINKEDIN=1` (`scripts/sync-linkedin.ts:22-27`).
2. **Scrape** — Playwright scrapes profile in PT and EN via `scrapeLinkedInProfile("pt"|"en")` (`src/lib/linkedin/scrape-playwright.ts`).
3. **Normalize per locale** — `normalizeScraped(data, locale)` builds partial `Profile` with empty opposite locale fields (`src/lib/linkedin/normalize-scraped.ts`).
4. **Merge locales** — `mergeLocales(pt, en)` combines PT/EN into single `Profile` with both locale fields populated (`src/lib/linkedin/normalize.ts`).
5. **Seed merge** — Optional `loadSeedProfile()` + `mergeApiWithSeed()` preserves manual overrides from existing JSON.
6. **Fallback + translate** — `applyEnglishFallback()` fills missing EN from PT; `translateTestimonials()` machine-translates testimonial EN fields.
7. **Logo resolution** — `preferLocalLogo()` in normalizer prefers `/public/img/` overrides over LinkedIn CDN URLs (`src/lib/company-logos.ts`).
8. **Write artifact** — `public/data/profile.json` written with `lastSyncedAt`; committed and deployed as static asset.

### Content Transformation at Render Time

| Step | Function | Used in |
|------|----------|---------|
| Hero first paragraph | `heroIntro(t(profile.about))` | `HeroSection` |
| About remainder | `aboutBody(t(profile.about))` | `AboutSection` |
| Experience bullets | `formatDescription(t(description))` | `ExperienceSection` |
| Date range | `formatPeriod(start, end, lang)` | `ExperienceSection` |
| Relationship line | `stripRelationshipDate(t(relationship))` | `TestimonialsSection` |
| Company logo | `logoUrl` from JSON (already resolved at sync) | `CompanyLogo` |

**State Management:**
- Locale: React context (`LocaleProvider`) — no persistence across reloads beyond browser detection
- Profile: Local `useState` in `useProfile` — fetched once, no cache invalidation
- Scroll hint opacity: Local state in `useScrollHintOpacity` — derived from `window.scrollY`
- No Redux, Zustand, or React Query

## Key Abstractions

**`LocalizedString`:**
- Purpose: Bilingual copy carrier for all profile-sourced text
- Examples: `src/types/profile.ts`, every string field in `public/data/profile.json`
- Pattern: `{ pt: string; en: string }` resolved via `t(value)` → `value[locale]`

**`Profile`:**
- Purpose: Top-level domain model for the entire portfolio dataset
- Examples: `src/types/profile.ts:34-47`
- Pattern: Flat object with nested arrays (`experiences`, `testimonials`, `socialLinks`); sections receive whole `profile` and pick fields

**`t()` resolver:**
- Purpose: Locale-aware string lookup without i18n framework
- Examples: `src/context/LocaleContext.tsx:45-48`
- Pattern: Generic over `{ pt: string; en: string }`; memoized callback keyed on `locale`

**Design system (`.ds-*`):**
- Purpose: Typography and layout tokens as CSS component classes
- Examples: `.ds-display`, `.ds-body`, `.layout-shell`, `.site-header` in `src/index.css`
- Pattern: Tailwind v4 `@theme inline` maps HSL tokens; `@layer components` defines semantic classes; body defaults to uppercase monospace

**shadcn/ui + `cn()`:**
- Purpose: Accessible Radix primitives with Tailwind styling
- Examples: `src/components/ui/sheet.tsx`, `src/lib/utils.ts`
- Pattern: `cn(clsx(...))` via `tailwind-merge` for conditional classes

## Entry Points

**Browser entry:**
- Location: `index.html` → `src/main.tsx`
- Triggers: Page load
- Responsibilities: Mount React root, import global CSS

**App root:**
- Location: `src/App.tsx`
- Triggers: React render tree
- Responsibilities: Wrap in `LocaleProvider`, compose layout and sections

**LinkedIn sync:**
- Location: `scripts/sync-linkedin.ts`
- Triggers: `SYNC_LINKEDIN=1 npm run sync:linkedin`
- Responsibilities: Full scrape → normalize → write pipeline

**LinkedIn login (session bootstrap):**
- Location: `scripts/linkedin-login.ts`
- Triggers: `npm run linkedin:login`
- Responsibilities: Open persistent Chromium profile at `.linkedin/browser-profile`

**Testimonials-only re-translate:**
- Location: `scripts/translate-testimonials.ts`
- Triggers: `npm run translate:testimonials`
- Responsibilities: Re-run translation on existing `profile.json` without full scrape

## Architectural Constraints

- **Threading:** Single-threaded browser event loop; Playwright runs in Node during sync only
- **Global state:** Only `LocaleContext`; profile is prop-drilled from `App` to sections (no ProfileContext)
- **Circular imports:** Scripts import from `src/lib/linkedin/` and `src/types/` — shared code lives in `src/` intentionally; `tsconfig.app.json` excludes scripts from app build
- **No SSR:** Client-only Vite SPA; `navigator` access in `detectLocale()` guarded with `typeof navigator === "undefined"` for safety
- **Static deploy:** Vercel serves `dist/`; `profile.json` must be present in `public/` at build time
- **Dark only:** No theme toggle; `:root` tokens are fixed black/white/lilac

## Anti-Patterns

### Mixed localization sources

**What happens:** Profile fields use `LocalizedString` + `t()`, but section headings and nav labels use inline `lang ? "PT" : "EN"` strings in components (`AboutSection`, `ExperienceSection`, `Sidebar`).

**Why it's wrong:** Adding a third locale or centralizing copy requires editing many components instead of data.

**Do this instead:** Keep section chrome copy inline for now (current convention); move to a `src/copy/` or `LocalizedString` map if i18n scope grows.

### Fetching profile without validation

**What happens:** `useProfile` casts response directly to `Profile` with no runtime schema check (`src/hooks/useProfile.ts:15`).

**Why it's wrong:** Malformed JSON fails silently at render (missing fields) rather than at load.

**Do this instead:** Add a lightweight validator (e.g. Zod) in `useProfile` if JSON shape drift becomes a problem; today shape is controlled by the sync script.

### Hardcoded email in multiple places

**What happens:** `oliveira.eduardo08@gmail.com` appears in `AppShell.tsx` and `CtaSection.tsx`.

**Why it's wrong:** Contact change requires two edits.

**Do this instead:** Extract to `src/lib/constants.ts` or include in `profile.json` if it should be data-driven.

## Error Handling

**Strategy:** Fail visibly in UI; throw in hooks/context for misuse

**Patterns:**
- Profile fetch: HTTP errors caught → `error` string state → red `<p className="text-destructive">` in `App` (`src/App.tsx:38-43`)
- Context misuse: `useLocale()` throws if outside `LocaleProvider` (`src/context/LocaleContext.tsx:67-68`)
- Sync script: Uncaught errors log to stderr and `process.exit(1)` (`scripts/sync-linkedin.ts:55-57`)
- Empty sections: `AboutSection` and `TestimonialsSection` return `null` when no content

## Cross-Cutting Concerns

**Logging:** `console.log`/`console.error` in sync scripts only; no client-side logging framework

**Validation:** TypeScript compile-time types for `Profile`; no runtime validation at fetch

**Authentication:** None for the public site; LinkedIn sync uses local Playwright session (`.linkedin/browser-profile`, gitignored)

**Accessibility:** Section `id`s for anchor nav; `aria-label` on header nav and mobile menu; scroll hint hidden from AT when faded (`aria-hidden`, `tabIndex={-1}`)

**Performance:** Single JSON fetch; no code splitting or lazy routes; images from LinkedIn CDN or local `/img/`

---

*Architecture analysis: 2026-06-25*
