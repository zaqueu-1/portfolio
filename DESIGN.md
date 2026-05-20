# Design system

Styling reference for this portfolio. The visual language is inspired by [mannan.io](https://mannan.io/): pure black canvas, dot-matrix typography, uppercase mono rhythm, and lilac accents on interaction—not a glassmorphism UI (the `GlassBackground` component is a flat `#000` layer).

Source of truth: **`src/index.css`** (tokens + utility classes) and section/layout components.

---

## Design principles

1. **Dark-only** — `color-scheme: dark`, black background, white primary text.
2. **Dot-matrix type** — Matrix Sans Screen/Raster as display and body mono; all UI copy is uppercase.
3. **Restrained accent** — Lilac (`--lilac`) for links, role labels, and scroll hint—not for large fills.
4. **Editorial layout** — Centered column (`--layout-max: 1100px`), generous gutters, section dividers.
5. **Motion with purpose** — Scroll hint fades over ~140px; header uses a gradient mask, not a solid bar.

---

## Color tokens

Defined in `:root` as HSL components (used as `hsl(var(--token))` or with alpha).

| Token | HSL / value | Usage |
|--------|-------------|--------|
| `--background` | `0 0% 0%` | Page, header fade base |
| `--foreground` | `0 0% 100%` | Headings, primary text, tags |
| `--muted-foreground` | `0 0% 55%` | Labels, secondary nav |
| `--text-secondary` | `0 0% 62%` | Body copy (`.ds-body`) |
| `--text-role` | `0 0% 72%` | Job titles, roles (`.ds-role`) |
| `--lilac` | `278 58% 72%` | Links hover, `.ds-role-label`, scroll CTA |
| `--border` | `0 0% 100% / 0.12` | Dividers, tags, inputs |
| `--secondary` | `0 0% 8%` | shadcn secondary surfaces |
| `--muted` | `0 0% 12%` | Muted surfaces |
| `--destructive` | `0 62% 50%` | Errors |
| `--ring` | `0 0% 60%` | Focus rings (shadcn) |

**shadcn/ui** maps the same tokens through `@theme inline` (`--color-background`, `--color-primary`, etc.) for Tailwind utilities (`bg-background`, `text-foreground`, `border-border`).

---

## Typography

### Font files

Located in `public/fonts/`:

| Family | File | Role |
|--------|------|------|
| Matrix Sans Screen | `matrix-sans-screen.woff2` | Display headings (`.ds-display`) |
| Matrix Sans Raster | `matrix-sans-raster.woff2` | Fallback in stack |

License: SIL Open Font License (Matrix Sans / FriedOrange).

### Font stacks

```css
--font-mono: "Matrix Sans Screen", "Matrix Sans Raster", "Courier New", Courier, monospace;
--font-sans: var(--font-mono);  /* entire UI uses mono stack */
```

### Global body defaults

```css
body {
  font-family: var(--font-mono);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  antialiased;
}
```

Scrollbars are hidden (`scrollbar-width: none` / `::-webkit-scrollbar { display: none }`).

### Type scale (design utilities)

| Class | Size | Letter-spacing | Color | Notes |
|--------|------|----------------|-------|--------|
| `.ds-display` | `clamp(2.125rem, 6vw, 3.375rem)` | `0.05em` | foreground | Matrix Sans Screen; subtle white glow `text-shadow` |
| `.ds-heading` | `clamp(1.375rem, 2.5vw, 1.625rem)` | `0.1em` | foreground | Section titles |
| `.ds-subheading` | `calc(1.3125rem - 1pt)` → `calc(1.625rem - 1pt)` @ sm+ | `0.07em` | inherit | Company names |
| `.ds-subtitle` | `calc(1rem - 1pt)` → `calc(1.125rem - 1pt)` @ sm+ | `0.08em` | `--text-secondary` | Hero headline |
| `.ds-body` | `calc(1rem - 1pt)` | `0.11em` | `--text-secondary` | About / long copy |
| `.ds-role` | `calc(1rem - 1pt)` | `0.11em` | `--text-role` | Experience titles |
| `.ds-label` | `calc(0.875rem - 1pt)` | `0.11em` | `--muted-foreground` | Meta, nav hints |
| `.ds-role-label` | (inherits `.ds-label`) | — | **lilac** | “Current role”, “Scroll”, lang-adjacent accents |
| `.ds-link` | `calc(0.875rem - 1pt)` | `0.11em` | foreground → lilac on hover | Nav, footer links |
| `.ds-tag` | `calc(0.75rem - 1pt)` | `0.11em` | foreground | Bordered skill chips |

**Note:** Subtitle, body, role, label, and tag sizes use `calc(... - 1pt)` for slightly tighter rhythm than raw rem values; display and main headings are unchanged.

### Muted helper

`.ds-muted` → `color: hsl(var(--muted-foreground))`.

---

## Layout

| Token / class | Value | Usage |
|----------------|-------|--------|
| `--layout-max` | `1100px` | Max content width |
| `--layout-gutter` | `clamp(1rem, 4vw, 2.5rem)` | Horizontal padding |
| `--hero-offset` | `calc(var(--layout-gutter) * 2.25)` | Hero min-height offset (header clearance) |
| `.layout-shell` | max-width + centered + gutter padding | `AppShell` main, header inner |

### Main content offset

```tsx
<main className="layout-shell pb-20 pt-[calc(var(--layout-gutter)*2.25)]">
```

Fixed header does not consume document flow; padding-top clears the overlay header.

---

## Spacing & radius

| Token | Value |
|--------|--------|
| `--radius` | `16px` |
| `--radius-sm` | `8px` |
| `--radius-md` / `--radius-lg` / `--radius-xl` | `16px` (shadcn theme) |

Section rhythm: experience cards use `.ds-divider` with `pt-10` between entries; hero uses `gap-8` / `md:gap-10`.

---

## Interactive states

### Links (global)

```css
a { transition-colors; }
a:hover { color: hsl(var(--lilac)); }
button.ds-link:hover { color: hsl(var(--lilac)); }
```

`.ds-link` duplicates hover for class-based links.

### Scroll hint (hero)

- Class: `.ds-label.ds-role-label` (lilac, always—not only on hover).
- Opacity driven by `useScrollHintOpacity`: `1` at scroll `0` → `0` after **140px**.
- `aria-hidden` / `tabIndex={-1}` when opacity &lt; 0.05.

### Language toggle

- `LangToggle`: `.ds-link` + flag SVG (`FlagBrazil` / `FlagUsa`), `h-3 w-[1.05rem]`, subtle border.
- Shows target locale label (`EN-US` when PT active, `PT-BR` when EN active).

---

## Header & navigation

### Structure (`AppShell`)

- **`.site-header`** — `fixed`, full width, `z-40`, `pointer-events: none` on wrapper.
- **`.site-header__fade`** — Gradient mask (no solid black bar):

```css
background: linear-gradient(
  to bottom,
  hsl(var(--background)) 0%,
  hsl(var(--background) / 0.94) 22%,
  hsl(var(--background) / 0.72) 48%,
  hsl(var(--background) / 0.28) 78%,
  transparent 100%
);
height: clamp(7.5rem, 20vh, 11.5rem);
```

- **`.site-header__inner`** — `pointer-events: auto`; home `~/`, social links with `/` separators, email, `LangToggle`.

### Mobile nav

`Sidebar.tsx` / `MobileNav` — Sheet (shadcn) for section links on small screens.

---

## Section patterns

### Hero (`HeroSection`)

- `min-h-[calc(100svh-var(--hero-offset))]` (and `100dvh` fallback).
- CSS grid: `grid-rows-[1fr_auto]` — content bottom-aligned, scroll control centered in second row.
- Blocks: location (`.ds-label`), name (`.ds-display`), headline (`.ds-subtitle`), intro (`.ds-body`), `TagList` skills.

### About

`.ds-body` paragraphs from `profile.about`.

### Experience

- Role badge: `.ds-label.ds-role-label` (lilac), right-aligned.
- Company: `.ds-subheading` + `CompanyLogo`.
- Title line: `.ds-role` + period from `formatPeriod`.
- Company link: `.ds-link` + Lucide `ExternalLink`.
- Bullets: formatted description; skills via `TagList`.

### Testimonials

Localized quote blocks; typography follows `.ds-body` / `.ds-label` patterns in `TestimonialsSection.tsx`.

### CTA

Mailto CTA aligned with site link styles.

---

## Components

### Company logo (`CompanyLogo`)

| Property | Value |
|----------|--------|
| Container | `size-8` / `sm:size-9`, `border-border`, `bg-white/[0.04]` |
| Image | `object-contain`, `opacity-90`, `grayscale-[25%]`, `contrast-[1.02]` |

Local assets resolved via `src/lib/company-logos.ts` → `public/img/`.

### Tags (`TagList` / `.ds-tag`)

Inline blocks, 1px border, uppercase, compact padding `0.35rem 0.65rem`.

### Dividers

`.ds-divider` → `border-top: 1px solid hsl(var(--border))`.

### Background

`GlassBackground`: `fixed inset-0 -z-10 bg-black` (naming legacy; no blur).

---

## shadcn/ui integration

- **Config:** `components.json` — style `new-york`, `baseColor: zinc`, CSS variables in `src/index.css`.
- **Primitives in use:** `button`, `card`, `accordion`, `sheet`, `badge`, `avatar`, `scroll-area`, `separator`.
- **Pattern:** `cn()` from `@/lib/utils`, CVA variants on Button, Radix Slot where applicable.
- Theme follows global HSL tokens; default shadcn light theme is not used (dark-only `:root`).

When adding components:

```bash
npx shadcn@latest add <component>
```

Ensure new styles respect uppercase mono and lilac hover conventions.

---

## Icons

**Lucide React** — stroke width often `1.5` for light marks (e.g. `ChevronDown` in scroll hint). Size utilities: `size-3.5`, `size-4`, etc.

---

## Assets

| Path | Purpose |
|------|---------|
| `public/fonts/*.woff2` | Matrix Sans |
| `public/img/*` | Company logos |
| `public/data/profile.json` | Bilingual content |
| `public/favicon.ico`, `manifest.json` | PWA meta |

`index.html`: `theme-color` `#000000`, `color-scheme: dark`.

---

## Accessibility notes

- Semantic sections with `id` anchors for in-page navigation.
- `aria-label` on header home, lang toggle, social nav.
- Scroll control hidden from AT when fully faded.
- Company logos decorative (`alt=""`, `aria-hidden` on wrapper).

---

## Changing the look

1. **Colors** — Edit `:root` in `src/index.css`; lilac and text steps are the main levers.
2. **Type scale** — Adjust `.ds-*` rules in `@layer components`.
3. **Layout width** — Change `--layout-max` and `--layout-gutter`.
4. **Header fade** — Tune `.site-header__fade` gradient stops and `height`.
5. **New sections** — Reuse `.layout-shell`, `SectionHeading`, and existing `.ds-*` classes before introducing one-off sizes.

After token changes, run `npm run build` and verify hero, experience cards, and mobile sheet at common breakpoints (375px, 768px, 1280px).
