# Inkfield — Project Detail Pages

## What This Is

A portfolio website for Inkfield, a London-based interior design studio. The site already has a homepage, about page, and a /work listing page. This milestone builds the individual project detail pages (`/work/[slug]`) for all 5 projects, with a curated image gallery layout matching a provided PDF mockup.

## Core Value

Each project page must feel like a curated editorial spread — the right images, in the right layout, at the right quality. That's what turns a portfolio site into a convincing client-facing showcase.

## Requirements

### Validated

- ✓ Homepage with hero — existing
- ✓ About page — existing
- ✓ /work listing page (5 projects, links to /work/[slug]) — existing
- ✓ Global layout (header, nav, footer) — existing
- ✓ Adobe Typekit fonts — existing
- ✓ Codebase mapped — existing

### Active

- [ ] Images optimised for web (WebP conversion, appropriate sizing)
- [ ] Images placed in the correct Astro-accessible location (`public/work/[slug]/`)
- [ ] Dynamic route `src/pages/work/[slug].astro` created
- [ ] Each project page renders: hero image, image gallery with layout rules, project description
- [ ] Image layout rules respected (full-width, side-by-side, main+detail, three-up, image-with-text)
- [ ] Project pages match the existing site's design language (typography, spacing, colours)
- [ ] Mobile-responsive layout
- [ ] All 5 projects working: sotogrande, jacob, london-family, penthouse, lecce

### Out of Scope

- CMS or dynamic data source — content is hardcoded per project
- Contact form on project pages — not in mockup
- Image lightbox/zoom — not in mockup
- Captions (text-to-side images) — placeholders only for now, real copy to be added later
- New projects beyond the existing 5 — future milestone

## Context

**Existing codebase:**
- Astro 5.17.1, vanilla CSS, no preprocessor
- `src/layouts/Layout.astro` — shared header/footer/nav
- `src/styles/global.css` — single global stylesheet
- `public/work/` — existing project thumbnail images (one per project)
- `src/pages/work.astro` — already links to `/work/${slug}` for all 5 projects

**Image source:**
Raw project images are in `images to optimise/` at the project root, organized as:
- `Project 1 - Soto/` → slug: `sotogrande`
- `Project 2 - Hillway/` → slug: `london-family`
- `Project 3 - Jacob David/` → slug: `jacob`
- `Project 4 - Oak Lodge/` → slug: `penthouse`
- `Project 5 - Lecce/` → slug: `lecce`

**Image layout encoding (from filenames):**
Filenames encode the display layout for each image:
- `x.00` — hero image (full-width, above the fold)
- No suffix — full-width standalone image
- `side by side to x.NN` — 50/50 two-image layout
- `on it's own with one line text to the side` — image with placeholder caption beside it
- `smaller with x.NN as small detail to the side` — 2/3 main + 1/3 detail layout
- `side by side to x.NN & x.NN` — three-image row layout

**PDF mockup:** `inkfield.pdf` at project root shows intended design.

**Design language:**
- Clean, minimal, editorial
- Large images, generous whitespace
- Adobe Typekit fonts (already loaded)
- Consistent with existing pages (light background, subtle typography)

## Constraints

- **Tech stack:** Astro 5 + vanilla CSS only — no new frameworks or CSS preprocessors
- **Images:** Must be optimised before serving (WebP, appropriately sized) — use `public/` for static delivery
- **Routing:** File-based routing via `src/pages/work/[slug].astro`
- **Data:** Project data hardcoded in the Astro page (no CMS)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Image layout rules encoded in filenames | Designer specified layout per-image via naming convention | — Pending |
| Static image optimisation (pre-processed, output to public/) | Simpler than Astro's image pipeline for this asset structure | — Pending |
| Single dynamic route file | All 5 projects share one `[slug].astro` template | — Pending |

---
*Last updated: 2026-02-24 after initialization*
