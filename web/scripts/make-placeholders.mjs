// Generates simple placeholder JPEGs for the sample event so the demo gallery
// has something to show. This is ONLY for the bundled sample — real events use
// real photos dropped into their photos/ folder. Safe to delete this script.
//
// Usage: node scripts/make-placeholders.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// scripts/ lives in web/, content/ lives at the repo root (one level above web/).
const repoRoot = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const outDir = join(repoRoot, 'content', 'events', '2025-virginia', 'photos');
await mkdir(outDir, { recursive: true });

const palette = [
  { name: 'cover', w: 1600, h: 900, bg: '#2f4858', label: 'Passout 2025' },
  { name: 'photo-01', w: 1400, h: 1050, bg: '#c2410c', label: 'Passing' },
  { name: 'photo-02', w: 1050, h: 1400, bg: '#9a3412', label: 'Workshop' },
  { name: 'photo-03', w: 1400, h: 1050, bg: '#3f6b54', label: 'Volleyclub' },
  { name: 'photo-04', w: 1400, h: 1050, bg: '#6b4e8a', label: 'Mealtime' },
  { name: 'photo-05', w: 1400, h: 1050, bg: '#1f6f8b', label: 'Games' },
];

for (const p of palette) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${p.w}" height="${p.h}">
    <rect width="100%" height="100%" fill="${p.bg}"/>
    <text x="50%" y="50%" fill="#ffffff" font-family="sans-serif"
      font-size="${Math.round(p.w / 14)}" text-anchor="middle"
      dominant-baseline="middle" opacity="0.92">${p.label}</text>
  </svg>`;
  const file = join(outDir, `${p.name}.jpg`);
  await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toFile(file);
  console.log('wrote', file);
}
