---
phase: 02-project-pages
plan: 01
subsystem: ui
tags: [astro, static-paths, project-pages, css, webp]

# Dependency graph
requires:
  - phase: 01-image-preparation
    provides: Optimised WebP images in public/work/{slug}/ directories with heroFile naming convention
provides:
  - Dynamic Astro route src/pages/work/[slug].astro serving 5 project pages
  - Full-bleed hero image rendering from public/work/{slug}/{heroFile}
  - Contained title/excerpt/back-link header block using .grid-content
  - Empty .project-gallery scaffold for Plan 02 gallery layout
  - Project page CSS section in global.css (.project-hero, .project-header, .project-back, .project-title, .project-excerpt, .project-gallery)
affects: [02-02-gallery-layout, future-project-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Astro getStaticPaths() with hardcoded project data array returning slug/title/excerpt/heroFile props
    - Full-bleed hero via width:100% on .project-hero with no container wrapping
    - .grid-content containment pattern for header/gallery blocks within full-bleed page

key-files:
  created:
    - src/pages/work/[slug].astro
  modified:
    - src/styles/global.css

key-decisions:
  - "Duplicate project data array in getStaticPaths() and component scope — Astro requires getStaticPaths to be self-contained (no access to module-level vars), so the array is intentionally repeated rather than factored"
  - "Hero image path constructed as /work/{slug}/{heroFile} — matches Phase 1 output directory structure"
  - "Empty .project-gallery div left as scaffold — Plan 02 fills internals, intentional separation of concerns"

patterns-established:
  - "Project page pattern: full-bleed .project-hero above header, then .project-header.grid-content below"
  - "Back navigation: .project-back with left-arrow text and href=/work"

requirements-completed: [ROUTE-01, ROUTE-02, PAGE-01, PAGE-03, DESIGN-01, DESIGN-02, DESIGN-03]

# Metrics
duration: 4min
completed: 2026-02-25
---

# Phase 2 Plan 1: Project Pages Skeleton Summary

**Astro dynamic route [slug].astro with 5 static project paths, full-bleed WebP hero images, and contained title/excerpt/back-link blocks styled via global.css**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-25T09:01:35Z
- **Completed:** 2026-02-25T09:05:01Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Dynamic Astro route at src/pages/work/[slug].astro generates all 5 project pages at build time
- Full-bleed hero images served from Phase 1 WebP assets in public/work/{slug}/
- Contained header block (title, excerpt, back link) using existing .grid-content pattern
- Complete project page CSS section added to global.css with mobile breakpoints

## Task Commits

Each task was committed atomically:

1. **Task 1: Create [slug].astro with static paths, project data, hero, and title block** - `ffc3c7d` (feat)
2. **Task 2: Add project page CSS to global.css** - `f3e73e1` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/pages/work/[slug].astro` - Dynamic route: getStaticPaths with 5 entries, hero + header + gallery scaffold template (108 lines)
- `src/styles/global.css` - Appended PROJECT PAGES section with 7 rule blocks and mobile breakpoint

## Decisions Made
- Astro requires `getStaticPaths()` to be self-contained (no access to module-level variables), so the project data array is intentionally duplicated inside the function body rather than factored into a shared constant.
- Hero image path pattern `/work/{slug}/{heroFile}` matches the Phase 1 output directory structure exactly.
- `.project-gallery` div left empty as intentional scaffold — Plan 02 adds gallery rendering inside it.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

The `npx astro build` command used the wrong globally cached Astro version (5.17.3 via npx) which failed to find `src/pages`. Resolved by using `npm run build` which correctly invokes the locally installed Astro from node_modules. Not a code issue — standard npm vs npx resolution behaviour.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All 5 project page URLs return rendered pages with hero image and title block: /work/sotogrande, /work/jacob, /work/london-family, /work/penthouse, /work/lecce
- `npm run build` exits 0 with all 8 pages generated
- .project-gallery container is empty and ready for Plan 02 gallery layout system
- Hero image reaching page edges depends on browser verification (build confirms src is correct)

---
*Phase: 02-project-pages*
*Completed: 2026-02-25*

## Self-Check: PASSED

- FOUND: src/pages/work/[slug].astro
- FOUND: src/styles/global.css
- FOUND: .planning/phases/02-project-pages/02-01-SUMMARY.md
- FOUND commit: ffc3c7d (Task 1)
- FOUND commit: f3e73e1 (Task 2)
- CSS contains .project-hero, .project-gallery
