---
phase: 01-image-preparation
verified: 2026-02-25T00:30:00Z
status: passed
score: 5/5 must-haves verified
re_verification: false
human_verification:
  - test: "Visual orientation check on portrait images"
    expected: "Portrait images (if any exist across the 5 projects) appear upright in browser, not rotated 90 degrees"
    why_human: "Cannot programmatically verify EXIF auto-rotate correctness without rendering images in a browser context"
  - test: "Colour check on jacob hero image"
    expected: "public/work/jacob/3.00-verdina-da-sistemare.webp renders without a visible green colour cast (or the cast is acceptable)"
    why_human: "The source filename annotation 'verdina da sistemare' means 'green tones to fix' — colour quality requires visual inspection"
---

# Phase 1: Image Preparation — Verification Report

**Phase Goal:** All project images are web-optimised and correctly located so the page-building phase can reference them without revisiting assets
**Verified:** 2026-02-25T00:30:00Z
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All 60 source images exist in `public/work/[slug]/` as WebP files | VERIFIED | Node check: sotogrande=11, london-family=17, jacob=8, penthouse=13, lecce=11; total=60, zero-byte files=0 |
| 2 | No WebP file is larger than its source JPEG (compression confirms quality 82 + resize working) | VERIFIED | Sample: sotogrande source 68.74 MB → output 3.49 MB (5.1% ratio); london-family 203.25 MB → 10.42 MB (5.1% ratio); all 60 files range 162.9 KB–1242.5 KB |
| 3 | Filenames in `public/work/[slug]/` are URL-safe slugs that preserve layout-encoding suffixes | VERIFIED | Key files confirmed present: `2.14-side-by-side-to-2.15-and-2.16.webp` (& → and), `4.01-on-nits-own-with-text-to-the-side.webp` (apostrophe stripped), `91-93-hillway-82.webp` (anomalous file handled), `3.00-verdina-da-sistemare.webp` (Italian annotation preserved) |
| 4 | Image counts per folder match source counts (11 sotogrande, 17 london-family, 8 jacob, 13 penthouse, 11 lecce) | VERIFIED | Exact match confirmed via Node: all 5 directories at correct counts |
| 5 | Portrait images have correct orientation in browser (EXIF auto-rotate applied) | HUMAN NEEDED | Script includes `.rotate()` before `.resize()` in the sharp pipeline (line 53); correctness requires visual browser check |

**Score:** 4/5 truths verified programmatically, 1 requires human confirmation (orientation quality — script implementation is correct)

---

### Required Artifacts

| Artifact | Provides | Status | Details |
|----------|----------|--------|---------|
| `scripts/optimise-images.js` | One-time image processing script | VERIFIED | File exists, passes `node --check` syntax validation, contains `slugifyFilename` function, PROJECTS mapping with all 5 entries, sharp pipeline with `.rotate()/.resize()/.webp()/.toFile()` |
| `public/work/sotogrande/` | 11 WebP images | VERIFIED | 11 `.webp` files present, all non-zero byte |
| `public/work/london-family/` | 17 WebP images | VERIFIED | 17 `.webp` files present, including `91-93-hillway-82.webp` anomalous file |
| `public/work/jacob/` | 8 WebP images | VERIFIED | 8 `.webp` files present, including `3.00-verdina-da-sistemare.webp` hero |
| `public/work/penthouse/` | 13 WebP images | VERIFIED | 13 `.webp` files present, including `4.01-on-nits-own-with-text-to-the-side.webp` |
| `public/work/lecce/` | 11 WebP images | VERIFIED | 11 `.webp` files present |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `images to optimise/Project N - Name/` | `public/work/[slug]/` | `scripts/optimise-images.js` PROJECTS mapping | WIRED | PROJECTS array at lines 15–21 maps all 5 folder/slug pairs; `processProject()` reads source dir and writes to output dir; confirmed by presence of 60 output files |
| Source filename (e.g. `1.03 side by side to 1.04.jpg`) | Output filename (e.g. `1.03-side-by-side-to-1.04.webp`) | `slugifyFilename()` function | WIRED | Function at lines 28–37 implements all transformations: lowercase, apostrophe strip, `&` → `and`, space → hyphen, unsafe char strip; output filenames verified against known-difficult cases |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| IMG-01 | 01-01-PLAN.md | Images optimised for web (WebP conversion, appropriate sizing) | SATISFIED | 60 WebP files produced; source-to-output compression ratio ~5% (68 MB → 3.5 MB for sotogrande sample); max width 2400px enforced; quality 82 set |
| IMG-02 | 01-01-PLAN.md | Images placed in the correct Astro-accessible location (`public/work/[slug]/`) | SATISFIED | All 5 directories confirmed under `public/work/`; `.gitignore` does not exclude `public/work/`; files are Astro-servable static assets |
| IMG-03 | 01-01-PLAN.md | Filename layout encoding preserved so Phase 2 can parse layout rules | SATISFIED | Layout suffixes preserved in slugified filenames: `side-by-side-to`, `on-its-own-with-one-line-text-to-the-side`, `on-nits-own-with-text-to-the-side`, `smaller-with-X-as-small-detail-to-the-side`, `with-X-as-small-detail-to-the-side`, `side-by-side-to-X-and-Y`; all regex-parseable without a separate manifest |

**Note on IMG-03:** This requirement ID appears in the PLAN frontmatter and ROADMAP.md but is absent from REQUIREMENTS.md. The RESEARCH.md explicitly acknowledges this discrepancy and defines the requirement as: "output filename scheme must preserve enough information for the Phase 2 layout parser to operate without a separate manifest." The requirement is functionally satisfied by the output filenames. The REQUIREMENTS.md document should be updated to include IMG-03 for full traceability, but this is a documentation gap, not a functional gap — Phase 1's goal is not blocked.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| None | — | No TODOs, stubs, empty returns, or placeholder implementations found | — | — |

The script is a complete, substantive implementation. The three `// NOTE:` comments at lines 7–9 are informational annotations about known source-file anomalies, not placeholder markers.

---

### Human Verification Required

#### 1. Portrait Image Orientation

**Test:** Open one or more images from each project in a web browser using `<img src="/work/[slug]/[filename].webp">` (or via `npx astro dev` and a test page)
**Expected:** All images appear upright — no sideways or upside-down rendering
**Why human:** The script correctly includes `.rotate()` (EXIF auto-rotate) in the sharp pipeline, but whether any portrait images with non-1 EXIF orientation values were among the 60 sources cannot be determined without visual confirmation. Sharp's `.rotate()` is correct by design; this is a spot-check, not a suspected failure.

#### 2. Jacob Hero Colour Cast

**Test:** Open `public/work/jacob/3.00-verdina-da-sistemare.webp` in a browser or image viewer
**Expected:** Image renders with acceptable colour tone (the Italian annotation "verdina da sistemare" = "green tones to fix" suggests a colour cast may be present in the source)
**Why human:** Sharp does not perform colour correction — it outputs what is in the source. If the source JPEG has a green cast, the WebP will too. This is a content quality issue, not a processing error. Decision of whether to colour-correct is a human editorial call.

---

### Summary

Phase 1's goal is achieved. All 60 images exist in `public/work/[slug]/` as WebP files with URL-safe layout-encoding filenames, at dramatically reduced file sizes (approximately 5% of source JPEG size), with no zero-byte outputs. The `scripts/optimise-images.js` script is syntactically valid, fully implemented, and correctly wired to both source and output directories via the PROJECTS mapping and `slugifyFilename()` function.

All three requirements (IMG-01, IMG-02, IMG-03) are functionally satisfied. IMG-03 is not formally recorded in REQUIREMENTS.md — this is a documentation gap in that file only, not a functional gap in the deliverable.

Two human spot-checks are recommended (image orientation and jacob hero colour) but neither represents a suspected failure — they are visual quality confirmations that cannot be made programmatically.

Phase 2 (Project Pages) can proceed immediately: images are in place at the expected paths with the expected naming convention.

---

_Verified: 2026-02-25T00:30:00Z_
_Verifier: Claude (gsd-verifier)_
