import sizes from './image-sizes.json'
import type { Photo } from './types'

const known = sizes as unknown as Record<string, [number, number]>

/** A photo from public/, with its pixel size (see scripts/optimize-images.mjs). */
export function photo(src: string): Photo {
  const [width, height] = known[src] ?? [1600, 1200]
  return { src, width, height }
}
