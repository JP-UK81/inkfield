# Roadmap: Inkfield — Project Detail Pages

## Overview

This milestone builds the five project detail pages (`/work/[slug]`) for the Inkfield portfolio site. Work flows in two phases: first, source images are optimised and placed where Astro can serve them; then, the dynamic route and gallery layout system are built, delivering all five pages in the correct editorial style.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Image Preparation** - Optimise and place all project images ready for Astro
- [ ] **Phase 2: Project Pages** - Build the dynamic route, gallery layout system, and ship all 5 projects

## Phase Details

### Phase 1: Image Preparation
**Goal**: All project images are web-optimised and correctly located so the page-building phase can reference them without revisiting assets
**Depends on**: Nothing (first phase)
**Requirements**: IMG-01, IMG-02, IMG-03
**Success Criteria** (what must be TRUE):
  1. Every image exists in `public/work/[slug]/` as a WebP file at appropriate dimensions
  2. No source image is being served as a raw uncompressed file
  3. File naming preserves the layout-encoding convention so the route can parse it
**Plans**: 1 plan

Plans:
- [ ] 01-01-PLAN.md — Write and run image optimisation script to convert 60 source JPEGs to WebP in public/work/[slug]/

### Phase 2: Project Pages
**Goal**: All five project detail pages are live, matching the PDF mockup's layout rules and the site's design language, and work correctly on mobile
**Depends on**: Phase 1
**Requirements**: ROUTE-01, PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05
**Success Criteria** (what must be TRUE):
  1. Visiting `/work/sotogrande`, `/work/jacob`, `/work/london-family`, `/work/penthouse`, and `/work/lecce` each renders a complete project page
  2. Each page shows a full-width hero image, followed by a gallery where images appear in their correct layout variant (full-width, side-by-side, main+detail, three-up, image-with-text)
  3. Typography, spacing, and colour match the existing homepage and about page — the pages feel like part of the same site
  4. All pages are usable on mobile: images resize correctly, side-by-side layouts stack or scale without overflow
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Image Preparation | 0/1 | Not started | - |
| 2. Project Pages | 0/? | Not started | - |
