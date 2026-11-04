// One-off script: turns the original photos in originals/ into small WebP
// files in public/cases/ with short slug names.
//
//   node scripts/optimize-images.mjs
//
// Originals are never served. Re-run after adding a photo to originals/.

import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ORIGINALS = 'originals'
const OUT = 'public/cases'

// Same rule the case list uses to find the optimized file for an original.
export function slugify(file) {
  return file
    .replace(/\.(jpe?g|png)$/i, '')
    .replace(/&/g, ' and ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function listImages(dir) {
  const found = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) found.push(...(await listImages(full)))
    else if (/\.(jpe?g|png)$/i.test(entry.name)) found.push(full)
  }
  return found
}

// Pixel sizes of every served image, so pages can reserve space before the
// photo loads. Written to lib/image-sizes.json.
const sizes = {}

async function toWebp(input, output, width, quality) {
  const info = await sharp(input)
    .rotate()
    .resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
    .webp({ quality })
    .toFile(output)
  sizes[output.replace(/^public/, '')] = [info.width, info.height]
  return info.size
}

await mkdir(OUT, { recursive: true })

let before = 0
let after = 0
for (const input of await listImages(ORIGINALS)) {
  const name = path.basename(input)
  before += (await stat(input)).size

  let output
  let size
  if (name === 'Body Profile Picture 2.png') {
    output = 'public/portrait.webp'
    size = await toWebp(input, output, 1200, 78)
  } else if (name === 'Body Mini Picture.png') {
    output = 'public/avatar.webp'
    size = await toWebp(input, output, 160, 80)
    await sharp(input)
      .resize({ width: 192, height: 192, fit: 'cover', position: 'top' })
      .png()
      .toFile('public/icon.png')
  } else if (/^Body /.test(name) || /^placeholder/i.test(name)) {
    continue // unused spare portraits and template placeholders
  } else {
    output = path.join(OUT, `${slugify(name)}.webp`)
    size = await toWebp(input, output, 1600, 68)
  }
  after += size
}

await writeFile('lib/image-sizes.json', JSON.stringify(sizes, null, 2) + '\n')

const mb = (n) => (n / 1024 / 1024).toFixed(1)
console.log(`${mb(before)} MB -> ${mb(after)} MB`)
