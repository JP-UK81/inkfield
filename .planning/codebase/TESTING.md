# Testing

> Test framework, structure, patterns, coverage, and gaps.

---

## Summary

**No testing infrastructure exists.** This is an early-stage project with zero automated tests.

---

## Test Framework

| Tool | Status |
|------|--------|
| Unit testing | Not configured |
| Integration testing | Not configured |
| E2E testing | Not configured |
| Visual regression | Not configured |

---

## Test Files

```
0 test files found
```

No `*.test.*`, `*.spec.*`, `__tests__/`, or `test/` directories exist in the project.

---

## Coverage

**0%** — no automated coverage.

---

## Build Validation

No CI pipeline configured:
- No `.github/workflows/` directory
- No Netlify/Vercel build hooks
- No pre-commit hooks (no `.husky/` or `lint-staged`)

Build correctness is validated manually by running `npm run build`.

---

## Critical Untested Areas

| Area | Risk | File |
|------|------|------|
| Mobile menu toggle | Medium — JS DOM manipulation, no unit tests | `src/layouts/Layout.astro` (inline `<script>`) |
| Navigation links | Medium — hardcoded hrefs, no link validation | `src/layouts/Layout.astro` |
| Page rendering | Medium — no smoke tests for key routes | `src/pages/*.astro` |
| CSS responsive layout | Medium — visual regressions undetectable | `src/styles/global.css` |
| Build output | Low-Medium — no validation that `astro build` passes in CI | — |

---

## Recommended Testing Strategy

Given the stack (Astro, vanilla JS, static site), the pragmatic approach:

### Short-term (essential)
1. **Playwright E2E** — smoke test key pages render, menu works, links resolve
   - `npm install -D @playwright/test`
   - Test: homepage, about, work pages load
   - Test: mobile menu open/close
   - Test: footer links/email

2. **GitHub Actions CI** — run `astro build` on every push
   ```yaml
   # .github/workflows/ci.yml
   - run: npm ci
   - run: npm run build
   ```

### Medium-term (as complexity grows)
3. **Vitest** — if utility functions or components grow
4. **Astro integration testing** — test component props/rendering

---

## Mocking Patterns

Not applicable — no external services to mock.

---

*Mapped: 2026-02-24*
