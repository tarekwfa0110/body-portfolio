import type { Case, SectionName } from './types'
import { sectionNames } from './types'

export type Slide =
  | { kind: 'profile' }
  | { kind: 'intro'; section: SectionName; number: string }
  | { kind: 'case'; section: SectionName; item: Case }

export type JumpTarget = { label: string; index: number }

/** Profile, then for each section: an intro slide followed by its cases. */
export function buildSlides(cases: Case[]) {
  const slides: Slide[] = [{ kind: 'profile' }]
  const jumps: JumpTarget[] = [{ label: 'Profile', index: 0 }]

  sectionNames.forEach((section, i) => {
    const sectionCases = cases.filter((c) => c.section === section)
    if (sectionCases.length === 0) return
    jumps.push({ label: section, index: slides.length })
    slides.push({ kind: 'intro', section, number: String(i + 1).padStart(2, '0') })
    for (const item of sectionCases) slides.push({ kind: 'case', section, item })
  })

  return { slides, jumps }
}
