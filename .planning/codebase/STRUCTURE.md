# Codebase Structure

**Analysis Date:** 2026-02-24

## Directory Layout

```
inkfield/
├── src/                    # Source code (Astro compilation source)
│   ├── assets/            # Bundled SVG assets (astro.svg)
│   ├── components/        # Reusable components (empty - not yet used)
│   ├── layouts/           # Page layout templates (Layout.astro)
│   ├── pages/             # File-based routes (auto-routed by Astro)
│   │   ├── index.astro    # Home page (/)
│   │   ├── about.astro    # About page (/about)
│   │   └── work.astro     # Portfolio page (/work)
│   └── styles/            # Global stylesheets
│       └── global.css     # Single CSS file for all styling
├── public/                # Static assets (served directly)
│   ├── *.jpg             # Page-specific images (hero.jpg, chair.jpg, about.jpg)
│   ├── *.svg             # Branding (inkfield-logo.svg, favicon.svg)
│   ├── work/             # Project portfolio images
│   └── favicon.ico       # Browser tab icon
├── astro.config.mjs      # Astro build configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
└── package-lock.json     # Locked dependency versions
```

## Directory Purposes

**`src/`:**
- Purpose: All source code processed by Astro build system
- Contains: Pages, layouts, styles, and component definitions
- Key files: `pages/index.astro`, `layouts/Layout.astro`, `styles/global.css`

**`src/pages/`:**
- Purpose: Define site routes (file-based routing)
- Contains: One `.astro` file per route
- Key files:
  - `src/pages/index.astro`: Home page route
  - `src/pages/about.astro`: About page route
  - `src/pages/work.astro`: Portfolio/work page route
- Pattern: Filename becomes URL path (e.g., `about.astro` → `/about`)

**`src/layouts/`:**
- Purpose: Provide shared HTML structure and layout wrapper
- Contains: Reusable page templates
- Key files: `src/layouts/Layout.astro` (site-wide header, footer, navigation)

**`src/styles/`:**
- Purpose: Store all stylesheet definitions
- Contains: Global CSS (not scoped to components)
- Key files: `src/styles/global.css` (347 lines of all site styling)

**`src/assets/`:**
- Purpose: Store SVG and vector assets for bundling
- Contains: Unused `astro.svg` from template
- Note: Project images stored in `public/work/` instead

**`src/components/`:**
- Purpose: Store reusable Astro components
- Contains: Empty directory
- Note: No components currently defined; all UI inline in pages

**`public/`:**
- Purpose: Store static assets served directly without processing
- Contains: Images, logos, favicons, images for portfolio projects
- Key files:
  - `public/hero.jpg`: Hero section background image
  - `public/chair.jpg`: Intro section featured image
  - `public/about.jpg`: About page profile image
  - `public/inkfield-logo.svg`: Site logo used in header/footer
  - `public/work/`: Portfolio project images (work-*.jpg files)
- Pattern: Assets referenced with absolute paths in HTML (e.g., `/hero.jpg`)

## Key File Locations

**Entry Points:**
- `src/pages/index.astro`: Home page entry point
- `src/pages/about.astro`: About page entry point
- `src/pages/work.astro`: Work/portfolio page entry point

**Configuration:**
- `astro.config.mjs`: Astro build and dev server settings
- `tsconfig.json`: TypeScript strict mode configuration
- `package.json`: Project metadata, dependencies (`astro@^5.17.1`), scripts

**Core Layout:**
- `src/layouts/Layout.astro`: Master HTML template with header, footer, global navigation, menu overlay

**Core Styling:**
- `src/styles/global.css`: All visual styling for all pages and components

**Assets:**
- Images: `public/*.jpg` and `public/work/*.jpg`
- Logo: `public/inkfield-logo.svg`
- Icons: `src/assets/astro.svg` (unused)

**Testing:**
- Not applicable - no tests in codebase

## Naming Conventions

**Files:**
- Route files: Lowercase with hyphens (e.g., `index.astro`, `about.astro`)
- Layout files: PascalCase (e.g., `Layout.astro`)
- CSS classes: Lowercase with hyphens (e.g., `.site-header`, `.work-item`, `.menu-overlay`)
- Image files: Lowercase with hyphens (e.g., `hero.jpg`, `work-sotogrande.jpg`)

**Directories:**
- Feature directories: Lowercase plural (e.g., `pages`, `layouts`, `styles`, `assets`)
- Portfolio project images: Organized in `public/work/` directory

**CSS Class Naming:**
- Semantic descriptors: `.site-header`, `.site-footer`, `.intro`, `.about`, `.work-item`
- State modifiers: `.open` (for hamburger), `.active` (for menu overlay)
- Layout utilities: `.grid-content` (max-width container), `.no-scroll` (applied to body)

**JavaScript Variables (in Layout.astro):**
- camelCase: `hamburger`, `menu`, `closeBtn`, `toggleMenu()`

## Where to Add New Code

**New Page Route:**
- Create file in `src/pages/[route-name].astro`
- Import and use `Layout` component: `import Layout from "../layouts/Layout.astro"`
- Wrap page content with `<Layout title="Page Title">` component
- Example: `src/pages/contact.astro` for `/contact` route

**New Component (for reuse):**
- Create file in `src/components/[ComponentName].astro`
- Use PascalCase filename
- Import in page or layout: `import ComponentName from "../components/ComponentName.astro"`
- Example: `src/components/ProjectCard.astro` for portfolio cards

**New Styles:**
- Add CSS rules to `src/styles/global.css`
- Use `.class-name` naming convention matching HTML structure
- Add responsive breakpoints via `@media (max-width: 900px)` patterns
- Example: Add section styles at end of file before closing

**Static Assets:**
- Images for display: Place in `public/` or `public/work/` subdirectories
- Reference with absolute path: `src="/image-name.jpg"` in templates
- Example: Portfolio images go to `public/work/work-project-name.jpg`

**Portfolio Project Data:**
- Currently hardcoded in `src/pages/work.astro` as `projects` array (lines 4-39)
- To add project: Add object to array with `slug`, `title`, `excerpt`, `image` properties
- Example: `{ slug: "new-project", title: "Project Title", excerpt: "Description", image: "/work/work-new.jpg" }`

## Special Directories

**`.astro/`:**
- Purpose: Astro framework build cache and type definitions
- Generated: Yes (automatically by Astro)
- Committed: No (in `.gitignore`)

**`.vscode/`:**
- Purpose: VS Code editor configuration and extensions
- Generated: No (manually created)
- Committed: Yes (contains editor settings)

**`node_modules/`:**
- Purpose: Installed npm dependencies
- Generated: Yes (from `npm install`)
- Committed: No (in `.gitignore`)

**`dist/`:**
- Purpose: Production build output (generated by `npm run build`)
- Generated: Yes (by Astro build process)
- Committed: No (in `.gitignore`)

**`.planning/codebase/`:**
- Purpose: GSD codebase analysis documents
- Generated: Yes (by mapping tool)
- Committed: Yes (for reference)

---

*Structure analysis: 2026-02-24*
