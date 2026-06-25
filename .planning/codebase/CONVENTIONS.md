# Coding Conventions

**Analysis Date:** 2026-06-25

## Naming Patterns

**Files:**
- **Custom components:** PascalCase — `CompanyLogo.tsx`, `SectionHeading.tsx`, `HeroSection.tsx`, `AppShell.tsx`
- **shadcn/ui primitives:** lowercase kebab — `button.tsx`, `scroll-area.tsx`, `sheet.tsx` (matches shadcn CLI output)
- **Hooks:** camelCase with `use` prefix — `useProfile.ts`, `useScrollHintOpacity.ts`
- **Lib modules:** kebab-case for multi-word — `parse-testimonials.ts`, `hero-intro.ts`, `company-logos.ts`
- **Types:** single file `src/types/profile.ts` with exported interfaces/types
- **Tests:** co-located in `__tests__/` next to source — `src/lib/linkedin/__tests__/normalize.test.ts`

**Functions:**
- camelCase for all functions — `formatPeriod`, `mergeLocales`, `parseTestimonialsFromText`
- Private helpers stay unexported in the same file — `isNoise`, `cleanAboutText`, `padDate`
- React components use PascalCase function names matching the file — `export function ExperienceSection`

**Variables:**
- camelCase — `scrollOpacity`, `roleLabel`, `bullets`
- Constants in SCREAMING_SNAKE or camelCase depending on scope — `FADE_DISTANCE_PX`, `MONTHS_PT`
- Boolean locale flag: `lang` from `useLocale()` — `true` = PT, `false` = EN (used for inline UI strings not in JSON)

**Types:**
- PascalCase interfaces — `Profile`, `Experience`, `LocalizedString`, `LocaleContextValue`
- Union types for enums — `type Locale = "pt" | "en"`
- Props interfaces suffixed with `Props` — `CompanyLogoProps`, `SectionHeadingProps`, `TagListProps`
- Scraped/dev-only types in domain files — `ScrapedTestimonial` in `src/lib/linkedin/scrape-types.ts`

## Code Style

**Formatting:**
- No ESLint, Prettier, or Biome config in repo — style is enforced implicitly by TypeScript compiler options and consistent author patterns
- **No semicolons** at statement ends
- **Double quotes** for strings
- **No trailing commas** in multiline calls in some files; mixed but generally minimal trailing commas
- **2-space indentation**
- Imports use path alias `@/` — never relative paths that escape `src/` for app code

**TypeScript compiler (`tsconfig.app.json`):**
- `strict: true` — full strict mode
- `noUnusedLocals: true`, `noUnusedParameters: true`
- `verbatimModuleSyntax: true` — type-only imports must use `import type`
- `noFallthroughCasesInSwitch: true`
- `jsx: "react-jsx"` — no React import required for JSX in app code (though shadcn files still use `import * as React from "react"`)
- **`any` is not used** anywhere under `src/` — use `unknown` + narrowing when input is untyped (e.g. `normalizeProxycurl(raw: unknown)`)

**Linting:**
- Not detected — rely on `tsc -b` in `npm run build` for type checking

## Import Organization

**Order (observed pattern):**
1. React / external packages (`react`, `lucide-react`, `class-variance-authority`, `radix-ui`)
2. Blank line
3. Internal `@/` imports — components, context, hooks, lib, types
4. Type-only imports grouped with `import type` when importing types only

**Example from `src/components/sections/ExperienceSection.tsx`:**

```typescript
import { ExternalLink } from "lucide-react"
import { CompanyLogo } from "@/components/ui/CompanyLogo"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { TagList } from "@/components/ui/TagList"
import { useLocale } from "@/context/LocaleContext"
import { formatDescription, formatPeriod } from "@/lib/format"
import type { Profile } from "@/types/profile"
```

**Path Aliases:**
- `@/*` → `./src/*` (configured in `tsconfig.app.json` and `vite.config.ts`)
- shadcn aliases in `components.json`: `@/components`, `@/lib/utils`, `@/components/ui`, `@/hooks`

## React Patterns

**Components:**
- **Functional components only** — no class components
- **Named exports** for all components except root `App.tsx` (`export default function App`)
- Sub-components can live in the same file unexported — `ExperienceCard` inside `ExperienceSection.tsx`, `ProfileSkeleton` inside `App.tsx`
- Props typed via dedicated `interface` or inline `{ profile: Profile }` destructuring

**Early returns for empty states:**

```typescript
// src/components/ui/CompanyLogo.tsx
if (!src) return null

// src/components/ui/TagList.tsx
if (tags.length === 0) return null
```

**Hooks:**
- Custom hooks in `src/hooks/` — return object with named fields `{ profile, error, loading }`
- Context hooks throw if used outside provider:

```typescript
// src/context/LocaleContext.tsx
if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
```

**State:**
- `useState` + `useEffect` for data fetching (`useProfile`)
- `useCallback` / `useMemo` in context provider to stabilize references
- No external state library (Redux, Zustand) — React context + local state only

## shadcn/ui and Styling

**Class merging:**
- Always use `cn()` from `@/lib/utils` — combines `clsx` + `tailwind-merge`

```typescript
// src/lib/utils.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**CVA variants (shadcn pattern):**
- Define `*Variants` with `cva()`, export both component and variants
- Use `VariantProps<typeof buttonVariants>` for typed props
- Radix `Slot` for `asChild` polymorphism — see `src/components/ui/button.tsx`

**Tailwind v4 (CSS-first):**
- No `tailwind.config.js` — tokens in `src/index.css` via `@import "tailwindcss"`, `@theme inline`, `:root` CSS variables
- Vite plugin: `@tailwindcss/vite` in `vite.config.ts`
- shadcn config points CSS to `src/index.css` (`components.json`)

**Design system typography (`.ds-*`):**
- Semantic classes in `@layer components` — `.ds-display`, `.ds-heading`, `.ds-subheading`, `.ds-subtitle`, `.ds-body`, `.ds-role`, `.ds-label`, `.ds-tag`, `.ds-link`, `.ds-nav-link`, `.ds-role-label`, `.ds-divider`
- **Uppercase text via CSS** — `body { text-transform: uppercase }` in `@layer base`; `.ds-*` classes repeat `text-transform: uppercase` where needed
- Layout shell: `.layout-shell` (max 1100px, fluid gutter)
- Prefer `.ds-*` over ad-hoc Tailwind for body copy; use Tailwind for layout/spacing/responsive (`space-y-5`, `flex`, `sm:size-9`)

**Component styling split:**
- shadcn/ui files (`button.tsx`, `card.tsx`): Tailwind utility strings in `cva()` definitions
- App-specific UI (`CompanyLogo.tsx`, sections): mix of `.ds-*` + Tailwind layout utilities

## Locale and Content

**Data model:**
- All user-facing copy from JSON uses `LocalizedString { pt: string; en: string }` — defined in `src/types/profile.ts`
- Runtime resolution: `const { t } = useLocale()` → `t(profile.headline)`

**Inline UI strings (not in JSON):**
- Use `lang` boolean from `useLocale()` — `lang ? "Ver empresa" : "View company"`
- Or ternary on `locale === "pt"` in section headings passed to `SectionHeading`

**Do not** hardcode locale-specific content without both PT and EN variants when shown in UI.

## Module Design

**Exports:**
- Named exports for functions, components, types
- Barrel files (`index.ts`) not used — import directly from source file
- Re-export variants alongside components — `export { Button, buttonVariants }`

**Lib organization:**
- `src/lib/` — pure functions (formatting, parsing, normalization)
- `src/lib/linkedin/` — dev-only scrape/sync pipeline (Playwright); shared parsers tested with Vitest
- `src/types/` — shared TypeScript interfaces consumed by components and lib

**Comments:**
- JSDoc on non-obvious exported functions — `/** First paragraph only — shown in the hero. */` in `src/lib/hero-intro.ts`
- Inline comments for domain/heuristic logic — regex junk filters, LinkedIn scrape quirks
- Portuguese comments acceptable for PT-specific scrape logic

## Error Handling

**Strategy:** Explicit errors for programmer mistakes; graceful UI degradation for runtime fetch failures.

**Patterns:**

| Context | Pattern | Example |
|---------|---------|---------|
| Context hook misuse | `throw new Error(...)` | `useLocale` outside provider |
| HTTP fetch (runtime) | Catch → set error state → render message | `useProfile` sets `error`, `App.tsx` shows `text-destructive` |
| HTTP fetch (scripts) | `throw new Error(\`HTTP ${status}\`)` | `src/lib/linkedin/translate-text.ts` |
| Playwright scrape | Throw with actionable message | `scrape-playwright.ts` — "Sessão expirada. Rode: npm run linkedin:login" |
| Missing data | Nullish coalescing / early return | `CompanyLogo` returns null without `src` |

**No silent swallowing** — `.catch()` in hooks sets error string; scripts propagate throws.

**Logging:**
- No structured logger — `console` not used in app runtime code
- Errors surfaced to UI (`useProfile`) or thrown in dev scripts

## Accessibility

- Decorative elements: `aria-hidden` — company logos, bullet markers, scroll hint when faded
- Interactive when visible: manage `tabIndex` — scroll hint in `HeroSection.tsx`
- Lists/tags: `aria-label` on containers — `TagList` uses `label` prop
- External links: `target="_blank" rel="noopener noreferrer"`
- `document.documentElement.lang` set to `pt-BR` or `en-US` in `LocaleProvider`

## Function Design

**Size:** Keep helpers private in the same file; exported functions focused on one task.

**Parameters:** Optional fields use `?` on interfaces; default params for locale — `formatPeriod(..., lang = true)`.

**Return values:** 
- Pure functions return typed values or `null` / `[]` for empty input
- React components return `null` or JSX; no implicit `undefined` returns

---

*Convention analysis: 2026-06-25*
