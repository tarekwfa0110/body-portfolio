import Link from 'next/link'
import { PhotoInput, SubmitButton } from '@/components/admin/form-parts'
import { adminConfigured, isAdmin } from '@/lib/admin-auth'
import { getDb } from '@/lib/supabase'
import { sectionNames } from '@/lib/types'
import type { Contact, SectionName } from '@/lib/types'
import {
  addCase,
  addPhotos,
  deleteCase,
  deleteImage,
  importStarterContent,
  login,
  logout,
  moveCase,
  moveImage,
  saveProfile,
  updateCase,
} from './actions'
import './admin.css'

export const metadata = { title: 'Admin', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

type ImageRow = { id: number; path: string; sort_order: number }
type CaseRow = {
  id: number
  section: string
  title: string
  sort_order: number
  case_images: ImageRow[]
}
type SettingsRow = { name: string; bio: string; contacts: Contact[]; portrait_path: string }

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>
}) {
  const { error, notice } = await searchParams
  const db = getDb()

  if (!db || !adminConfigured()) return <Setup />
  if (!(await isAdmin())) return <Login error={error} />

  const [settings, cases] = await Promise.all([
    db
      .from('settings')
      .select('name, bio, contacts, portrait_path')
      .eq('id', 1)
      .maybeSingle<SettingsRow>(),
    db
      .from('cases')
      .select('id, section, title, sort_order, case_images(id, path, sort_order)')
      .order('sort_order')
      .order('id')
      .returns<CaseRow[]>(),
  ])

  const loadError = settings.error?.message ?? cases.error?.message
  const rows = cases.data ?? []

  return (
    <main className="admin">
      <header className="admin-bar">
        <h1>Portfolio admin</h1>
        <div>
          <Link href="/print" target="_blank" rel="noopener noreferrer">
            Print / Save as PDF
          </Link>
          <Link href="/">View site</Link>
          <form action={logout}>
            <button className="admin-link">Sign out</button>
          </form>
        </div>
      </header>

      {(error || loadError) && <p className="admin-error">{error ?? loadError}</p>}
      {notice && <p className="admin-notice">{notice}</p>}

      {!settings.data ? (
        <section className="admin-card">
          <h2>Start from the current site</h2>
          <p>
            The database is empty, so the public site is still showing the content in the code. Copy
            that content into the database once, then edit it here.
          </p>
          <form action={importStarterContent}>
            <SubmitButton>Import current content</SubmitButton>
          </form>
        </section>
      ) : (
        <>
          <ProfileForm settings={settings.data} />
          {sectionNames.map((section) => (
            <section key={section} className="admin-section">
              <h2>{section}</h2>
              {rows
                .filter((row) => row.section === section)
                .map((row) => (
                  <CaseCard key={row.id} row={row} />
                ))}
              <AddCase defaultSection={section} />
            </section>
          ))}
        </>
      )}
    </main>
  )
}

function Setup() {
  return (
    <main className="admin">
      <section className="admin-card">
        <h1>Admin is not set up yet</h1>
        <p>
          Add these three values to .env.local (and to the Vercel project settings), then restart:
        </p>
        <pre>{`SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_PASSWORD=...`}</pre>
        <p>Also run supabase/schema.sql once in the Supabase SQL editor.</p>
      </section>
    </main>
  )
}

function Login({ error }: { error?: string }) {
  return (
    <main className="admin">
      <form action={login} className="admin-card admin-login">
        <h1>Admin</h1>
        {error && <p className="admin-error">{error}</p>}
        <input type="password" name="password" placeholder="Password" autoFocus required />
        <SubmitButton>Sign in</SubmitButton>
      </form>
    </main>
  )
}

function ProfileForm({ settings }: { settings: SettingsRow }) {
  const contacts = [...settings.contacts, { label: '', href: '', display: '' }]
  return (
    <form action={saveProfile} className="admin-card">
      <h2>Profile</h2>
      <label>
        Name
        <input name="name" defaultValue={settings.name} required />
      </label>
      <label>
        Bio
        <textarea name="bio" defaultValue={settings.bio} rows={6} />
      </label>
      <fieldset>
        <legend>Contacts, in the order they are shown (clear the link to remove one)</legend>
        <input type="hidden" name="contact_count" value={contacts.length} />
        {contacts.map((contact, i) => (
          <div className="admin-row" key={i}>
            <input name={`label_${i}`} defaultValue={contact.label} placeholder="Label" />
            <input
              name={`href_${i}`}
              defaultValue={contact.href}
              placeholder="Link (https://, tel:, mailto:)"
            />
            <input name={`display_${i}`} defaultValue={contact.display} placeholder="Text shown" />
          </div>
        ))}
      </fieldset>
      <label>
        New portrait (optional)
        <PhotoInput name="portrait" />
      </label>
      <SubmitButton>Save profile</SubmitButton>
    </form>
  )
}

function CaseCard({ row }: { row: CaseRow }) {
  const images = [...row.case_images].sort((a, b) => a.sort_order - b.sort_order)
  return (
    <article className="admin-card">
      <form className="admin-row">
        <input type="hidden" name="id" value={row.id} />
        <input type="hidden" name="home_section" value={row.section} />
        <input name="title" defaultValue={row.title} aria-label="Title" required />
        <select name="section" defaultValue={row.section} aria-label="Section">
          {sectionNames.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <button className="admin-button" formAction={updateCase}>
          Save
        </button>
        <button
          className="admin-button"
          formAction={moveCase}
          name="direction"
          value="up"
          aria-label="Move up"
        >
          ↑
        </button>
        <button
          className="admin-button"
          formAction={moveCase}
          name="direction"
          value="down"
          aria-label="Move down"
        >
          ↓
        </button>
        <button className="admin-button admin-danger" formAction={deleteCase}>
          Delete case
        </button>
      </form>

      <div className="admin-images">
        {images.map((image, i) => (
          <form key={image.id} className="admin-image">
            <input type="hidden" name="id" value={image.id} />
            <input type="hidden" name="case_id" value={row.id} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.path} alt={`Photo ${i + 1} of ${images.length}`} />
            <div>
              <button formAction={moveImage} name="direction" value="up" aria-label={`Move photo ${i + 1} earlier`}>
                ←
              </button>
              <button formAction={moveImage} name="direction" value="down" aria-label={`Move photo ${i + 1} later`}>
                →
              </button>
              <button formAction={deleteImage} aria-label={`Delete photo ${i + 1}`}>
                ×
              </button>
            </div>
          </form>
        ))}
      </div>

      <form action={addPhotos} className="admin-row">
        <input type="hidden" name="case_id" value={row.id} />
        <PhotoInput name="photos" multiple required />
        <SubmitButton>Add photos</SubmitButton>
      </form>
    </article>
  )
}

function AddCase({ defaultSection }: { defaultSection?: SectionName }) {
  return (
    <form action={addCase} className="admin-card">
      <h2>Add a case</h2>
      <div className="admin-row">
        <input name="title" placeholder="Case title" required />
        <select name="section" defaultValue={defaultSection ?? sectionNames[0]} aria-label="Section">
          {sectionNames.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
      <PhotoInput name="photos" multiple />
      <SubmitButton>Add case</SubmitButton>
    </form>
  )
}
