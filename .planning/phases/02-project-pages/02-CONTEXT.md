# Phase 2: Project Pages - Context

**Gathered:** 2026-02-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Build `src/pages/work/[slug].astro` — a dynamic route that renders all 5 project detail pages (sotogrande, jacob, london-family, penthouse, lecce). Each page shows a full-width hero, a title/excerpt block, and a gallery where image layout variant is parsed from filenames. Routing, gallery layout system, and all 5 projects ship in this phase. Lightbox, next/prev navigation, and real caption copy are out of scope.

</domain>

<decisions>
## Implementation Decisions

### Hero & page header
- Hero image renders full-width (edge-to-edge) at the top of the page
- Below the hero: a contained-width block (same left/right margins as site body) showing project title + excerpt
- A small back link (← All projects or similar) appears near the title block — above or below it
- Title block is NOT full-bleed; it sits within comfortable page margins

### Gallery rhythm & spacing
- Gallery images sit within a contained width with consistent left/right margins (not full-bleed)
- Moderate breathing room between rows — approximately 24–40px gap
- Column gap within a multi-column row matches the row gap — consistent whitespace in all directions
- Purely visual: no row numbers, labels, or captions (except LAYOUT-05 text column)

### Image-with-text layout (LAYOUT-05)
- Text column alternates sides per image — first occurrence text on right, next on left, alternating down the page
- Column split ratio: Claude's discretion (balanced for the design)
- Vertical alignment of text within column: Claude's discretion
- Placeholder text while real captions aren't written: Claude's discretion — handle gracefully (avoid lorem ipsum)

### Claude's Discretion
- Exact column split for LAYOUT-05 (image vs text width)
- Vertical text alignment within LAYOUT-05 text column
- LAYOUT-05 placeholder text treatment
- Exact gap values within the 24–40px moderate range
- Typography sizing and weight for title block (match existing site conventions)
- Mobile breakpoint values and stacking behaviour for multi-column layouts

</decisions>

<specifics>
## Specific Ideas

- Interior design portfolio feel — editorial, image-led. Images should be the hero; text is secondary.
- The title block and gallery should feel like they belong to the same page — consistent margin/padding rhythm throughout.

</specifics>

<deferred>
## Deferred Ideas

- Real caption copy for LAYOUT-05 text columns — client to provide (v2: CONT-01)
- Project metadata (year, location, sqm, services) — v2: CONT-02
- Image lightbox / full-screen zoom — v2: ENH-01
- Next/previous project navigation — v2: ENH-02

</deferred>

---

*Phase: 02-project-pages*
*Context gathered: 2026-02-25*
