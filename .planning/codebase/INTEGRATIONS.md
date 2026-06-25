# External Integrations

**Analysis Date:** 2026-06-25

## APIs & External Services

**LinkedIn (web scrape — local dev only):**
- Purpose: Source profile data (about, headline, experience, testimonials, avatar) for bilingual portfolio content
- Client: Playwright ^1.60.0 — `src/lib/linkedin/scrape-playwright.ts`
- Auth: Manual login via persistent Chrome profile at `.linkedin/browser-profile` (`src/lib/linkedin/browser-context.ts`); session cookies stored locally, gitignored
- Entry scripts:
  - `scripts/linkedin-login.ts` — one-time / session refresh login
  - `scripts/sync-linkedin.ts` — opt-in scrape (`SYNC_LINKEDIN=1`) PT + EN locales
- Target URLs: `https://www.linkedin.com/in/{slug}/`, experience and recommendations detail pages; locale via `?locale=en-US` or default PT
- Output: normalized `Profile` written to `public/data/profile.json` (committed, served statically)
- Production: **no LinkedIn calls at runtime** — only static JSON is fetched

**Google Translate (unofficial HTTP endpoint — local dev only):**
- Purpose: PT→EN translation and testimonial adaptation during sync
- Client: native `fetch` in `src/lib/linkedin/translate-text.ts`
- Endpoint: `https://translate.googleapis.com/translate_a/single` (client=gtx, no API key)
- Used by: `src/lib/linkedin/translate-testimonials.ts`, `scripts/translate-testimonials.ts`, sync pipeline in `scripts/sync-linkedin.ts`
- Fallback: rule-based English strings in `src/lib/linkedin/english-fallback.ts` when EN scrape fields are empty
- Production: **not called** — translations are baked into committed `profile.json`

**Contact (client-side only):**
- `mailto:oliveira.eduardo08@gmail.com` — CTA links in `src/components/sections/CtaSection.tsx`, `src/components/layout/AppShell.tsx`
- No form backend, email API, or analytics SDK

**Social / outbound links (hardcoded in profile seed):**
- GitHub, LinkedIn, Instagram URLs in `src/lib/linkedin/normalize.ts` (`defaultLinks`)
- Rendered as external `<a href>` in layout; no OAuth or API integration

## Data Storage

**Databases:**
- None — no database, ORM, or server-side persistence

**Static JSON (production data store):**
- `public/data/profile.json` — committed bilingual profile; fetched at runtime by `src/hooks/useProfile.ts` (`GET /data/profile.json`)
- Optional seed merge during sync from existing `profile.json` via `src/lib/linkedin/normalize.ts` `loadSeedProfile()`

**File Storage:**
- Local filesystem only
- `public/img/` — company logo overrides (`src/lib/company-logos.ts`)
- `public/fonts/` — Matrix Sans woff2 fonts referenced in `src/index.css`
- Scraped LinkedIn company logos may reference `media.licdn.com` URLs stored in JSON (remote images, not downloaded by default)

**Caching:**
- None — browser HTTP cache for static assets only; no Redis/CDN config in repo

## Authentication & Identity

**Auth Provider:**
- None in production SPA — fully public static site
- LinkedIn session — dev-only, file-based browser profile (`.linkedin/browser-profile`); not an app auth system
- No JWT, OAuth, session cookies, or user accounts in the deployed app

## Monitoring & Observability

**Error Tracking:**
- None — no Sentry, Datadog, or similar

**Logs:**
- Console logging in sync scripts (`scripts/sync-linkedin.ts`, `scripts/linkedin-login.ts`)
- Runtime errors surfaced in UI via `useProfile()` `error` state (`src/hooks/useProfile.ts`)

## CI/CD & Deployment

**Hosting:**
- Vercel — `vercel.json`: `npm run build`, output `dist/`, framework `vite`
- Node 24.x via `package.json#engines`
- Playwright `postinstall` skipped when `$VERCEL` is set

**CI Pipeline:**
- Not detected — no `.github/workflows/` or other CI config in repository

## Environment Configuration

**Required env vars (local sync only):**
- `LINKEDIN_PROFILE_URL` — profile URL without query string (see `.env.example`)
- `SYNC_LINKEDIN=1` — must be set to run sync (also baked into `npm run sync:linkedin` script)
- `SCRAPE_HEADLESS=1` — optional; run Playwright headless during scrape

**Secrets location:**
- `.env` — gitignored; copy from `.env.example`
- `.linkedin/browser-profile/` — gitignored LinkedIn session data
- No secrets required for Vercel production deploy

## Webhooks & Callbacks

**Incoming:**
- None — static SPA; no API routes or serverless handlers in repo

**Outgoing:**
- LinkedIn — Playwright navigation during local sync only
- Google Translate — HTTP GET during local sync / translate scripts only
- User-initiated: `mailto:` links, external social profile links

## Runtime vs Dev Integration Summary

| Integration | When used | Bundled in SPA |
|-------------|-----------|----------------|
| `profile.json` (static) | Production + dev | Fetched at runtime |
| LinkedIn (Playwright) | Local sync only | No |
| Google Translate | Local sync / translate scripts | No |
| Vercel (hosting) | Production deploy | N/A |
| mailto / social links | Production UI | Client links only |

---

*Integration audit: 2026-06-25*
