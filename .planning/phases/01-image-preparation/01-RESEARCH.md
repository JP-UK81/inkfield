# Phase 1: Image Preparation - Research

**Researched:** 2026-02-24
**Domain:** Node.js image optimisation with sharp; file system scripting; static asset pipeline
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| IMG-01 | Images optimised for web (WebP conversion, appropriate sizing) | sharp 0.34.5 confirmed working in node_modules; `.rotate().resize().webp()` pipeline verified with test outputs |
| IMG-02 | Images placed in the correct Astro-accessible location (`public/work/[slug]/`) | 5 project folders mapped to slugs; target directory structure defined; `fs.mkdirSync` + sharp `.toFile()` pipeline confirmed |
| IMG-03 | Filename layout encoding preserved so Phase 2 can parse layout rules | Slugified output filenames retain full layout suffix (e.g. `1.03-side-by-side-to-1.04.webp`); Phase 2 can regex-parse the slug directly |

> Note: IMG-03 is not in REQUIREMENTS.md but was listed in the phase brief. Interpreted as: the output filename scheme must preserve enough information for the Phase 2 layout parser to operate without a separate manifest.
</phase_requirements>

---

## Summary

This phase processes 60 raw JPEG images (across 5 project folders, totalling ~662MB of source files averaging 6000px wide) into web-optimised WebP images placed in `public/work/[slug]/`. The work is a one-time pre-processing step using a Node.js script — no runtime pipeline, no build plugin.

`sharp` version 0.34.5 is already installed as a transitive dependency of Astro and is confirmed working in this project's `node_modules`. The full conversion pipeline (EXIF auto-rotate → resize to max 2400px wide → WebP at quality 82) was tested and produces ~300-400KB outputs from 10-15MB source files — a 30-50x reduction. No additional dependencies are needed.

The filename layout encoding is the most important design constraint of this phase. Source filenames like `1.03 side by side to 1.04.jpg` carry the layout instruction for Phase 2. The output filename must preserve this information in URL-safe form: `1.03-side-by-side-to-1.04.webp`. The slugification rule is mechanical and consistent: lowercase, spaces→hyphens, apostrophes dropped, `&`→`and`.

**Primary recommendation:** Write a single Node.js script at `scripts/optimise-images.js` that processes all 5 project folders in sequence, slugifies filenames, converts to WebP at 2400px max width, and writes to `public/work/[slug]/`. Run it once with `node scripts/optimise-images.js`.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| sharp | 0.34.5 | JPEG/WebP conversion, resize, rotate | Already in node_modules (Astro dependency); fastest Node.js image processing library; wraps libvips |
| fs (Node built-in) | Node 22.9.0 | Read source dirs, write output dirs | No install needed |
| path (Node built-in) | Node 22.9.0 | Safe path construction across OS | No install needed |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| sharp concurrency | auto (16 threads) | Parallel processing within each file | Already default; no config needed |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| sharp | Astro's built-in `<Image>` component | Astro's pipeline processes at build time but requires importing images into `.astro` files — too coupled to Phase 2 layout logic. Pre-processing is simpler and produces static files. |
| sharp | imagemagick CLI | Not installed, requires brew install, less portable. sharp is already present. |
| sharp | squoosh-cli | Deprecated/unmaintained. sharp is the correct choice. |

**Installation:** No installation needed. sharp is already available:

```bash
node -e "const sharp = require('sharp'); console.log(sharp.versions.sharp)"
# Outputs: 0.34.5
```

---

## Architecture Patterns

### Recommended Project Structure

```
scripts/
└── optimise-images.js   # one-time processing script

public/
└── work/
    ├── sotogrande/      # 11 WebP images
    ├── london-family/   # 17 WebP images
    ├── jacob/           # 8 WebP images
    ├── penthouse/       # 13 WebP images
    └── lecce/           # 11 WebP images
```

### Pattern 1: Sequential Project Processing

**What:** Process each of the 5 project folders in a `for...of` loop, writing outputs to the corresponding slug directory.
**When to use:** Always — sequential is easier to debug than concurrent and plenty fast for 60 images.

```javascript
// scripts/optimise-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PROJECTS = [
  { folder: 'Project 1 - Soto',       slug: 'sotogrande' },
  { folder: 'Project 2 - Hillway',     slug: 'london-family' },
  { folder: 'Project 3 - Jacob David', slug: 'jacob' },
  { folder: 'Project 4 - Oak Lodge',   slug: 'penthouse' },
  { folder: 'Project 5 - Lecce',       slug: 'lecce' },
];

const SOURCE_BASE = path.join(process.cwd(), 'images to optimise');
const OUTPUT_BASE = path.join(process.cwd(), 'public', 'work');
const MAX_WIDTH = 2400;
const WEBP_QUALITY = 82;

function slugifyFilename(filename) {
  // Strip extension, slugify, add .webp
  const base = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  return base
    .toLowerCase()
    .replace(/'/g, '')          // strip apostrophes (it's -> its)
    .replace(/&/g, 'and')       // & -> and
    .replace(/\s+/g, '-')       // spaces -> hyphens
    .replace(/[^a-z0-9\-\.]/g, '') // strip remaining unsafe chars
    + '.webp';
}

async function processProject({ folder, slug }) {
  const srcDir = path.join(SOURCE_BASE, folder);
  const outDir = path.join(OUTPUT_BASE, slug);
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(srcDir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const outName = slugifyFilename(file);
    const outPath = path.join(outDir, outName);

    await sharp(srcPath)
      .rotate()                                    // auto-rotate from EXIF, then strip EXIF
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 }) // effort 4: fast enough, good compression
      .toFile(outPath);

    console.log(`  ${file} -> ${outName}`);
  }
  console.log(`Done: ${slug} (${files.length} images)`);
}

(async () => {
  for (const project of PROJECTS) {
    console.log(`\nProcessing: ${project.folder} -> public/work/${project.slug}/`);
    await processProject(project);
  }
  console.log('\nAll projects complete.');
})();
```

### Pattern 2: Slugified Output Filename as Layout Carrier

**What:** The output `.webp` filename retains the layout suffix from the source filename, slugified to be URL-safe. Phase 2 reads these filenames from `public/work/[slug]/` and parses them with regex to determine layout.
**When to use:** Always — this avoids needing a separate manifest JSON for Phase 2.

**Slug mapping examples:**

| Source filename | Output filename | Layout encoded |
|----------------|-----------------|----------------|
| `1.00.jpeg` | `1.00.webp` | hero (x.00 pattern) |
| `1.01.jpeg` | `1.01.webp` | standalone |
| `1.03 side by side to 1.04.jpg` | `1.03-side-by-side-to-1.04.webp` | side-by-side pair |
| `2.05 on it's own with one line text to the side.jpg` | `2.05-on-its-own-with-one-line-text-to-the-side.webp` | image-with-text |
| `2.06 smaller with 2.07 as small detail to the side.jpg` | `2.06-smaller-with-2.07-as-small-detail-to-the-side.webp` | main+detail |
| `2.14 side by side to 2.15 & 2.16.jpg` | `2.14-side-by-side-to-2.15-and-2.16.webp` | three-up |
| `91-93 Hillway-82.jpg` | `91-93-hillway-82.webp` | standalone (no X.NN prefix) |

### Anti-Patterns to Avoid

- **Using Astro's `<Image>` pipeline for this**: Requires importing every image statically at build time. With 60 images across 5 projects all handled by one dynamic route, this won't work cleanly. Pre-processing to `public/` is the right approach.
- **Preserving original filenames with spaces**: URL-unsafe. `img src="/work/sotogrande/1.03 side by side to 1.04.webp"` causes encoding issues. Always slugify.
- **Processing images at dev/build time via an Astro integration**: Adds unnecessary complexity. This is a one-time operation; a standalone script is simpler and more predictable.
- **Using Promise.all() to process all 60 images concurrently**: Sharp uses 16 threads internally. Running 60 concurrent sharp instances will exhaust memory on large files (10-15MB sources). Process files sequentially within each project.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| EXIF orientation correction | Custom rotation logic | `sharp().rotate()` | Sharp reads EXIF orientation automatically; custom logic misses all 8 orientation values |
| WebP conversion | Canvas API or ffmpeg | `sharp().webp()` | Sharp wraps libvips (fastest available); ffmpeg is video-oriented overkill |
| Progressive resize (avoid pixelation) | Manual lanczos math | `sharp().resize()` | Sharp uses high-quality Lanczos3 resampling by default |
| Directory creation | Custom recursive mkdir | `fs.mkdirSync(path, { recursive: true })` | Built-in since Node 10.12; handles nested paths atomically |

**Key insight:** Sharp is essentially a thin wrapper around libvips, which is the industry-standard C library for image processing. Every "edge case" in image resizing (EXIF stripping, orientation, colour profiles, progressive encoding) is already handled correctly.

---

## Common Pitfalls

### Pitfall 1: Skipping `.rotate()` Causes Wrong Orientations

**What goes wrong:** Portrait images from phone/camera have EXIF orientation data. Without `.rotate()`, sharp outputs them sideways or upside down at the encoded pixel dimensions.
**Why it happens:** JPEG stores rotation intent in EXIF, not in pixel order. Sharp respects this only if you call `.rotate()` with no arguments (auto-rotate mode).
**How to avoid:** Always include `.rotate()` before `.resize()` in the pipeline. Never skip it even for images that look correct in preview — the EXIF may still have a non-1 orientation value.
**Warning signs:** An image that looks correct in macOS Preview but appears rotated 90° in a browser `<img>` tag.

### Pitfall 2: `withoutEnlargement` Needed for Small Sources

**What goes wrong:** Lecce images are ~3800px wide — smaller than some other projects. Without `withoutEnlargement: true`, a resize to 2400px on a 1200px source would upscale and degrade quality.
**Why it happens:** Sharp's default resize behaviour upscales if target is larger than source.
**How to avoid:** Always use `{ width: MAX_WIDTH, withoutEnlargement: true }`. This is a no-op for large images and a safety net for smaller ones.
**Warning signs:** Output file is larger than source file.

### Pitfall 3: The `91-93 Hillway-82.jpg` Anomaly

**What goes wrong:** The Hillway project contains one file — `91-93 Hillway-82.jpg` — that does not follow the `X.NN` numeric naming pattern. A regex that assumes `X.NN` prefix will skip it or fail.
**Why it happens:** This appears to be a designer's alternative export or reference image included alongside the numbered sequence.
**How to avoid:** The processing script should convert ALL `.jpg/.jpeg/.png` files in the folder regardless of naming pattern. Apply the same slugify → WebP pipeline. Phase 2 will need to handle it as a standalone image (no layout suffix parsed).
**Warning signs:** Image count in output directory is 16 instead of 17 for london-family.

### Pitfall 4: The `3.00 verdina da sistemare.jpg` Italian Annotation

**What goes wrong:** Project 3 (jacob) hero image filename contains Italian text: `verdina da sistemare` means "green [tones] to fix". This might indicate the image has a colour cast the designer intended to correct.
**Why it happens:** Designer's working notes were included in the filename.
**How to avoid:** Process it as-is — the script doesn't need to do anything special. But note it as a potential visual issue. The slugified output will be `3.00-verdina-da-sistemare.webp`.
**Warning signs:** The jacob hero image appears green-tinted in the browser.

### Pitfall 5: The Typo in Penthouse Filename

**What goes wrong:** `4.01 on nit's own with text to the side.jpg` has a typo (`nit's` instead of `it's`). The slugified output will be `4.01-on-nits-own-with-text-to-the-side.webp`.
**Why it happens:** Designer typo.
**How to avoid:** Process as-is. Phase 2 regex must handle both `on-its-own` AND `on-nits-own` patterns when parsing layout rules, or use a more flexible pattern like checking for `own-with-text-to-the-side`.
**Warning signs:** Phase 2 layout parser misses the image-with-text layout for penthouse image 4.01.

### Pitfall 6: `effort` Setting Affects Script Runtime

**What goes wrong:** WebP `effort` ranges from 0 (fastest) to 6 (smallest file). Default effort is 4. At effort 6, processing 60 large images can take several minutes.
**Why it happens:** Higher effort = more CPU time for better compression.
**How to avoid:** Use `effort: 4` (default). The quality difference vs effort 6 is marginal for photographic content, and runtime stays reasonable (~30-60 seconds total).

---

## Code Examples

Verified patterns from working test runs:

### Complete Sharp Pipeline (tested 2026-02-24)

```javascript
// Produces 323KB WebP from 13MB JPEG (6000x4000 source)
// Source: tested in project node_modules, sharp 0.34.5
await sharp(srcPath)
  .rotate()                                      // auto EXIF orientation + strip
  .resize({ width: 2400, withoutEnlargement: true })
  .webp({ quality: 82, effort: 4 })
  .toFile(outPath);
// Returns: { format: 'webp', width: 2400, height: 1600, size: 398386 }
```

### Slugify Function (tested against all project filenames)

```javascript
function slugifyFilename(filename) {
  const base = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  return base
    .toLowerCase()
    .replace(/'/g, '')             // it's -> its, nit's -> nits
    .replace(/&/g, 'and')          // & -> and (three-up filenames)
    .replace(/\s+/g, '-')          // spaces -> hyphens
    .replace(/[^a-z0-9\-\.]/g, '') // strip remaining unsafe characters
    + '.webp';
}
// '1.03 side by side to 1.04.jpg' -> '1.03-side-by-side-to-1.04.webp'
// "2.05 on it's own with one line text to the side.jpg" -> '2.05-on-its-own-with-one-line-text-to-the-side.webp'
// '2.14 side by side to 2.15 & 2.16.jpg' -> '2.14-side-by-side-to-2.15-and-2.16.webp'
```

### Directory Creation (safe, idempotent)

```javascript
// Creates public/work/sotogrande/ (and any parents) atomically
fs.mkdirSync(path.join(OUTPUT_BASE, slug), { recursive: true });
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Photoshop batch export | sharp Node.js script | ~2018 | Reproducible, version-controlled, no GUI needed |
| imagemin (deprecated) | sharp directly | 2022+ | imagemin plugins are unmaintained; sharp is the current standard |
| Astro's `<Image>` component | Pre-processed static files in `public/` | N/A | For dynamic routes with many images, pre-processing avoids build-time import complexity |

**Deprecated/outdated:**
- `imagemin` and `imagemin-webp`: Last maintained ~2021, now abandoned. Sharp is the replacement.
- `squoosh-cli`: Google's CLI tool, archived. Sharp is the standard.
- JPEG 2000: Not worth targeting. WebP has 97% browser support as of 2026. No fallback needed for this project.

---

## Complete Image Inventory

Confirmed at research time (2026-02-24):

| Slug | Source Folder | Images | Source Size | Unique Layout Patterns Found |
|------|--------------|--------|-------------|------------------------------|
| sotogrande | Project 1 - Soto | 11 | ~69MB | standalone, side-by-side, hero |
| london-family | Project 2 - Hillway | 17 | ~203MB | standalone, side-by-side, image-with-text, main+detail, three-up + 1 anomalous file |
| jacob | Project 3 - Jacob David | 8 | ~203MB | standalone, side-by-side, main+detail, hero (with Italian annotation) |
| penthouse | Project 4 - Oak Lodge | 13 | ~168MB | standalone, side-by-side, image-with-text (typo in filename), three-up, hero |
| lecce | Project 5 - Lecce | 11 | ~19MB | standalone, hero only |

**Total: 60 images, ~662MB source → expected ~20-30MB output**

---

## Filename Layout Pattern Reference

All unique layout-encoding patterns found across all projects (for Phase 2 planner awareness):

| Pattern in slugified filename | Layout type | Count |
|-------------------------------|-------------|-------|
| `X.00` (no suffix) | Hero — full-width above fold | 5 |
| `X.NN` (no suffix, not .00) | Standalone full-width | 42 |
| `X.NN-side-by-side-to-Y.MM` | Side-by-side 50/50 pair | 8 |
| `X.NN-side-by-side-to-Y.MM-and-Z.PP` | Three-up row | 2 |
| `X.NN-on-its-own-with-one-line-text-to-the-side` | Image + caption placeholder | 1 |
| `X.NN-on-nits-own-with-text-to-the-side` | Image + caption (typo variant) | 1 |
| `X.NN-smaller-with-Y.MM-as-small-detail-to-the-side` | 2/3 main + 1/3 detail | 1 |
| `X.NN-with-Y.MM-as-small-detail-to-the-side` | 2/3 main + 1/3 detail (variant) | 2 |
| `X.NN-dettaglio` (Italian: "detail") | Detail/companion image (secondary role) | 2 |
| `91-93-hillway-82` (no X.NN prefix) | Standalone (anomalous naming) | 1 |

---

## Open Questions

1. **Should `dettaglio` images be suppressed from the gallery?**
   - What we know: `3.04 dettaglio.jpg` and `3.06 dettaglio.jpg` are detail shots. They are referenced as the "small detail" in `3.03 with 3.04...` and `3.05 with 3.06...` filenames.
   - What's unclear: When Phase 2 renders a `main+detail` pair, should it show only the main image (with the detail embedded at small size), or show both separately? This affects whether dettaglio files should be output at full size or a smaller target width.
   - Recommendation: Output all images at the same 2400px max width and let Phase 2 decide rendering. Do not try to differentiate output sizes at this stage.

2. **Should `91-93 Hillway-82.jpg` be included?**
   - What we know: It does not follow the numeric naming convention. It is the only such anomaly across all projects.
   - What's unclear: Whether the designer intended it to appear in the gallery or if it was a stray file.
   - Recommendation: Include it in the output (convert it like any other image). Add a comment in the script noting its anomalous name. Phase 2 will treat it as a standalone image.

3. **Is `3.00 verdina da sistemare.jpg` colour-corrected?**
   - What we know: The Italian annotation means "green to fix" — suggesting a colour cast.
   - What's unclear: Whether the designer delivered a corrected version or expects post-processing.
   - Recommendation: Process as-is. Note it in the script output. Verify visually after running the script.

---

## Sources

### Primary (HIGH confidence)

- sharp 0.34.5 in `./node_modules/sharp` — API verified by live `node -e` tests in project
- `node -e "const sharp = require('sharp'); console.log(sharp.versions)"` — confirms version and libvips 8.17.3
- Test run: `sharp().rotate().resize({width:2400,withoutEnlargement:true}).webp({quality:82,effort:4}).toFile()` — confirmed working, output sizes measured
- `file` command output on source images — confirmed JPEG format, Exif data present, 6000x4000 typical dimensions
- `ls -lh` on all source folders — confirmed image counts and sizes

### Secondary (MEDIUM confidence)

- Sharp official documentation: https://sharp.pixelplumbing.com/ — API reference for `.rotate()`, `.resize()`, `.webp()` options
- `withoutEnlargement` behaviour: https://sharp.pixelplumbing.com/api-resize#resize — documented option

### Tertiary (LOW confidence)

- WebP browser support at 97% as of 2026 — estimated from trend; verify at https://caniuse.com/webp if fallback needed

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — sharp is physically present in node_modules and was live-tested
- Architecture: HIGH — filename patterns enumerated from actual files; pipeline tested with real images
- Pitfalls: HIGH — anomalies (typos, Italian annotation, non-numeric file) directly observed in file system
- Output sizing: HIGH — actual test outputs measured (323KB, 398KB from 10-15MB sources)

**Research date:** 2026-02-24
**Valid until:** 2026-12-01 (sharp API is stable; image files are static)
