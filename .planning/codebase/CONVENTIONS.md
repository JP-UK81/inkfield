# Coding Conventions

**Analysis Date:** 2026-02-24

## Naming Patterns

**Files:**
- Astro page files use lowercase with hyphens: `index.astro`, `about.astro`, `work.astro`
- Layout files use PascalCase: `Layout.astro`
- CSS files use lowercase: `global.css`
- Asset files use lowercase with hyphens for multi-word names: `astro.svg`, `background.svg`

**Functions:**
- JavaScript functions and methods use camelCase: `toggleMenu()`, `addEventListener()`
- No explicit function declarations observed; inline JavaScript within Astro frontmatter and script tags

**Variables:**
- CSS custom properties not used; hardcoded hex values throughout
- JavaScript variables use camelCase: `hamburger`, `menu`, `closeBtn`, `toggleMenu`
- Data arrays use camelCase: `projects`

**Types:**
- No TypeScript interfaces or types defined in source code
- `tsconfig.json` extends `astro/tsconfigs/strict` for type checking

**Classes and Elements:**
- CSS class names use kebab-case: `.site-header`, `.menu-overlay`, `.work-item`, `.intro-text`, `.about-image`
- BEM-like structure observed but not strictly followed: `.work-meta`, `.menu-nav`, `.hamburger.open`
- State classes use single adjectives: `.open`, `.active`, `.no-scroll`

## Code Style

**Formatting:**
- No Prettier or formatting configuration file detected
- Inconsistent spacing: some sections use 2-space indentation in CSS, others vary
- CSS properties use single space after colon: `background: #f3f3f3;`
- HTML attributes have no space before closing angle bracket: `alt="Interior" />`

**Linting:**
- No ESLint, Prettier, or other linting configuration found
- Code style is self-enforced by developer conventions

**Language-Specific Patterns:**

*Astro/JavaScript:*
- Astro frontmatter (top fence) uses TypeScript syntax: `const { title = "Inkfield" } = Astro.props;`
- Props destructuring with defaults is used
- No import aliases configured beyond standard Astro imports
- Relative imports for local files: `import Layout from "../layouts/Layout.astro";`

*CSS:*
- Mobile-first responsive design with `@media (min-width: ...)` breakpoints
- Inline comments mark major sections: `/* HEADER */`, `/* INTRO SECTION */`, `/* HOVER */`
- CSS transitions use shorthand: `transition: opacity 0.4s ease;` or `transition: transform 0.6s ease, opacity 0.6s ease;`

## Import Organization

**Order:**
1. Relative imports from layout or component files: `import Layout from "../layouts/Layout.astro";`
2. Global styles imported once in layout: `import "../styles/global.css";`
3. Remote resources (CDN/external): `<link rel="stylesheet" href="https://use.typekit.net/pwa7kgg.css" />`

**Path Aliases:**
- No path aliases configured in `tsconfig.json`
- All imports use relative paths

## Error Handling

**Patterns:**
- Optional chaining used in event listeners: `hamburger?.addEventListener("click", toggleMenu);`
- Defensive coding with null checks: `closeBtn?.addEventListener("click", toggleMenu);`
- No explicit error catching or try-catch blocks observed
- Browser will fail silently if elements are not found

## Logging

**Framework:** console only

**Patterns:**
- No structured logging observed
- No debug logging statements in source code
- Event handlers execute silently (menu toggle, page navigation)

## Comments

**When to Comment:**
- Inline comments used for temporary notes: `/* NON fixed per ora */` (Italian: "NOT fixed for now")
- Section headers mark major CSS regions: `/* HEADER */`, `/* OPEN STATE */`, `/* RESPONSIVE */`, etc.
- No JSDoc/TSDoc comments on functions

**JSDoc/TSDoc:**
- Not used in codebase
- Single inline comments suffice for this small project

## Function Design

**Size:** Functions are small and single-purpose
- `toggleMenu()` in `Layout.astro` contains 3 DOM operations

**Parameters:**
- Event listener callbacks take implicit event parameter but don't use it
- No parameters passed to `toggleMenu()`

**Return Values:**
- No explicit returns; functions modify DOM state directly

## Module Design

**Exports:**
- Astro pages serve as implicit exports (file-based routing)
- Layout component exported as default: `export default Layout` (implicit in Astro)

**Barrel Files:**
- Not used; single files contain one component/page each

## Code Quality Patterns

**Inline Scripts:**
- JavaScript kept minimal and inline within Astro files
- Event delegation not used; direct element queries: `document.getElementById("hamburger")`
- Class toggling used for state management: `classList.toggle("open")`

**Inline Styles:**
- All styling in external CSS files (`src/styles/global.css`)
- No inline style attributes in Astro templates

**Static Data:**
- Arrays defined in frontmatter: `const projects = [...]` in `work.astro`
- Data structured as objects with consistent shape: `{ slug, title, excerpt, image }`

---

*Convention analysis: 2026-02-24*
