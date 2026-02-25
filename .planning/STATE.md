# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-24)

**Core value:** Each project page must feel like a curated editorial spread — the right images, in the right layout, at the right quality.
**Current focus:** Phase 2 — Project Pages (Plan 1 complete)

## Current Position

Phase: 2 of 2 (Project Pages)
Plan: 1 of 2 in current phase
Status: Phase 2 in progress — Plan 02-01 complete, Plan 02-02 next
Last activity: 2026-02-25 — Plan 02-01 complete

Progress: [███████░░░] 75%

## Performance Metrics

**Velocity:**
- Total plans completed: 2
- Average duration: 4.5 min
- Total execution time: 9 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-image-preparation | 1 | 5min | 5min |
| 02-project-pages | 1 | 4min | 4min |

**Recent Trend:**
- Last 5 plans: 5min, 4min
- Trend: Fast execution

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Image layout rules encoded in filenames (designer-specified naming convention)
- Static image optimisation pre-processed (simpler than Astro's image pipeline for this asset structure)
- Single dynamic route file — all 5 projects share one `[slug].astro` template
- ESM import syntax required for .js scripts due to package.json type:module
- Used fileURLToPath(import.meta.url) for __dirname equivalent in ESM scripts
- All images including anomalous 91-93 Hillway-82.jpg included; Phase 2 treats as standalone
- Typo variant 4.01-on-nits-own-with-text-to-the-side.webp noted for Phase 2 parser awareness
- getStaticPaths() requires self-contained data — project array duplicated inside function (Astro constraint)
- Hero image path: /work/{slug}/{heroFile} — matches Phase 1 output directory structure
- .project-gallery left empty as scaffold in 02-01 — Plan 02-02 fills gallery rendering

### Pending Todos

- Visually verify 3.00-verdina-da-sistemare.webp (jacob hero) for colour cast (Italian "green to fix" annotation)

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-02-25
Stopped at: Completed 02-project-pages/02-01-PLAN.md — [slug].astro route + CSS scaffold complete
Resume file: None
