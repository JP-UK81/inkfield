# Technology Stack

**Analysis Date:** 2026-02-24

## Languages

**Primary:**
- TypeScript (via Astro strict config) - `.astro` templates and type definitions
- HTML5 - Page markup via Astro components
- CSS3 - Styling with vanilla CSS

**Secondary:**
- JavaScript - Client-side interactivity (vanilla JS in layout and pages)

## Runtime

**Environment:**
- Node.js 22.9.0 (but tolerates 18.20.8 or ^20.3.0 per package-lock)

**Package Manager:**
- npm 10.8.3
- Lockfile: `package-lock.json` (committed)

## Frameworks

**Core:**
- Astro 5.17.1 - Static site generator and page framework
  - Build tool: Vite (managed by Astro)
  - Templating: `.astro` component syntax

**Testing:**
- None detected

**Build/Dev:**
- Astro CLI - Development and build commands

## Key Dependencies

**Critical:**
- astro 5.17.1 - Sole production dependency; handles page rendering, SSG, and dev server

**Infrastructure:**
- @astrojs/compiler 2.13.1 - Astro component compilation
- vite (transitive) - Module bundler and dev server

## Configuration

**Environment:**
- Configuration method: `astro.config.mjs` (ES module format)
- Environment variables supported via `.env` and `.env.production` files (per `.gitignore`)
- TypeScript strict mode enabled via `tsconfig.json` extending `astro/tsconfigs/strict`

**Build:**
- Build config: `astro.config.mjs` (minimal, no custom plugins)
- Output directory: `dist/` (generated on build)
- Development server: `localhost:4321` (default Astro)

## Platform Requirements

**Development:**
- Node.js: 18.20.8 or ^20.3.0 or >=22.0.0
- npm: >=9.6.5 (pnpm >=7.1.0 or yarn also supported)
- OS: macOS confirmed (note: `.DS_Store` in repo), Linux/Windows likely compatible

**Production:**
- Deployment target: Static HTML output (no Node.js runtime required for serving)
- Hosting: Any static file host (GitHub Pages, Vercel, Netlify, CloudFront, etc.)

## External Assets

**Web Fonts:**
- Adobe Typekit used via `<link rel="stylesheet" href="https://use.typekit.net/pwa7kgg.css" />` in `src/layouts/Layout.astro`
- Font family: `sofia-pro` (specified in `src/styles/global.css`)

---

*Stack analysis: 2026-02-24*
