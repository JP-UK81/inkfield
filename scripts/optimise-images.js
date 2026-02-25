// Image optimisation script for Inkfield project
// Converts raw JPEG sources in 'images to optimise/' to web-optimised WebP files in 'public/work/[slug]/'
//
// Usage: node scripts/optimise-images.js
// Idempotent: safe to re-run — sharp overwrites existing output files
//
// NOTE: '91-93 Hillway-82.jpg' in Project 2 has no X.NN prefix — processed as standalone
// NOTE: '3.00 verdina da sistemare.jpg' has Italian annotation — process as-is, verify colour visually
// NOTE: '4.01 on nit's own...' has a typo — slugified to '4.01-on-nits-own-with-text-to-the-side.webp'

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
  const base = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  return base
    .toLowerCase()
    .replace(/'/g, '')             // it's -> its, nit's -> nits (handles typo in 4.01)
    .replace(/&/g, 'and')          // & -> and (three-up filenames like 2.14)
    .replace(/\s+/g, '-')          // spaces -> hyphens
    .replace(/[^a-z0-9\-\.]/g, '') // strip remaining unsafe characters
    + '.webp';
}

async function processProject({ folder, slug }) {
  const srcDir = path.join(SOURCE_BASE, folder);
  const outDir = path.join(OUTPUT_BASE, slug);
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(srcDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

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
