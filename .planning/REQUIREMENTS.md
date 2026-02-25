# Requirements: Inkfield Project Detail Pages

**Defined:** 2026-02-24
**Core Value:** Each project page feels like a curated editorial spread — the right images, in the right layout, at the right quality.

## v1 Requirements

### Image Optimisation

- [x] **IMG-01**: All project images converted to WebP format
- [x] **IMG-02**: Images resized to appropriate max dimensions for web display
- [x] **IMG-03**: Optimised images placed in `public/work/[slug]/` ready to serve

### Routing

- [ ] **ROUTE-01**: `src/pages/work/[slug].astro` dynamic route exists and resolves all 5 slugs
- [ ] **ROUTE-02**: Each slug (sotogrande, jacob, london-family, penthouse, lecce) renders a unique project page

### Project Page Structure

- [ ] **PAGE-01**: Hero image displays full-width at top of page
- [ ] **PAGE-02**: Project title and description displayed on page
- [ ] **PAGE-03**: Image gallery renders below hero in correct sequence
- [ ] **PAGE-04**: Project description / excerpt shown (from existing work.astro data)

### Image Layout Rules

- [ ] **LAYOUT-01**: Full-width standalone images render edge-to-edge
- [ ] **LAYOUT-02**: "Side by side" image pairs render in a 50/50 two-column grid
- [ ] **LAYOUT-03**: "Smaller with detail to the side" renders 2/3 main + 1/3 detail
- [ ] **LAYOUT-04**: "Three-up" (side by side to X & Y) renders three equal columns
- [ ] **LAYOUT-05**: "On its own with text to the side" renders image + placeholder caption text beside it

### Design

- [ ] **DESIGN-01**: Page typography, colours, and spacing match existing site
- [ ] **DESIGN-02**: Layout is mobile-responsive (single column on small screens)
- [ ] **DESIGN-03**: Consistent with `src/styles/global.css` conventions

## v2 Requirements

### Content

- **CONT-01**: Real captions for "text to the side" images (copy to be written by client)
- **CONT-02**: Project metadata (year, location, area sqm, services provided)

### Enhancements

- **ENH-01**: Image lightbox / full-screen zoom
- **ENH-02**: Next/previous project navigation
- **ENH-03**: Sitemap integration (`@astrojs/sitemap`)

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS / headless content | Overkill for 5 static projects |
| Contact form on project pages | Not in mockup |
| New projects beyond 5 | Future milestone |
| OAuth / auth | Not applicable |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| IMG-01 | Phase 1 | Complete |
| IMG-02 | Phase 1 | Complete |
| IMG-03 | Phase 1 | Complete |
| ROUTE-01 | Phase 2 | Pending |
| ROUTE-02 | Phase 2 | Pending |
| PAGE-01 | Phase 2 | Pending |
| PAGE-02 | Phase 2 | Pending |
| PAGE-03 | Phase 2 | Pending |
| PAGE-04 | Phase 2 | Pending |
| LAYOUT-01 | Phase 2 | Pending |
| LAYOUT-02 | Phase 2 | Pending |
| LAYOUT-03 | Phase 2 | Pending |
| LAYOUT-04 | Phase 2 | Pending |
| LAYOUT-05 | Phase 2 | Pending |
| DESIGN-01 | Phase 2 | Pending |
| DESIGN-02 | Phase 2 | Pending |
| DESIGN-03 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 17
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-24*
*Last updated: 2026-02-25 after Phase 1 Plan 01 completion (IMG-01, IMG-02, IMG-03 complete)*
