import { getDb } from './supabase'
import { staticPortfolio } from './portfolio'
import type { Contact, Portfolio, SectionName } from './types'

type SettingsRow = {
  name: string
  bio: string
  contacts: Contact[]
  portrait_path: string
  portrait_width: number
  portrait_height: number
  avatar_path: string
  avatar_width: number
  avatar_height: number
}

type CaseRow = {
  id: number
  section: SectionName
  title: string
  case_images: { path: string; width: number; height: number; sort_order: number }[]
}

/**
 * The one place the site reads its content from: Supabase when it is set up
 * and has content, otherwise the data file in lib/portfolio.ts.
 */
export async function getPortfolio(): Promise<Portfolio> {
  const db = getDb()
  if (!db) return staticPortfolio

  const [settings, cases] = await Promise.all([
    db.from('settings').select('*').eq('id', 1).maybeSingle<SettingsRow>(),
    db
      .from('cases')
      .select('id, section, title, case_images(path, width, height, sort_order)')
      .order('sort_order')
      .returns<CaseRow[]>(),
  ])

  if (settings.error || cases.error || !settings.data || cases.data.length === 0) {
    return staticPortfolio
  }

  const s = settings.data
  return {
    profile: {
      name: s.name,
      bio: s.bio,
      contacts: s.contacts,
      portrait: { src: s.portrait_path, width: s.portrait_width, height: s.portrait_height },
      avatar: { src: s.avatar_path, width: s.avatar_width, height: s.avatar_height },
    },
    cases: cases.data.map((c) => ({
      section: c.section,
      title: c.title,
      images: [...c.case_images]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((i) => ({ src: i.path, width: i.width, height: i.height })),
    })),
  }
}
