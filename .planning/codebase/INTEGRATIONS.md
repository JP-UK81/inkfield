# External Integrations

**Analysis Date:** 2026-02-24

## APIs & External Services

**Web Fonts:**
- Adobe Typekit - Hosts `sofia-pro` font family
  - SDK/Client: Loaded via `<link>` tag
  - URL: `https://use.typekit.net/pwa7kgg.css`
  - Location: `src/layouts/Layout.astro` line 11

## Data Storage

**Databases:**
- Not detected - No database integration present

**File Storage:**
- Local filesystem only - Static assets served from `public/` directory
  - Images: `.jpg` files in `public/` and `public/work/`
  - SVGs: Logo in `public/inkfield-logo.svg`

**Caching:**
- None configured - Relies on Astro's static build output and HTTP cache headers

## Authentication & Identity

**Auth Provider:**
- Not applicable - Static site with no user authentication

**Comments/Contact:**
- Email contact only: `maria@inkfield.co.uk` (hardcoded in `src/layouts/Layout.astro`)

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- None configured - Standard console logging available via `console` in browser/build context

**Analytics:**
- None detected

## CI/CD & Deployment

**Hosting:**
- Not specified in codebase - Typical deployment targets would be static hosts (Vercel, Netlify, GitHub Pages)

**CI Pipeline:**
- None detected

**Build Output:**
- Static HTML/CSS/JS to `dist/` directory via `npm run build`

## Environment Configuration

**Required env vars:**
- None identified - No external services require API keys or credentials

**Secrets location:**
- `.env` and `.env.production` files (per `.gitignore`)
- Currently unused in codebase

## Webhooks & Callbacks

**Incoming:**
- None - No backend endpoints

**Outgoing:**
- None - No outbound API calls detected in source code

## Notable Absences

**What is NOT integrated:**
- No database (SQL, NoSQL, or headless CMS)
- No backend API or server-side routing
- No authentication/authorization system
- No third-party analytics or tracking
- No form submission service
- No payment processing
- No email service
- No CDN (fonts served via Typekit, but no other CDN configured)

---

*Integration audit: 2026-02-24*
