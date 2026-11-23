#!/usr/bin/env node
/**
 * Downloads the curated Pexels photos listed in scripts/photos.json, optimises
 * them to 800×600 WebP and stores them locally in public/images/ (no API key needed).
 * Also writes CREDITS.md.
 *
 *   npm run fetch-images            download anything missing
 *   npm run fetch-images -- --force re-download everything
 *
 * To swap a photo: change its "id" in photos.json (the number at the end of the
 * Pexels photo URL), or drop your own WebP with the same name into public/images/menu/.
 * All photos are free to use under the Pexels License: https://www.pexels.com/license/
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'images');
const photos = JSON.parse(await fs.readFile(path.join(root, 'scripts', 'photos.json'), 'utf8'));
const force = process.argv.includes('--force');

let ok = 0, failed = 0;
for (const [key, p] of Object.entries(photos)) {
  const dir = path.join(outDir, p.dir ?? 'menu');
  const file = path.join(dir, `${key}.webp`);
  await fs.mkdir(dir, { recursive: true });
  if (!force) {
    try { await fs.access(file); console.log(`skip  ${key}`); ok++; continue; } catch { /* download below */ }
  }
  const url = `https://images.pexels.com/photos/${p.id}/pexels-photo-${p.id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (pause-n-chill image fetch)' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).resize(800, 600, { fit: 'cover', position: 'attention' }).webp({ quality: 74 }).toFile(file);
    console.log(`ok    ${key}`);
    ok++;
    await new Promise((r) => setTimeout(r, 150));
  } catch (e) {
    console.warn(`FAIL  ${key}: ${e.message}`);
    failed++;
  }
}

// remove leftovers from older versions (photos that are no longer in photos.json)
if (force) {
  for (const dir of ['', 'menu']) {
    const d = path.join(outDir, dir);
    for (const f of await fs.readdir(d).catch(() => [])) {
      if (!f.endsWith('.webp')) continue;
      const key = f.replace(/\.webp$/, '');
      const entry = photos[key];
      if (!entry || (entry.dir ?? 'menu') !== dir) { await fs.unlink(path.join(d, f)); console.log(`prune ${dir ? dir + '/' : ''}${f} (not in photos.json)`); }
    }
  }
}

const rows = Object.entries(photos)
  .map(([key, p]) => `| \`${key}\` | https://www.pexels.com/photo/${p.id}/ |`)
  .join('\n');
await fs.writeFile(
  path.join(root, 'CREDITS.md'),
  `# Image credits\n\nAll food photography is from [Pexels](https://www.pexels.com) and used under the [Pexels License](https://www.pexels.com/license/) (free for commercial use). Each row links to the original photo page, where the photographer is credited.\n\n| Image | Pexels photo page (photographer credited there) |\n|---|---|\n${rows}\n\nLogo: supplied by the restaurant.\n`,
);
console.log(`\nDone: ${ok} ready, ${failed} failed. CREDITS.md written.`);
if (failed) process.exitCode = 1;
