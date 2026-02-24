# Codebase Concerns

> Technical debt, known issues, security, performance, and fragile areas.

---

## Security

### Missing Content Security Policy
No CSP headers configured. Astro's default config doesn't set security headers.
- **Risk:** Medium — XSS vector if user-generated content is ever added
- **Location:** No `astro.config.mjs` header configuration present

### External Font CDN Dependency
Google Fonts loaded via CDN `<link>` in `src/layouts/Layout.astro`.
- **Risk:** Low — privacy concern (Google tracking), availability dependency
- **Mitigation:** Self-host fonts via `@fontsource` packages

---

## Performance

### Unoptimized Hero Image
Hero/about images (`public/about.jpg`) not using Astro's `<Image>` component.
- **Impact:** No automatic WebP conversion, no responsive srcsets
- **Fix:** Use `import` + `<Image>` from `astro:assets`

### Project Images Without Lazy Loading
Images in `public/work/` served as static assets without lazy loading or optimization.
- **Impact:** Potential LCP and bandwidth issues as portfolio grows
- **Fix:** Use Astro's image optimization pipeline

### No Asset Hashing for Public Directory
Files in `public/` are served as-is without cache-busting hashes.
- **Impact:** Stale cache issues after updates
- **Fix:** Move optimizable assets to `src/assets/` where Astro hashes them

---

## Scalability

### Hardcoded Project Data
Work/project data appears to be hardcoded in page components rather than a CMS or data file.
- **Risk:** Doesn't scale beyond ~10 projects; editing requires code changes
- **Fix:** Extract to `src/content/` collections or a headless CMS

### No Dynamic Routes
`src/pages/work.astro` likely renders all projects on one page. No individual project pages (`/work/[slug]`).
- **Impact:** No deep-linking, poor SEO for individual projects
- **Fix:** Add `src/pages/work/[slug].astro` with content collections

### Hardcoded Navigation
Navigation links appear hardcoded in `Layout.astro`.
- **Impact:** Must edit layout file to add/remove nav items
- **Fix:** Extract to a config file or use Astro content collections

---

## Fragile Areas

### Inconsistent Responsive Design
`global.css` has responsive breakpoints but consistency across components is unverified.
- **Risk:** Mobile layout regressions when adding new sections
- **File:** `src/styles/global.css`

### Scroll Lock / Menu Accessibility
Mobile menu likely uses scroll lock (body overflow: hidden). Accessibility of menu open/close state needs verification.
- **Risk:** Screen reader users, keyboard navigation

### Mixed Layout Concerns
`Layout.astro` may be handling too many responsibilities (fonts, meta, nav, footer).
- **Risk:** Changes to global layout affect all pages simultaneously

---

## Missing Features (Tech Debt)

### No SEO Infrastructure
No structured data, Open Graph tags, or Twitter Card meta beyond basics.
- **Impact:** Poor social sharing previews, weak search indexing

### No Analytics
No analytics integration present.
- **Impact:** No visibility into traffic or user behavior

### No Sitemap or robots.txt
Missing `@astrojs/sitemap` integration.
- **Fix:** Add to `astro.config.mjs` integrations

---

## Testing

### No Automated Tests
Zero test coverage — no unit, integration, or E2E tests.
- **Risk:** Regressions undetected until manual review
- **Priority:** At minimum, add Playwright E2E for critical pages

### No Build Validation CI
No GitHub Actions or CI pipeline to catch build errors on push.
- **Fix:** Add `.github/workflows/ci.yml` with `astro build` check

---

## Dependencies at Risk

### Unresolved Vulnerability: `devalue`
The `devalue` package (Astro dependency) may have known advisories. Run `npm audit` to verify current state.

### Version Pinning
Dependencies use exact versions in some cases, `^` semver in others — inconsistent pinning strategy.

---

## Unused Assets

Assets in `public/` may accumulate without cleanup as the project evolves. No tooling to detect unused files.

---

## Known Bugs / Issues

_None confirmed at time of mapping — codebase is early-stage._

---

*Mapped: 2026-02-24*
