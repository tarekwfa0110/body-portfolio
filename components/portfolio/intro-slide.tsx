import type { SectionName } from '@/lib/types'
import { SectionArt } from './tooth-art'

export function IntroSlide({ section, number }: { section: SectionName; number: string }) {
  return (
    <div className="intro-slide">
      <span className="intro-number">{number}</span>
      <div>
        <span className="eyebrow">A clinical collection</span>
        <h1>{section}</h1>
      </div>
      <SectionArt section={section} />
    </div>
  )
}
