---
phase: 02-project-pages
plan: 02
subsystem: ui
tags: [astro, gallery, css, layout, filename-parser, webp, responsive]

# Dependency graph
requires:
  - phase: 02-01
    provides: Dynamic [slug].astro route skeleton with empty .project-gallery scaffold
  - phase: 01-image-preparation
    provides: WebP images in public/work/{slug}/ with layout-encoding filename conventions
provides:
  - parseGalleryRows() function parsing layout type from image filenames
  - Gallery rendering for all 5 layout variants in [slug].astro
  - Complete gallery CSS (all 5 variants + mobile responsive stacking) in global.css
affects: [visual-output, all-5-project-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Filename-suffix-based layout detection with consumed-set loop pattern
    - Partner file lookup via startsWith(prefix+"." or prefix+"-") to handle annotated filenames
    - GalleryRow TypeScript union type for type-safe layout row rendering
    - CSS grid for all multi-column variants (1fr 1fr, 2fr 1fr, 1fr 1fr 1fr, 2fr 1fr / 1fr 2fr)
    - Mobile-first grid collapse: multi-column -> 1fr at 768px breakpoint

key-files:
  created: []
  modified:
    - src/pages/work/[slug].astro
    - src/styles/global.css

key-decisions:
  - "Regex uses \\d+\\.\\d+ (not [\\d.]+) to capture partner numeric prefix — greedy dot capture was silently breaking three-up partner detection"
  - "findPartner() checks startsWith(prefix+.) OR startsWith(prefix+-) to match both plain (3.02.webp) and annotated (3.04-dettaglio.webp) partner filenames"
  - "london-family heroFile corrected to 91-93-hillway-82.webp per plan must_haves — previous plan had 2.01.webp which would have included the anomalous file in the gallery"
  - "LAYOUT-05 placeholder text: Interior design by Inkfield. — brief and tasteful as specified, real captions deferred to v2"
  - "Image DOM order: <img> always before <div class=gallery-text-column> — image precedes text at 1fr mobile layout without CSS order hacks"

patterns-established:
  - "Gallery CSS gap system: 32px desktop (row and column), 16px mobile"
  - "Text alternation pattern: even imageTextCount index = text right, odd = text left"

requirements-completed: [PAGE-02, PAGE-04, PAGE-05, LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-04, LAYOUT-05, DESIGN-03]

# Metrics
duration: 7min
completed: 2026-02-25
---

# Phase 2 Plan 2: Gallery Layout System Summary

**Filename-parser (parseGalleryRows) detecting 5 layout variants from suffix patterns, gallery rendering in [slug].astro, and complete gallery CSS with 32px gap system and mobile stacking**

## Status: AWAITING CHECKPOINT APPROVAL (Task 3)

Tasks 1 and 2 committed. Task 3 is a human-verify checkpoint — plan resumes after approval.

## Performance

- **Duration:** ~7 min (Tasks 1–2)
- **Started:** 2026-02-25T09:09:59Z
- **Completed:** 2026-02-25T09:16:32Z (awaiting Task 3 approval)
- **Tasks:** 2 of 3 complete (Task 3 = checkpoint)
- **Files modified:** 2

## Accomplishments

- `parseGalleryRows()` function processes sorted filenames sequentially using a consumed-set pattern
- Detects all 5 layout types from filename suffix patterns: three-up before side-by-side to avoid prefix collision
- Partner file lookup handles both plain (`3.04.webp`) and annotated (`3.04-dettaglio.webp`) filenames
- All 5 layout variants render in template: full, side-by-side, main-detail, three-up, image-text
- Image-with-text alternates text side (right for even, left for odd occurrences)
- Complete gallery CSS with consistent 32px gap system (row and column, all variants)
- Mobile: all multi-column variants collapse to single column at 768px, no overflow
- `npm run build` exits 0 — all 5 project pages generate correctly

## Task Commits

Each task was committed atomically:

1. **Task 1: Add filename parser and gallery rendering to [slug].astro** - `c86da28` (feat)
2. **Task 2: Add gallery layout CSS to global.css** - `87c1fea` (feat)

## Files Created/Modified

- `src/pages/work/[slug].astro` — Added parseGalleryRows() + GalleryRow type + gallery template rendering (265 lines total)
- `src/styles/global.css` — Appended GALLERY LAYOUTS section: 5 layout variant classes, mobile breakpoint

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed greedy regex dot capture breaking three-up partner detection**
- **Found during:** Task 1 verification
- **Issue:** Regex `[\d.]+` greedily captured trailing dot in second partner prefix (e.g. `"4.08."` instead of `"4.08"`), causing `findPartner()` to search for files starting with `"4.08.."` — no match
- **Fix:** Changed to `\d+\.\d+` which captures exactly two dot-separated numeric groups
- **Files modified:** `src/pages/work/[slug].astro`
- **Commit:** `c86da28`

**2. [Rule 1 - Bug] Fixed findPartner() not matching annotated partner filenames**
- **Found during:** Task 1 verification (jacob gallery showed duplicated primary images)
- **Issue:** `findPartner()` used `startsWith(prefix + ".")` only — failed to match `3.04-dettaglio.webp` when looking for prefix `3.04`
- **Fix:** Added OR condition: `startsWith(prefix + ".")` OR `startsWith(prefix + "-")`
- **Files modified:** `src/pages/work/[slug].astro`
- **Commit:** `c86da28`

**3. [Rule 1 - Bug] Corrected london-family heroFile**
- **Found during:** Task 1 — cross-checking must_haves
- **Issue:** Previous plan set `heroFile: "2.01.webp"` for london-family, but plan 02-02 must_haves require `91-93-hillway-82.webp` as hero (anomalous file excluded from gallery)
- **Fix:** Updated heroFile to `"91-93-hillway-82.webp"` in both project data arrays
- **Files modified:** `src/pages/work/[slug].astro`
- **Commit:** `c86da28`

## Self-Check: PARTIAL (awaiting Task 3 checkpoint)

- FOUND: src/pages/work/[slug].astro (265 lines)
- FOUND: src/styles/global.css (contains .gallery-row--side-by-side, .gallery-row--three-up, .gallery-row--image-text)
- FOUND commit: c86da28 (Task 1)
- FOUND commit: 87c1fea (Task 2)
- Build: npm run build exits 0, 8 pages generated
- Gallery images: all 5 projects emit correct non-duplicate image sets verified via built HTML grep
