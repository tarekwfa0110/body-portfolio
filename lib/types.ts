export const sectionNames = ['Endodontics', 'Operative Dentistry', 'Fixed Prosthodontics'] as const

export type SectionName = (typeof sectionNames)[number]

export type Photo = {
  /** Path under public/ (e.g. /cases/rct-for-upper-5-1.webp) or a full URL */
  src: string
  width: number
  height: number
}

export type Case = {
  section: SectionName
  title: string
  images: Photo[]
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
  portrait: Photo
  avatar: Photo
  /** Shown in this order */
  contacts: Contact[]
}

export type Portfolio = {
  profile: Profile
  cases: Case[]
}
