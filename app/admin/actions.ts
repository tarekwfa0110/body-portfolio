'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { endSession, passwordIsRight, requireAdmin, startSession } from '@/lib/admin-auth'
import { staticPortfolio } from '@/lib/portfolio'
import { removeStoredPhoto, storePhoto } from '@/lib/photo-storage'
import { getDb } from '@/lib/supabase'
import { sectionNames } from '@/lib/types'
import type { Contact, Photo, SectionName } from '@/lib/types'

// ---------- helpers ----------

const text = (form: FormData, key: string) => String(form.get(key) ?? '').trim()
const number = (form: FormData, key: string) => Number(form.get(key))
const files = (form: FormData, key: string) =>
  form.getAll(key).filter((v): v is File => v instanceof File && v.size > 0)

function fail(message: string): never {
  redirect(`/admin?error=${encodeURIComponent(message)}`)
}

function db() {
  const client = getDb()
  if (!client) fail('Supabase is not configured')
  return client
}

function check(error: { message: string } | null | undefined) {
  if (error) fail(error.message)
}

function refresh() {
  revalidatePath('/', 'layout')
}

function toSection(value: string): SectionName {
  const section = sectionNames.find((name) => name === value)
  if (!section) fail('Unknown section')
  return section
}

/** Swap sort_order with the neighbour above or below. rows must be in display order. */
async function swapWithNeighbour(
  table: 'cases' | 'case_images',
  rows: { id: number; sort_order: number }[],
  id: number,
  direction: string,
) {
  const from = rows.findIndex((row) => row.id === id)
  const to = direction === 'up' ? from - 1 : from + 1
  if (from < 0 || to < 0 || to >= rows.length) return

  const first = await db()
    .from(table)
    .update({ sort_order: rows[to].sort_order })
    .eq('id', rows[from].id)
  check(first.error)

  const second = await db()
    .from(table)
    .update({ sort_order: rows[from].sort_order })
    .eq('id', rows[to].id)
  check(second.error)
}

async function nextOrder(table: 'cases' | 'case_images', column?: string, value?: number) {
  let query = db()
    .from(table)
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
  if (column && value !== undefined) query = query.eq(column, value)
  const { data, error } = await query
  check(error)
  return data && data.length > 0 ? data[0].sort_order + 1 : 0
}

async function addPhotosToCase(caseId: number, photos: File[]) {
  let order = await nextOrder('case_images', 'case_id', caseId)
  for (const file of photos) {
    const stored = await storePhoto(file, 'cases', 1600, 68)
    const { error } = await db().from('case_images').insert({
      case_id: caseId,
      path: stored.src,
      width: stored.width,
      height: stored.height,
      sort_order: order++,
    })
    check(error)
  }
}

// ---------- sign in / out ----------

/** Authenticate the admin with the supplied password. */
export async function login(form: FormData) {
  if (!passwordIsRight(text(form, 'password'))) {
    await new Promise((resolve) => setTimeout(resolve, 800)) // slow down guessing
    fail('Wrong password')
  }
  await startSession()
  redirect('/admin')
}

/** End the admin session and return to the login screen. */
export async function logout() {
  await endSession()
  redirect('/admin')
}

// ---------- first-time import ----------

/** Copies the content that ships in lib/portfolio.ts into the empty database. */
export async function importStarterContent() {
  await requireAdmin()
  const existing = await db().from('cases').select('id').limit(1)
  check(existing.error)
  if (existing.data && existing.data.length > 0) fail('The database already has cases')

  const { profile, cases } = staticPortfolio
  const settings = await db().from('settings').upsert({
    id: 1,
    name: profile.name,
    bio: profile.bio,
    contacts: profile.contacts,
    portrait_path: profile.portrait.src,
    portrait_width: profile.portrait.width,
    portrait_height: profile.portrait.height,
    avatar_path: profile.avatar.src,
    avatar_width: profile.avatar.width,
    avatar_height: profile.avatar.height,
  })
  check(settings.error)

  const inserted = await db()
    .from('cases')
    .insert(cases.map((c, i) => ({ section: c.section, title: c.title, sort_order: i })))
    .select('id, sort_order')
  check(inserted.error)

  const images = (inserted.data ?? []).flatMap((row) =>
    cases[row.sort_order].images.map((image: Photo, i: number) => ({
      case_id: row.id,
      path: image.src,
      width: image.width,
      height: image.height,
      sort_order: i,
    })),
  )
  check((await db().from('case_images').insert(images)).error)
  refresh()
}

// ---------- profile ----------

/** Persist profile fields and optional new portrait/avatar photos. */
export async function saveProfile(form: FormData) {
  await requireAdmin()

  const contacts: Contact[] = []
  for (let i = 0; i < number(form, 'contact_count'); i++) {
    const label = text(form, `label_${i}`)
    const href = text(form, `href_${i}`)
    if (label && href) contacts.push({ label, href, display: text(form, `display_${i}`) || href })
  }

  const changes: Record<string, string | number | Contact[]> = {
    name: text(form, 'name'),
    bio: text(form, 'bio'),
    contacts,
  }

  const [portraitFile] = files(form, 'portrait')
  let oldPortraitPath: string | undefined
  let oldAvatarPath: string | undefined
  if (portraitFile) {
    const old = await db()
      .from('settings')
      .select('portrait_path, avatar_path')
      .eq('id', 1)
      .maybeSingle()
    oldPortraitPath = old.data?.portrait_path
    oldAvatarPath = old.data?.avatar_path
    const portrait = await storePhoto(portraitFile, 'profile', 1200, 78)
    const avatar = await storePhoto(portraitFile, 'profile', 160, 80)
    Object.assign(changes, {
      portrait_path: portrait.src,
      portrait_width: portrait.width,
      portrait_height: portrait.height,
      avatar_path: avatar.src,
      avatar_width: avatar.width,
      avatar_height: avatar.height,
    })
  }

  const { error } = await db().from('settings').update(changes).eq('id', 1)
  check(error)
  refresh()
  if (oldPortraitPath) await removeStoredPhoto(oldPortraitPath)
  if (oldAvatarPath) await removeStoredPhoto(oldAvatarPath)
}

// ---------- cases ----------

/** Create a new case with an initial set of photos. */
export async function addCase(form: FormData) {
  await requireAdmin()
  const title = text(form, 'title')
  if (!title) fail('A case needs a title')

  const { data, error } = await db()
    .from('cases')
    .insert({
      title,
      section: toSection(text(form, 'section')),
      sort_order: await nextOrder('cases'),
    })
    .select('id')
    .single()
  check(error)

  await addPhotosToCase(data!.id, files(form, 'photos'))
  refresh()
}

/** Update a case's title and section. */
export async function updateCase(form: FormData) {
  await requireAdmin()
  const title = text(form, 'title')
  if (!title) fail('A case needs a title')

  const { error } = await db()
    .from('cases')
    .update({ title, section: toSection(text(form, 'section')) })
    .eq('id', number(form, 'id'))
  check(error)
  refresh()
}

/** Reorder a case within its section. */
export async function moveCase(form: FormData) {
  await requireAdmin()
  const id = number(form, 'id')
  const section = toSection(text(form, 'home_section'))
  const { data, error } = await db()
    .from('cases')
    .select('id, sort_order')
    .eq('section', section)
    .order('sort_order')
    .order('id')
  check(error)
  await swapWithNeighbour('cases', data ?? [], id, text(form, 'direction'))
  refresh()
}

/** Delete a case and its stored photos. */
export async function deleteCase(form: FormData) {
  await requireAdmin()
  const id = number(form, 'id')
  const images = await db().from('case_images').select('path').eq('case_id', id)
  check(images.error)
  const paths = (images.data ?? []).map((image) => image.path)

  check((await db().from('cases').delete().eq('id', id)).error)
  refresh()
  for (const path of paths) await removeStoredPhoto(path)
}

// ---------- photos ----------

/** Append photos to an existing case. */
export async function addPhotos(form: FormData) {
  await requireAdmin()
  await addPhotosToCase(number(form, 'case_id'), files(form, 'photos'))
  refresh()
}

/** Reorder a photo within its case. */
export async function moveImage(form: FormData) {
  await requireAdmin()
  const { data, error } = await db()
    .from('case_images')
    .select('id, sort_order')
    .eq('case_id', number(form, 'case_id'))
    .order('sort_order')
    .order('id')
  check(error)
  await swapWithNeighbour('case_images', data ?? [], number(form, 'id'), text(form, 'direction'))
  refresh()
}

/** Delete a single photo from a case. */
export async function deleteImage(form: FormData) {
  await requireAdmin()
  const id = number(form, 'id')
  const { data, error } = await db().from('case_images').select('path').eq('id', id).maybeSingle()
  check(error)
  check((await db().from('case_images').delete().eq('id', id)).error)
  refresh()
  if (data) await removeStoredPhoto(data.path)
}
