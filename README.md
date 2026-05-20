# Eduardo Zaqueu — Portfolio

My personal portfolio. The site is a static, bilingual (PT/EN) single-page app with content sourced from LinkedIn and shipped as committed JSON—no paid API and no scraping at runtime in production.

**Live:** [zaqueu.tech](https://zaqueu.tech)

---

## Tech stack

| Layer | Technology |
|--------|------------|
| Build | [Vite](https://vite.dev/) 6 |
| UI | [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 (`@tailwindcss/vite`) |
| Components | [shadcn/ui](https://ui.shadcn.com/) (New York style, Radix primitives) |
| Icons | [Lucide React](https://lucide.dev/) |
| Tests | [Vitest](https://vitest.dev/) + Testing Library + jsdom |
| Local data sync | [Playwright](https://playwright.dev/) (Chromium, dev-only) |
| Deploy | [Vercel](https://vercel.com/) (Node.js 24.x, output `dist/`) |

Visual and typography guidelines are documented in **[DESIGN.md](./DESIGN.md)**.

---

## Key libraries

**Runtime**

- `react` / `react-dom` — UI
- `clsx`, `tailwind-merge`, `class-variance-authority` — class composition and variants (shadcn pattern)
- `@radix-ui/react-slot`, `radix-ui` — accessible primitives (Button, Accordion, Sheet, etc.)
- `lucide-react` — icons
- `dotenv` — env vars for local LinkedIn sync scripts

**Development**

- `@vitejs/plugin-react` — React Fast Refresh
- `tsx` — run TypeScript scripts (`scripts/`)
- `playwright` — LinkedIn scrape (not installed on Vercel builds)
- `vitest`, `@testing-library/*`, `jsdom` — unit tests

---

## Architecture

### High-level flow

```
┌─────────────────┐     linkedin:login + sync:linkedin      ┌──────────────────────┐
│  LinkedIn (web) │ ──────────────────────────────────────► │ public/data/         │
│  (your session) │         Playwright (local only)         │ profile.json         │
└─────────────────┘                                       └──────────┬───────────┘
                                                                     │
                                                                     │ fetch at runtime
                                                                     ▼
┌─────────────────┐     Vite build (tsc + vite)            ┌──────────────────────┐
│  src/ (React)   │ ─────────────────────────────────────► │ dist/ (static SPA)   │
└─────────────────┘                                       └──────────────────────┘
```

- **Production** serves only the built SPA and `profile.json`. No LinkedIn calls, no Playwright, no secrets.
- **Local sync** is opt-in (`SYNC_LINKEDIN=1`) and uses a persisted browser profile under `.linkedin/` (gitignored).

### Frontend structure

```
src/
├── App.tsx                 # LocaleProvider, sections, profile loading
├── main.tsx
├── index.css               # Design tokens + typography utilities
├── context/
│   └── LocaleContext.tsx   # pt | en, t({ pt, en })
├── hooks/
│   ├── useProfile.ts       # GET /data/profile.json
│   └── useScrollHintOpacity.ts
├── components/
│   ├── layout/             # AppShell, Footer, Sidebar, LangToggle
│   ├── sections/           # Hero, About, Experience, Testimonials, CTA
│   ├── ui/                 # shadcn primitives + TagList, CompanyLogo, …
│   └── glass/              # GlassBackground (solid black backdrop)
├── lib/
│   ├── linkedin/           # Scrape, normalize, parse, translate (scripts + tests)
│   ├── format.ts, hero-intro.ts, company-logos.ts
│   └── utils.ts            # cn()
└── types/
    └── profile.ts          # Profile, Experience, Testimonial, LocalizedString

scripts/
├── linkedin-login.ts       # One-time manual login → session
├── sync-linkedin.ts        # Scrape PT + EN → profile.json
└── translate-testimonials.ts

public/
├── data/profile.json       # Committed profile (bilingual)
├── fonts/                  # Matrix Sans (woff2)
└── img/                    # Company logos (local overrides)
```

### Data model

`Profile` and nested types live in `src/types/profile.ts`. Copy fields use `LocalizedString` (`{ pt, en }`). The UI resolves strings via `useLocale().t()`.

Browser language defaults to English when `navigator.language` does not start with `pt`.

### LinkedIn pipeline (local)

1. **`npm run linkedin:login`** — Opens Chromium with a persistent profile (`.linkedin/browser-profile`). Log in once; session is reused.
2. **`SYNC_LINKEDIN=1 npm run sync:linkedin`** — Scrapes profile in PT and EN, merges locales, normalizes experiences and testimonials, optionally translates testimonials, writes `public/data/profile.json`.
3. Commit `profile.json` and deploy.

Set `LINKEDIN_PROFILE_URL` in `.env` (see `.env.example`). No query string; the sync adds `?locale=pt_BR` / `?locale=en_US`.

### UI composition

- **AppShell** — Fixed header with gradient fade, social links, language toggle, mobile nav.
- **Sections** — Anchor IDs (`#top`, `#about`, `#experience`, `#testimonials`, etc.) with smooth scroll.
- **shadcn/ui** — Button, Card, Accordion, Sheet, Badge, Avatar, ScrollArea, Separator under `src/components/ui/`.

---

## Requirements

- **Node.js** 24.x (see `engines` in `package.json` and `.nvmrc`)
- npm

---

## Getting started

```bash
git clone https://github.com/zaqueu-1/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm test` | Vitest (watch in dev) |
| `npm run linkedin:login` | Manual LinkedIn login (local session) |
| `SYNC_LINKEDIN=1 npm run sync:linkedin` | Scrape LinkedIn → `public/data/profile.json` |
| `npm run translate:testimonials` | Re-translate testimonials only |

### Environment

Copy `.env.example` to `.env`:

```env
LINKEDIN_PROFILE_URL=https://www.linkedin.com/in/your-handle/
```

### Updating profile data

```bash
npm run linkedin:login          # if session expired
SYNC_LINKEDIN=1 npm run sync:linkedin
# review public/data/profile.json
git add public/data/profile.json
git commit -m "chore: sync profile from LinkedIn"
```

Review bilingual copy after sync; machine translation may need manual edits.

---

## Deployment

Configured for **Vercel**:

- `vercel.json` — `outputDirectory: dist`, `framework: vite`
- Node **24.x** via `package.json` `engines`
- Playwright `postinstall` is skipped when `VERCEL` is set

```bash
npm run build
```

---

## Contact

Primary CTA: [oliveira.eduardo08@gmail.com](mailto:oliveira.eduardo08@gmail.com)

---

## License

Private project. All rights reserved unless stated otherwise.
