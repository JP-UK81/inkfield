# Architecture

**Analysis Date:** 2026-02-24

## Pattern Overview

**Overall:** Static Site Generator (SSG) with Server-Side Rendering (SSR)

**Key Characteristics:**
- File-based routing with Astro framework
- Component-based page composition using `.astro` files
- Client-side interactivity via vanilla JavaScript
- CSS-first styling approach with single global stylesheet
- No database or backend API layer

## Layers

**Presentation Layer:**
- Purpose: Render pages and handle client interactions
- Location: `src/pages/`, `src/layouts/`
- Contains: Route definitions, page-specific markup, layout templates
- Depends on: Global styles, static assets
- Used by: Astro build system

**Layout & Component Layer:**
- Purpose: Provide reusable page template structure
- Location: `src/layouts/Layout.astro`
- Contains: HTML shell, header/footer, menu overlay structure, global navigation
- Depends on: Global CSS, client-side menu interaction script
- Used by: All page components

**Styling Layer:**
- Purpose: Provide all visual presentation and responsive design
- Location: `src/styles/global.css`
- Contains: Reset rules, grid/layout utilities (`.grid-content`), component styles (hero, intro, about, work)
- Depends on: External font (Adobe Typekit via typekit.net)
- Used by: All `.astro` files

**Assets Layer:**
- Purpose: Store static resources accessed at build/runtime
- Location: `public/` (images, logos, favicons), `src/assets/` (SVG icons)
- Contains: Hero image, project images, branding assets
- Depends on: None
- Used by: All pages via direct path references

## Data Flow

**Page Rendering Flow:**

1. Request to `/`, `/about`, or `/work` route
2. Astro matches route to corresponding file in `src/pages/`
3. Page component imports `Layout.astro`
4. Layout renders HTML shell with header, navigation, footer
5. Page component provides content via `<slot />`
6. Astro compiles to static HTML with inlined styles
7. Browser receives complete HTML (no JS bundle for static content)
8. Client-side menu toggle script attaches event listeners

**Work Page Data Flow:**

1. `src/pages/work.astro` defines `projects` array with hardcoded data
2. Component maps array to `.work-item` elements with dynamic properties
3. Each project links to `/work/{slug}` (routes to be implemented)
4. No data fetching - all data embedded in component

**State Management:**
- None persistent. Only ephemeral client state: menu toggle state via DOM classes
- Menu state tracked by `.hamburger.open` and `.menu-overlay.active` classes
- No cookies, localStorage, or session management

## Key Abstractions

**Grid Layout System:**
- Purpose: Provide max-width constraint and horizontal padding
- Examples: `.grid-content` class used in intro and about sections
- Pattern: Applies `max-width: 1600px`, `margin: 0 auto`, `padding: 0 20px`

**Menu Toggle Component:**
- Purpose: Handle mobile navigation overlay visibility
- Examples: `src/layouts/Layout.astro` lines 53-66
- Pattern: Vanilla JS with class-based state (`.open`, `.active`), event delegation on hamburger and close button

**Project Card Component:**
- Purpose: Display portfolio project with metadata
- Examples: `.work-item` mapped from `projects` array in `src/pages/work.astro`
- Pattern: Anchor tag wrapper with nested image and metadata divs, hover effects

## Entry Points

**Home Page:**
- Location: `src/pages/index.astro`
- Triggers: Request to `/`
- Responsibilities: Display hero section with CTA button, intro section with company pitch and featured image

**About Page:**
- Location: `src/pages/about.astro`
- Triggers: Request to `/about`
- Responsibilities: Display about section with profile image and company/founder biography

**Work/Projects Page:**
- Location: `src/pages/work.astro`
- Triggers: Request to `/work`
- Responsibilities: Display portfolio grid, map hardcoded projects array to linked cards

**Layout Wrapper:**
- Location: `src/layouts/Layout.astro`
- Triggers: Imported by all page components
- Responsibilities: Provide HTML document structure, header with navigation, footer with contact info, menu overlay with navigation links

## Error Handling

**Strategy:** Minimal error handling - static content generation assumes data availability

**Patterns:**
- No try/catch blocks
- No validation of image paths or external resources
- Assets loaded via absolute paths (`/hero.jpg`, `/inkfield-logo.svg`)
- External font loaded via CDN with fallback font stack

## Cross-Cutting Concerns

**Logging:** Not applicable - static site with no runtime errors expected

**Validation:** Not applicable - no form submission or user input validation

**Authentication:** Not applicable - public portfolio site with no authentication required

---

*Architecture analysis: 2026-02-24*
