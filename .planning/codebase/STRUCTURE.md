# Codebase Structure

**Analysis Date:** 2026-06-25

## Directory Layout

```
portfolio/
├── index.html              # SPA shell, mounts #root
├── package.json            # Scripts, deps, Node 24.x engine
├── vite.config.ts          # Vite + React + Tailwind, @ alias, Vitest
├── tsconfig*.json          # App (src/) vs Node (scripts/) configs
├── vercel.json             # Deploy: dist/, Vite framework
├── components.json         # shadcn/ui config
├── DESIGN.md               # Design system reference (companion to index.css)
├── CLAUDE.md               # Agent/project guidance
├── .env.example            # LINKEDIN_PROFILE_URL template
├── scripts/                # Node CLI entry points (dev-only sync)
│   ├── sync-linkedin.ts
│   ├── linkedin-login.ts
│   └── translate-testimonials.ts
├── public/                 # Static assets (copied to dist/ root)
│   ├── data/
│   │   └── profile.json    # Runtime portfolio data (committed)
│   ├── fonts/              # Matrix Sans woff2 + OFL license
│   ├── img/                # Local company logo overrides
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── main.tsx            # React bootstrap
    ├── App.tsx             # Root component tree
    ├── index.css           # Tailwind v4, tokens, .ds-* classes
    ├── vite-env.d.ts
    ├── components/
    │   ├── glass/          # Background layer
    │   ├── layout/         # AppShell, Footer, Sidebar, LangToggle
    │   ├── sections/       # Page sections (Hero, About, …)
    │   └── ui/             # shadcn/Radix primitives + shared UI
    ├── context/
    │   └── LocaleContext.tsx
    ├── hooks/
    │   ├── useProfile.ts
    │   └── useScrollHintOpacity.ts
    ├── lib/
    │   ├── hero-intro.ts
    │   ├── format.ts
    │   ├── company-logos.ts
    │   ├── utils.ts
    │   └── linkedin/       # Scrape/normalize pipeline (shared with scripts)
    ├── types/
    │   └── profile.ts
    └── test/
        └── setup.ts        # Vitest + Testing Library setup
```

## Directory Purposes

**`src/components/sections/`:**
- Purpose: Top-level page sections; each maps to an anchor ID and receives `profile: Profile`
- Contains: `HeroSection`, `AboutSection`, `ExperienceSection`, `TestimonialsSection`, `CtaSection`
- Key files: One file per section; co-located subcomponents (e.g. `ExperienceCard` inside `ExperienceSection.tsx`)

**`src/components/layout/`:**
- Purpose: Persistent chrome — header, footer, mobile nav, language toggle
- Contains: `AppShell.tsx`, `Footer.tsx`, `Sidebar.tsx` (exports `MobileNav`), `LangToggle.tsx`
- Key files: `AppShell.tsx` owns fixed header and main wrapper

**`src/components/ui/`:**
- Purpose: Reusable UI primitives (shadcn/ui) and small shared widgets
- Contains: Radix wrappers (`button`, `sheet`, `accordion`, `scroll-area`, `card`, `badge`, `avatar`, `separator`), `TagList`, `SectionHeading`, `CompanyLogo`, `FlagIcon`
- Key files: Generated shadcn components; extend via `cn()` from `src/lib/utils.ts`

**`src/components/glass/`:**
- Purpose: Visual backdrop (currently solid black, name is legacy)
- Contains: `GlassBackground.tsx`

**`src/context/`:**
- Purpose: React context providers
- Contains: `LocaleContext.tsx` — locale state and `t()` helper

**`src/hooks/`:**
- Purpose: Reusable React hooks
- Contains: `useProfile.ts` (data fetch), `useScrollHintOpacity.ts` (scroll-driven opacity)

**`src/lib/`:**
- Purpose: Pure functions and shared utilities
- Contains: Content formatters, logo map, `cn()` helper
- Key files: `hero-intro.ts`, `format.ts`, `company-logos.ts`

**`src/lib/linkedin/`:**
- Purpose: LinkedIn scrape → normalize → translate pipeline
- Contains: Playwright scraper, parsers, normalizers, translators, tests
- Key files: `scrape-playwright.ts`, `normalize-scraped.ts`, `normalize.ts`, `translate-testimonials.ts`
- Note: Imported by both `scripts/` and unit tests under `__tests__/`

**`src/types/`:**
- Purpose: Shared TypeScript interfaces
- Contains: `profile.ts` — `Profile`, `Experience`, `Testimonial`, `LocalizedString`, `Locale`

**`scripts/`:**
- Purpose: CLI entry points run via `tsx` (not bundled into Vite app)
- Contains: Sync, login, testimonial re-translate scripts

**`public/`:**
- Purpose: Static files served at URL root (`/data/profile.json`, `/img/…`, `/fonts/…`)
- Contains: Committed portfolio JSON, fonts, logo overrides, PWA manifest

## Key File Locations

**Entry Points:**
- `index.html`: HTML shell, meta, `#root`, script tag to `main.tsx`
- `src/main.tsx`: `createRoot`, `StrictMode`, imports `index.css`
- `src/App.tsx`: Application root — providers, data gate, section composition

**Configuration:**
- `vite.config.ts`: `@` → `./src`, port 5173, Vitest jsdom config
- `tsconfig.app.json`: Strict TS for `src/**`; path alias `@/*`
- `tsconfig.node.json`: TS for Vite config and scripts
- `postcss.config.js`: PostCSS (used with Tailwind v4 Vite plugin)
- `vercel.json`: Production build output `dist/`
- `.env.example`: Required env vars for LinkedIn sync (not read at runtime)

**Core Logic:**
- `src/context/LocaleContext.tsx`: Locale detection and resolution
- `src/hooks/useProfile.ts`: Profile JSON fetch
- `src/types/profile.ts`: Domain types
- `src/lib/hero-intro.ts`: Split about text for hero vs about section
- `src/lib/format.ts`: Period formatting, description bullets, relationship cleanup
- `src/lib/company-logos.ts`: Local logo override map

**Data:**
- `public/data/profile.json`: Single runtime data source (bilingual, experiences, testimonials)

**Design System:**
- `src/index.css`: HSL tokens in `:root`, `@theme inline`, `.ds-*` typography, `.layout-shell`, `.site-header`
- `DESIGN.md`: Human-readable design reference

**Testing:**
- `src/lib/linkedin/__tests__/`: Unit tests for normalize/parse logic
- `src/test/setup.ts`: Vitest setup (jest-dom matchers)
- `vite.config.ts` `test` block: jsdom environment, globals, setup file

**LinkedIn Sync (dev-only):**
- `scripts/linkedin-login.ts`: One-time browser session
- `scripts/sync-linkedin.ts`: Full PT+EN scrape pipeline
- `scripts/translate-testimonials.ts`: Testimonials-only re-translate
- `.linkedin/browser-profile/`: Gitignored Playwright persistent context

## Naming Conventions

**Files:**
- React components: PascalCase `.tsx` (e.g. `HeroSection.tsx`, `AppShell.tsx`)
- Hooks: camelCase with `use` prefix (e.g. `useProfile.ts`, `useScrollHintOpacity.ts`)
- Lib/utilities: kebab-case or camelCase `.ts` (e.g. `hero-intro.ts`, `format.ts`, `company-logos.ts`)
- LinkedIn pipeline: kebab-case descriptive names (e.g. `normalize-scraped.ts`, `scrape-playwright.ts`)
- Tests: co-located `__tests__/*.test.ts` next to linkedin modules
- Scripts: kebab-case in `scripts/` (e.g. `sync-linkedin.ts`)

**Directories:**
- Feature grouping under `src/components/` by role: `sections/`, `layout/`, `ui/`, `glass/`
- Single-type folders: `context/`, `hooks/`, `types/`, `test/`
- Static assets mirror URL paths under `public/` (`data/`, `img/`, `fonts/`)

**Components:**
- Section components: `{Name}Section` (e.g. `HeroSection`)
- Layout: descriptive nouns (`AppShell`, `Footer`, `MobileNav` in `Sidebar.tsx`)
- UI primitives: lowercase shadcn names (`button.tsx`, `sheet.tsx`); custom PascalCase (`TagList.tsx`, `CompanyLogo.tsx`)

**Types:**
- Interfaces: PascalCase (`Profile`, `Experience`, `LocalizedString`)
- Locale union: `"pt" | "en"` exported as `Locale`

**CSS:**
- Design system classes: `.ds-{role}` (e.g. `.ds-display`, `.ds-body`, `.ds-nav-link`)
- Layout: `.layout-shell`, `.site-header`, `.site-header__fade`, `.site-header__inner` (BEM-like)
- Section IDs for anchors: kebab-case or simple (`top`, `about`, `experiences`, `testimonials`, `contact`)

**Imports:**
- Path alias: `@/` maps to `src/` (e.g. `@/components/sections/HeroSection`, `@/types/profile`)
- Type-only imports: `import type { Profile } from "@/types/profile"` (verbatim module syntax)

## Where to Add New Code

**New page section:**
- Implementation: `src/components/sections/NewSection.tsx`
- Wire-up: Import and render in `src/App.tsx` inside `AppShell`, after profile load
- Navigation: Add entry to `NAV` array in `src/components/layout/Sidebar.tsx`; add matching `id` on `<section>`
- Data: Extend `Profile` in `src/types/profile.ts` and sync pipeline if content comes from LinkedIn

**New profile field:**
- Types: `src/types/profile.ts`
- Sync: Update `normalize-scraped.ts` / `normalize.ts` and scraper parsers as needed
- Runtime: Consume via `t()` if `LocalizedString`, or direct access if locale-agnostic (e.g. `avatarUrl`)

**New UI primitive:**
- Implementation: `src/components/ui/` following shadcn patterns (`cn()`, Radix if needed)
- Config: `components.json` if using shadcn CLI to generate

**New formatter or text helper:**
- Implementation: `src/lib/` as pure function module
- Tests: `src/lib/__tests__/` or co-located `__tests__/` mirroring linkedin pattern

**New LinkedIn scrape field:**
- Scraper types: `src/lib/linkedin/scrape-types.ts`
- Parser/normalizer: `src/lib/linkedin/normalize-scraped.ts`, `mergeLocales` in `normalize.ts`
- Tests: `src/lib/linkedin/__tests__/`

**New company logo override:**
- Asset: `public/img/{company}.{png|jpg|jpeg}`
- Map: Add key to `LOCAL_LOGOS` in `src/lib/company-logos.ts` (normalized company key)

**New npm script:**
- Script file: `scripts/{name}.ts`
- Register: `package.json` `"scripts"` block with `tsx`

## Special Directories

**`.linkedin/`:**
- Purpose: Playwright persistent browser profile for LinkedIn auth
- Generated: Yes (by `npm run linkedin:login`)
- Committed: No (gitignored)

**`dist/`:**
- Purpose: Vite production build output
- Generated: Yes (`npm run build`)
- Committed: No

**`node_modules/`:**
- Purpose: Dependencies; Playwright Chromium installed on postinstall (skipped on Vercel via `$VERCEL` check)
- Generated: Yes
- Committed: No

**`.planning/`:**
- Purpose: GSD planning artifacts and codebase maps
- Generated: By planning/mapping workflows
- Committed: Project-dependent

**`public/data/`:**
- Purpose: Runtime JSON served at `/data/profile.json`
- Generated: By sync script, then manually reviewed and committed
- Committed: Yes (required for deploy)

---

*Structure analysis: 2026-06-25*
