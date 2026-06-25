# Testing Patterns

**Analysis Date:** 2026-06-25

## Test Framework

**Runner:**
- Vitest 3.1.4
- Config: inline in `vite.config.ts` under `test` key (shares Vite resolve aliases and plugins)

**Assertion Library:**
- Vitest built-in `expect`
- `@testing-library/jest-dom` matchers via setup file (available but not yet used in component tests)

**Environment:**
- `jsdom` — DOM APIs available if needed
- `globals: true` — `describe`, `it`, `expect` available without imports (tests still import explicitly from `"vitest"`)

**Run Commands:**

```bash
npm test              # vitest — watch mode by default
npm run build         # tsc -b && vite build — type-check gate, not tests
```

No dedicated `test:run`, `test:coverage`, or single-file script in `package.json`.

## Vitest Configuration

From `vite.config.ts`:

```typescript
test: {
  environment: "jsdom",
  globals: true,
  setupFiles: "./src/test/setup.ts",
}
```

**Path alias:** `@/` resolves to `./src` — same as app build; use `@/` in test imports if testing modules that import aliased paths.

**Setup file (`src/test/setup.ts`):**

```typescript
import "@testing-library/jest-dom/vitest"
```

Single line — extends `expect` with DOM matchers (`toBeInTheDocument`, etc.) for future component tests.

## Test File Organization

**Location:**
- Co-located `__tests__/` subdirectory next to source module
- Current tests: `src/lib/linkedin/__tests__/`

**Naming:**
- `*.test.ts` — no `.spec.ts` files in repo

**Structure:**

```
src/lib/linkedin/
├── normalize.ts
├── parse-testimonials.ts
└── __tests__/
    ├── normalize.test.ts
    └── parse-testimonials.test.ts
```

**Scope:** Only `src/lib/linkedin/` has automated tests today. No tests under `src/components/`, `src/hooks/`, or `scripts/`.

## Test Structure

**Suite organization:**

```typescript
import { describe, expect, it } from "vitest"
import { mergeLocales, normalizeProxycurl } from "../normalize"

describe("normalizeProxycurl", () => {
  it("maps headline for locale", () => {
    const partial = normalizeProxycurl(
      { full_name: "Eduardo Zaqueu", headline: "Dev", experiences: [] },
      "pt",
    )
    expect(partial.headline?.pt).toBe("Dev")
    expect(partial.name).toBe("Eduardo Zaqueu")
  })
})

describe("mergeLocales", () => {
  it("merges pt and en headlines", () => {
    // ... full Profile-shaped fixtures ...
    expect(profile.headline).toEqual({ pt: "Dev PT", en: "Dev EN" })
  })
})
```

**Patterns:**
- One `describe` block per exported function or logical unit
- Test names read as behavior specs — `"maps headline for locale"`, `"parses LinkedIn recommendations layout with connection badge"`
- Arrange inline in `it()` — no shared `beforeEach` / `afterEach`
- Relative imports from parent dir — `from "../normalize"`, `from "../parse-testimonials"`
- Explicit vitest imports despite `globals: true`

## Fixtures and Factories

**LinkedIn text fixtures:**
- Large multiline string constants at module top — simulates scraped LinkedIn page text
- Example: `LINKEDIN_FIXTURE` in `parse-testimonials.test.ts` with PT recommendation layout, author names, connection badges (`· 1º`)

**Profile object fixtures:**
- Inline object literals matching `Profile` shape in `normalize.test.ts`
- Duplicate slug/name fields for PT and EN partial profiles passed to `mergeLocales`
- Empty arrays for unused collections (`experiences: []`, `testimonials: []`)

**No shared fixture files** — no `src/test/fixtures/` or factory helpers yet.

**Location for new fixtures:** Co-locate in test file or add `src/lib/linkedin/__tests__/fixtures/` if reuse grows.

## Mocking

**Framework:** Vitest built-in (`vi.mock`, `vi.fn`, `vi.spyOn`)

**Current usage:** **None** — no mocks in any test file.

**What tests hit:**
- Pure functions only — parsing, normalization, locale merging
- No network, filesystem, Playwright, or React rendering in tests

**Guidelines for new tests:**
- **Prefer pure unit tests** for `src/lib/` — match existing linkedin test style
- Mock external I/O only when testing modules that call fetch/FS — e.g. `normalize.ts` uses `readFileSync` in `loadSeedProfile()` but that path is untested
- Playwright (`scrape-playwright.ts`) is exercised manually via `npm run sync:linkedin`, not Vitest

## Testing Library (Installed, Unused)

**Packages in `devDependencies`:**
- `@testing-library/react` 16.3.0
- `@testing-library/jest-dom` 6.6.3
- `@testing-library/user-event` 14.6.1

**Status:** Ready for component/integration tests; no `render()` or `userEvent` usage yet.

**Recommended pattern when adding component tests:**

```typescript
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { LocaleProvider } from "@/context/LocaleContext"
import { ExperienceSection } from "@/components/sections/ExperienceSection"

// Wrap with LocaleProvider when component uses useLocale()
render(
  <LocaleProvider>
    <ExperienceSection profile={mockProfile} />
  </LocaleProvider>,
)
expect(screen.getByText("Selected work")).toBeInTheDocument()
```

**Provider wrapping:** Components using `useLocale()` require `<LocaleProvider>` — hook throws otherwise.

## Playwright (Dev Sync, Not Vitest E2E)

**Package:** `playwright` 1.60.0 — used in `src/lib/linkedin/scrape-playwright.ts` and `scripts/sync-linkedin.ts`

**Purpose:** LinkedIn profile scrape at build/sync time — not browser E2E tests

**No Playwright test specs** — no `*.spec.ts` e2e suite, no `@playwright/test` runner config

**Local session:** `npm run linkedin:login` saves browser profile to `.linkedin/browser-profile` (gitignored)

## Coverage

**Requirements:** None enforced in CI or package scripts

**Configuration:** Not configured in `vite.config.ts`

**Gitignore:** `/coverage` listed in `.gitignore` — ready if coverage is added later

**To add coverage (not currently set up):**

```bash
npx vitest run --coverage
```

Would require `@vitest/coverage-v8` (not in `package.json` today).

## Test Types

**Unit Tests (current):**
- Scope: LinkedIn parse/normalize pipeline
- Files: `normalize.test.ts`, `parse-testimonials.test.ts`
- Assertions: equality, length, substring containment (`toContain`)

**Integration Tests:**
- Not present

**Component Tests:**
- Infrastructure ready (jsdom + Testing Library + jest-dom setup)
- Not written yet

**E2E Tests:**
- Not present — manual verification via `npm run dev` and LinkedIn sync scripts

## TypeScript and Test Compilation

- App tests live under `src/` — included in `tsconfig.app.json`
- Vitest config in `vite.config.ts` — included in `tsconfig.node.json`
- `npm run build` runs `tsc -b` — tests type-check with app sources when edited

## Common Patterns

**Async testing:**
- Not used in current tests — all synchronous pure functions
- For future async: use `async/await` in `it()` or return Promise from test callback

**Error testing:**

```typescript
expect(() => fn()).toThrow("message")
// or
await expect(asyncFn()).rejects.toThrow()
```

Not used yet — add when testing throw paths in translate/scrape helpers.

**Optional chaining in assertions:**

```typescript
expect(items[0]?.author).toBe("Victor Hugo Mendes de Moraes")
```

Matches strict null checking style.

## What to Test (Project Conventions)

| Layer | Priority | Approach |
|-------|----------|----------|
| `src/lib/` pure functions | High | Vitest unit tests, fixture strings/objects |
| `src/lib/linkedin/` parsers | High | Real LinkedIn text snapshots (existing pattern) |
| React sections/components | Medium | Testing Library + `LocaleProvider` wrapper |
| Hooks (`useProfile`) | Medium | Mock `fetch` with `vi.stubGlobal` or MSW |
| Playwright scrape scripts | Low | Manual sync; too heavy for unit tests |
| Static JSON (`public/data/profile.json`) | Low | Committed artifact; validated by app render |

## Gaps

- No component or hook tests despite Testing Library installed
- No coverage reporting or CI test gate visible in repo
- `format.ts`, `hero-intro.ts`, `company-logos.ts` — untested but good unit-test candidates
- No shared test utilities or mock `Profile` factory

---

*Testing analysis: 2026-06-25*
