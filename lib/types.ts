export const sectionNames = [
  'Endodontics',
  'Operative Dentistry',
  'Fixed Prosthodontics',
] as const

export type SectionName = (typeof sectionNames)[number]

export type Case = {
  section: SectionName
  title: string
  /** Paths under public/, e.g. /cases/rct-for-upper-5-1.webp */
  images: string[]
}

export type Contact = {
  label: string
  href: string
  /** What to show as the link text */
  display: string
}

export type Profile = {
  name: string
  bio: string
  portrait: string
  avatar: string
  /** Shown in this order */
  contacts: Contact[]
}

export type Portfolio = {
  profile: Profile
  cases: Case[]
}
