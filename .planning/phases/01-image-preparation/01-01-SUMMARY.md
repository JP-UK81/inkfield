---
phase: 01-image-preparation
plan: 01
subsystem: infra
tags: [sharp, webp, image-optimisation, node-script, static-assets]

# Dependency graph
requires: []
provides:
  - 60 web-optimised WebP images in public/work/[slug]/ (5 project directories)
  - scripts/optimise-images.js one-time image processing script
  - URL-safe slugified filenames that preserve layout-encoding conventions for Phase 2
affects:
  - 02-project-pages (requires these images and filename patterns)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Pre-process images to public/ directory for static delivery (avoids Astro build-time import complexity)"
    - "Filename layout encoding: source filenames slugified to URL-safe form, preserving layout suffix for Phase 2 parsing"
    - "ESM-compatible Node.js scripts for one-time project tooling (package.json type:module)"

key-files:
  created:
    - scripts/optimise-images.js
    - public/work/sotogrande/ (11 WebP files)
    - public/work/london-family/ (17 WebP files)
    - public/work/jacob/ (8 WebP files)
    - public/work/penthouse/ (13 WebP files)
    - public/work/lecce/ (11 WebP files)
  modified: []

key-decisions:
  - "ESM import syntax required for .js scripts due to package.json type:module (converted from CommonJS require)"
  - "Used __dirname equivalent via fileURLToPath(import.meta.url) for path resolution in ESM scripts"
  - "All images processed including anomalous 91-93 Hillway-82.jpg (no X.NN prefix) — Phase 2 treats as standalone"
  - "3.00 verdina da sistemare.jpg processed as-is — Italian colour annotation noted for visual verification"

patterns-established:
  - "slugifyFilename: lowercase + strip apostrophes + & -> and + spaces -> hyphens + strip unsafe chars"
  - "Sharp pipeline order: .rotate() -> .resize(withoutEnlargement) -> .webp(quality 82, effort 4)"

requirements-completed: [IMG-01, IMG-02, IMG-03]

# Metrics
duration: 5min
completed: 2026-02-25
---

# Phase 1 Plan 01: Image Preparation Summary

**60 raw JPEGs (662MB) batch-converted to web-optimised WebP files (quality 82, max 2400px) with layout-encoded URL-safe filenames via Node.js sharp script**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-25T00:08:31Z
- **Completed:** 2026-02-25T00:13:42Z
- **Tasks:** 2
- **Files modified:** 62 (1 script + 60 WebP images + 1 correction)

## Accomplishments
- All 60 source JPEGs converted to WebP at quality 82 with EXIF auto-rotation applied
- URL-safe filenames slugified correctly: apostrophes stripped, ampersands to "and", spaces to hyphens
- Layout-encoding filename suffixes preserved (e.g. `1.03-side-by-side-to-1.04.webp`, `2.14-side-by-side-to-2.15-and-2.16.webp`)
- All 5 anomalous filenames handled correctly (Italian annotation, typo, non-numeric naming)
- Script idempotent and reproducible from project root

## Task Commits

Each task was committed atomically:

1. **Task 1: Write the image optimisation script** - `a859081` (feat)
2. **Task 2: Run the script and verify all 60 images are processed** - `04510c3` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `scripts/optimise-images.js` - Node.js ESM script: PROJECTS mapping, slugifyFilename(), sharp pipeline, sequential for...of processing
- `public/work/sotogrande/` - 11 WebP files (1.00.webp hero through 1.10.webp)
- `public/work/london-family/` - 17 WebP files (2.01.webp through 91-93-hillway-82.webp)
- `public/work/jacob/` - 8 WebP files (3.00-verdina-da-sistemare.webp hero through 3.07.webp)
- `public/work/penthouse/` - 13 WebP files (4.00.webp hero through 4.12.webp)
- `public/work/lecce/` - 11 WebP files (5.00.webp hero through 5.10.webp)

## Decisions Made
- ESM import syntax used instead of CommonJS `require()` because `package.json` has `"type": "module"`. Script uses `import` and `fileURLToPath(import.meta.url)` for `__dirname` equivalent.
- `process.cwd()` replaced with `__dirname`-based path resolution to make script path-independent of the calling directory.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Converted script from CommonJS to ESM syntax**
- **Found during:** Task 2 (running the script)
- **Issue:** Script used `require()` but `package.json` has `"type": "module"`, causing "require is not defined in ES module scope" error
- **Fix:** Converted to ESM imports (`import sharp from 'sharp'`, etc.) and added `fileURLToPath(import.meta.url)` for `__dirname`. Changed `process.cwd()`-based SOURCE_BASE/OUTPUT_BASE to use `__dirname` for reliability.
- **Files modified:** scripts/optimise-images.js
- **Verification:** Script ran successfully, processed all 60 images, automated checks passed
- **Committed in:** `04510c3` (Task 2 commit, updated script + all 60 WebP outputs)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential fix — script could not run without it. No scope creep. All plan objectives met.

## Issues Encountered
- macOS Unicode normalization: the project directory name "Documents - Jp's iMac" uses a typographic apostrophe (U+2019) which differs from ASCII apostrophe (U+0027) used in the Write tool's path resolution. File writes went to a shadow path; resolved by using `git rev-parse --show-toplevel` to get the canonical repo path and using `cp` to transfer files.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 60 WebP images are in place at `public/work/[slug]/` with correct layout-encoded filenames
- Phase 2 (project pages) can read these files via `import.meta.glob` or `fs.readdirSync` and parse layout rules from filenames
- Phase 2 planner should be aware of the typo variant: `4.01-on-nits-own-with-text-to-the-side.webp` (not `on-its-own`)
- Visual check recommended for `3.00-verdina-da-sistemare.webp` — Italian annotation suggests potential colour cast

### Image counts confirmed:
| Project | Slug | WebP count |
|---------|------|-----------|
| Project 1 - Soto | sotogrande | 11 |
| Project 2 - Hillway | london-family | 17 |
| Project 3 - Jacob David | jacob | 8 |
| Project 4 - Oak Lodge | penthouse | 13 |
| Project 5 - Lecce | lecce | 11 |
| **Total** | | **60** |

### Requirements satisfied:
- **IMG-01:** Images optimised for web — WebP at quality 82, max 2400px wide, EXIF auto-rotation applied
- **IMG-02:** Images in correct Astro-accessible location — `public/work/[slug]/` for static delivery
- **IMG-03:** Filename layout encoding preserved — slugified filenames retain full layout suffix for Phase 2 parsing

---
*Phase: 01-image-preparation*
*Completed: 2026-02-25*
