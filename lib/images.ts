import sizes from './image-sizes.json'

const known = sizes as unknown as Record<string, [number, number]>

/** Pixel size of a served image (see scripts/optimize-images.mjs). */
export function imageSize(src: string) {
  const [width, height] = known[src] ?? [1600, 1200]
  return { width, height }
}
