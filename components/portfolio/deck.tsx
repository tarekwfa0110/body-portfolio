'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { buildSlides } from '@/lib/slides'
import type { Portfolio as PortfolioData } from '@/lib/types'
import { CaseSlide } from './case-slide'
import { IntroSlide } from './intro-slide'
import { Lightbox } from './lightbox'
import { ProfileSlide } from './profile-slide'
import { SiteHeader } from './site-header'
import './portfolio.css'

export function Deck({ profile, cases }: PortfolioData) {
  const { slides, jumps } = useMemo(() => buildSlides(cases), [cases])
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const slide = slides[index]
  const images = slide.kind === 'case' ? slide.item.images : []
  const jumpIndex = jumps.reduce((found, j, i) => (j.index <= index ? i : found), 0)

  const go = useCallback(
    (to: number) => {
      const next = (to + slides.length) % slides.length
      setDirection(next >= index ? 1 : -1)
      setIndex(next)
      setLightbox(null)
      window.scrollTo(0, 0)
    },
    [index, slides.length],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (lightbox !== null) {
        if (event.key === 'Escape') setLightbox(null)
        if (event.key === 'ArrowRight') setLightbox((lightbox + 1) % images.length)
        if (event.key === 'ArrowLeft') setLightbox((lightbox - 1 + images.length) % images.length)
        return
      }
      if (event.key === 'ArrowRight') go(index + 1)
      if (event.key === 'ArrowLeft') go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, images.length, index, lightbox])

  // Swipe between slides, but let mostly-vertical drags scroll the page.
  const [touchStart, setTouchStart] = useState<[number, number] | null>(null)

  return (
    <main className="portfolio-shell">
      <SiteHeader profile={profile} onHome={() => go(0)} />
      <div
        className="portfolio-stage"
        onTouchStart={(e) => setTouchStart([e.touches[0].clientX, e.touches[0].clientY])}
        onTouchEnd={(e) => {
          if (!touchStart) return
          const dx = e.changedTouches[0].clientX - touchStart[0]
          const dy = e.changedTouches[0].clientY - touchStart[1]
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1))
        }}
      >
        <div
          className="slide-frame"
          key={index}
          style={{ '--slide-direction': direction } as React.CSSProperties}
        >
          {slide.kind === 'profile' && <ProfileSlide profile={profile} />}
          {slide.kind === 'intro' && <IntroSlide section={slide.section} number={slide.number} />}
          {slide.kind === 'case' && (
            <CaseSlide item={slide.item} number={slide.number} onImageClick={setLightbox} />
          )}
        </div>
      </div>

      <nav className="deck-controls" aria-label="Slides">
        <button className="nav-arrow" onClick={() => go(index - 1)} aria-label="Previous slide">
          <ArrowLeft size={22} strokeWidth={1.25} />
        </button>
        <div className="deck-status">
          <select
            className="section-jump"
            value={jumpIndex}
            onChange={(e) => go(jumps[Number(e.target.value)].index)}
            aria-label="Jump to section"
          >
            {jumps.map((jump, i) => (
              <option key={jump.label} value={i}>
                {jump.label}
              </option>
            ))}
          </select>
          <span className="progress-counter">
            {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
        <button className="nav-arrow" onClick={() => go(index + 1)} aria-label="Next slide">
          <ArrowRight size={22} strokeWidth={1.25} />
        </button>
      </nav>

      {lightbox !== null && (
        <Lightbox
          title={slide.kind === 'case' ? slide.item.title : ''}
          images={images}
          index={lightbox}
          onChange={setLightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </main>
  )
}
