import { randomUUID } from 'node:crypto'
import sharp from 'sharp'
import { BUCKET, getDb } from './supabase'
import type { Photo } from './types'

const PUBLIC_PREFIX = `/storage/v1/object/public/${BUCKET}/`

/** Compress an uploaded image to WebP and store it in Supabase Storage. */
export async function storePhoto(
  file: File,
  folder: string,
  maxEdge: number,
  quality: number,
): Promise<Photo> {
  const db = getDb()
  if (!db) throw new Error('Supabase is not configured')

  const { data, info } = await sharp(Buffer.from(await file.arrayBuffer()))
    .rotate()
    .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true })
    .webp({ quality })
    .toBuffer({ resolveWithObject: true })

  const path = `${folder}/${randomUUID()}.webp`
  const { error } = await db.storage.from(BUCKET).upload(path, data, {
    contentType: 'image/webp',
    cacheControl: '31536000',
  })
  if (error) throw new Error(`Upload failed: ${error.message}`)

  const { data: url } = db.storage.from(BUCKET).getPublicUrl(path)
  return { src: url.publicUrl, width: info.width, height: info.height }
}

/** Delete a stored photo. Files that live in the repo (/cases/...) are left alone. */
export async function removeStoredPhoto(src: string) {
  const db = getDb()
  const at = src.indexOf(PUBLIC_PREFIX)
  if (!db || at === -1) return
  await db.storage.from(BUCKET).remove([src.slice(at + PUBLIC_PREFIX.length)])
}
