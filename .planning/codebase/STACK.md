# Technology Stack

**Analysis Date:** 2026-06-25

## Languages

**Primary:**
- TypeScript ~5.8.3 — application code (`src/`), build config (`vite.config.ts`), dev scripts (`scripts/`)
- TSX — React components under `src/components/`, `src/App.tsx`, `src/main.tsx`

**Secondary:**
- HTML — entry shell in `index.html`
- CSS — design tokens and utilities in `src/index.css` (Tailwind v4 `@import`, `@theme inline`, custom `@font-face`)
- JavaScript — `postcss.config.js` (PostCSS plugin config only)

## Runtime

**Environment:**
- Node.js 24.x — enforced via `package.json#engines`; used for build, tests, and LinkedIn sync scripts
- Browser (ES2022+) — production SPA served as static assets from `dist/`

**Package Manager:**
- npm — lockfile present at `package-lock.json` (lockfileVersion 2)
- Lockfile: present

## Frameworks

**Core:**
- Vite ^6.3.5 — dev server, production bundler; config in `vite.config.ts`
- React ^19.0.0 / React DOM ^19.0.0 — UI layer; entry at `src/main.tsx`
- TypeScript ~5.8.3 — strict mode, project references split across `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`

**UI & styling:**
- Tailwind CSS ^4.1.8 — via `@tailwindcss/vite` plugin in `vite.config.ts`; tokens in `src/index.css`
- shadcn/ui (New York style) — configured in `components.json`; components in `src/components/ui/`
- Radix UI — `radix-ui` ^1.4.3 and `@radix-ui/react-slot` ^1.2.3 for accessible primitives (Button, Sheet, Accordion, etc.)
- Lucide React ^0.511.0 — icons (`components.json#iconLibrary`)
- class-variance-authority ^0.7.1, clsx ^2.1.1, tailwind-merge ^3.3.0 — class composition (`src/lib/utils.ts` `cn()` pattern)

**Testing:**
- Vitest ^3.1.4 — unit tests; configured inline in `vite.config.ts` (`test.environment: jsdom`)
- @testing-library/react ^16.3.0, @testing-library/jest-dom ^6.6.3, @testing-library/user-event ^14.6.1
- jsdom ^26.1.0 — DOM environment for tests
- Test setup: `src/test/setup.ts`

**Build/Dev (local data pipeline):**
- Playwright ^1.60.0 — LinkedIn scrape (dev-only); Chromium via persistent Chrome profile
- tsx ^4.22.3 — run TypeScript scripts without precompile (`scripts/*.ts`)
- dotenv ^10.0.0 — load `.env` in sync scripts (`scripts/sync-linkedin.ts`)

## Key Dependencies

**Critical (runtime SPA):**
- `react` / `react-dom` — single-page app; no router library (anchor-based sections)
- `radix-ui`, `@radix-ui/react-slot` — shadcn/ui primitives in `src/components/ui/`
- `lucide-react` — UI icons
- `clsx`, `tailwind-merge`, `class-variance-authority` — styling utilities

**Critical (local sync only — not bundled for production):**
- `playwright` — browser automation in `src/lib/linkedin/scrape-playwright.ts`
- `dotenv` — `LINKEDIN_PROFILE_URL` and opt-in flags for scripts

**Infrastructure (dev):**
- `@vitejs/plugin-react` ^4.5.0 — React Fast Refresh
- `@tailwindcss/vite` ^4.1.8 — Tailwind v4 Vite integration
- `autoprefixer` ^10.4.21, `postcss` ^8.5.4 — PostCSS pipeline (`postcss.config.js`; Tailwind handled by Vite plugin)

## Configuration

**Environment:**
- `.env.example` — documents `LINKEDIN_PROFILE_URL` (no query string; sync adds locale params)
- `.env` — gitignored; used only by local LinkedIn sync scripts
- Runtime flags (shell/env, not `.env`):
  - `SYNC_LINKEDIN=1` — opt-in gate for `scripts/sync-linkedin.ts`
  - `SCRAPE_HEADLESS=1` — headless Playwright in `src/lib/linkedin/scrape-playwright.ts`
  - `VERCEL` — when set, `postinstall` skips Playwright Chromium install (`package.json#postinstall`)

**Build:**
- `vite.config.ts` — React + Tailwind plugins, `@/` path alias, dev port 5173, Vitest config
- `tsconfig.app.json` — app TS: ES2022, strict, `@/*` paths, includes `src/**`
- `tsconfig.node.json` — Node TS for `vite.config.ts`
- `vercel.json` — `buildCommand: npm run build`, `outputDirectory: dist`, `framework: vite`
- `components.json` — shadcn/ui schema (New York, zinc base, CSS variables, `@/` aliases)

**Build commands:**
```bash
npm run dev      # Vite dev server → localhost:5173
npm run build    # tsc -b && vite build → dist/
npm run preview  # vite preview (production build locally)
npm test         # vitest
```

**LinkedIn sync commands (local only):**
```bash
npm run linkedin:login              # persistent browser login → .linkedin/browser-profile
SYNC_LINKEDIN=1 npm run sync:linkedin   # scrape PT+EN → public/data/profile.json
npm run translate:testimonials      # re-translate testimonials only
```

## Platform Requirements

**Development:**
- Node.js 24.x
- Google Chrome (Playwright uses `channel: "chrome"` in `src/lib/linkedin/browser-context.ts`)
- Playwright Chromium installed via `postinstall` (skipped on Vercel)

**Production:**
- Vercel static hosting — SPA + committed JSON at `public/data/profile.json`
- No server-side runtime; no Playwright or env secrets in deploy
- Live site: zaqueu.tech (documented in `README.md`)

---

*Stack analysis: 2026-06-25*
