'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'

type Section = 'Profile' | 'Endodontics' | 'Operative Dentistry' | 'Fixed Prosthodontics'
type Slide = { kind: 'profile' | 'intro' | 'case'; section: Section; title: string; images?: string[] }

const sectionNumbers: Record<Exclude<Section, 'Profile'>, string> = { Endodontics: '01', 'Operative Dentistry': '02', 'Fixed Prosthodontics': '03' }
const intro = (section: Exclude<Section, 'Profile'>) => ({ kind: 'intro' as const, section, title: section })

const slides: Slide[] = [
  { kind: 'profile', section: 'Profile', title: 'Abdelrahman Alaa' },
  intro('Endodontics'),
  { kind: 'case', section: 'Endodontics', title: 'Rct for upper 5', images: ['/Rct for upper 5 (1).jpg', '/Rct for upper 5 (2).jpg', '/Rct for upper 5 (3).jpg', '/Rct for upper 5 (4).jpg'] },
  { kind: 'case', section: 'Endodontics', title: 'Rct for lower right 7', images: ['/Rct for lower right 7 (1).jpg', '/Rct for lower right 7 (2).jpg'] },
  { kind: 'case', section: 'Endodontics', title: 'Rct for upper 1 & 2', images: ['/Rct for upper 1&2 (1).jpg', '/Rct for upper 1&2 (2).jpg'] },
  { kind: 'case', section: 'Endodontics', title: 'Rct for upper 7', images: ['/Rct for upper 7 (1).jpg', '/Rct for upper 7 (2).jpg', '/Rct for upper 7 (3).jpg'] },
  { kind: 'case', section: 'Endodontics', title: 'Rct for upper 7', images: ['/new/Rct for upper 7 (1) case 2.jpg', '/new/Rct for upper 7 (2) case 2.jpg', '/new/Rct for upper 7 (3) case 2.jpg'] },
  { kind: 'case', section: 'Endodontics', title: 'Rct for upper 4', images: ['/Rct for upper 4 (1).jpg', '/Rct for upper 4 (2).jpg', '/Rct for upper 4 (3).jpg'] },
  { kind: 'case', section: 'Endodontics', title: 'Rct for lower 8', images: ['/Rct for lower 8 (1).jpg', '/Rct for lower 8 (2).jpg', '/Rct for lower 8 (3).jpg'] },
  { kind: 'case', section: 'Endodontics', title: 'Rct for lower 6', images: ['/Rct for lower 6 (1).jpg'] },
  intro('Operative Dentistry'),
  { kind: 'case', section: 'Operative Dentistry', title: 'Class I composite restoration for lower 6 & 7', images: ['/Class I composite restoration for lower 6&7 (1).jpg', '/Class I composite restoration for lower 6&7 (2).jpg', '/Class I composite restoration for lower 6&7 (3).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Simple class I composite restoration for lower 6', images: ['/Simple class I composite restoration for lower 6 (1).jpg', '/Simple class I composite restoration for lower 6 (2).jpg', '/Simple class I composite restoration for lower 6 (3).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Class I restoration for lower 6', images: ['/Simple class I composite restoration for lower 6 (overview).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Simple class I composite restoration for lower 7', images: ['/Simple class I composite restoration for lower 7 (1).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Simple class I composite restoration for lower 6', images: ['/Simple class I composite restoration for lower 6 case 2 (1).jpg', '/Simple class I composite restoration for lower 6 case 2 (2).jpg', '/Simple class I composite restoration for lower 6 case 2 (3).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Direct pulp capping after pinpoint exposure in upper 6', images: ['/Direct pulp caping after pinpoint exposure in upper 6 (1).jpg', '/Direct pulp caping after pinpoint exposure in upper 6 (2).jpg', '/Direct pulp caping after pinpoint exposure in upper 6 (3).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Simple class I composite restoration for lower 6', images: ['/Simple class I composite restoration for lower 6 (1).jpg', '/Simple class I composite restoration for lower 6 (2).jpg', '/Simple class I composite restoration for lower 6 (3).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'MOD cavity and class I composite restoration for lower 6 & 7', images: ['/MOD cavity and class I composite restoration for lower 6&7 (1).jpg', '/MOD cavity and class I composite restoration for lower 6&7 (2).jpg', '/MOD cavity and class I composite restoration for lower 6&7 (3).jpg', '/MOD cavity and class I composite restoration for lower 6&7 (4).jpg', '/MOD cavity and class I composite restoration for lower 6&7 (5).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Class II composite restoration for upper 5', images: ['/ClassII composite restoration for upper 5 (1).jpg', '/ClassII composite restoration for upper 5 (2).jpg', '/ClassII composite restoration for upper 5 (3).jpg', '/ClassII composite restoration for upper 5 (4).jpg', '/ClassII composite restoration for upper 5 (5).jpg', '/ClassII composite restoration for upper 5 (6).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Class II restoration of lower 6 ( Amalgam retreatment )', images: ['/Class II composite restoration for lower 6 (1).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Class II composite restoration for lower 6', images: ['/Class II composite restoration for lower 6 (2).jpg', '/Class II composite restoration for lower 6 (3).jpg', '/Class II composite restoration for lower 6 (4).jpg', '/Class II composite restoration for lower 6 (5).jpg', '/Class II composite restoration for lower 6 (6).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Composite restoration for upper centrals', images: ['/Composite restoration for upper centrals (1).jpg', '/Composite restoration for upper centrals (2).jpg', '/Composite restoration for upper centrals (3).jpg', '/Composite restoration for upper centrals (4).jpg', '/Composite restoration for upper centrals (5).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Composite restoration for upper anteriors', images: ['/Composite restoration for upper anteriors (1).jpg', '/Composite restoration for upper anteriors (2).jpg', '/Composite restoration for upper anteriors (3).jpg', '/Composite restoration for upper anteriors (4).jpg', '/Composite restoration for upper anteriors (5).jpg', '/Composite restoration for upper anteriors (6).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Class IV for upper central', images: ['/Class IV for upper central (1).jpg', '/Class IV for upper central (2).jpg', '/Class IV for upper central (3).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Class IV for upper lateral incisor', images: ['/Class IV for upper lateral incisor (1).jpg', '/Class IV for upper lateral incisor (2).jpg', '/Class IV for upper lateral incisor (3).jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Class IV restoration for lower 1', images: ['/new/Class IV restoration for lower 1.jpg'] },
  { kind: 'case', section: 'Operative Dentistry', title: 'Class V restoration for upper 4', images: ['/new/Class V restoration for upper 4.jpg'] },
  intro('Fixed Prosthodontics'),
  { kind: 'case', section: 'Fixed Prosthodontics', title: 'Zirconia bridge to compensate lower 6', images: ['/Zirconia bridge to compensate lower 6 (1).jpg'] },
  { kind: 'case', section: 'Fixed Prosthodontics', title: 'Zirconia crown for upper 2', images: ['/Zirconia crown for upper 2 (1).jpg', '/Zirconia crown for upper 2 (2).jpg', '/Zirconia crown for upper 2 (3).jpg', '/Zirconia crown for upper 2 (4).jpg'] },
  { kind: 'case', section: 'Fixed Prosthodontics', title: 'Zirconia bridge to compensate upper centrals', images: ['/Zirconia bridge to compensate upper centrals (1).jpg', '/Zirconia bridge to compensate upper centrals (2).jpg', '/Zirconia bridge to compensate upper centrals (3).jpg', '/Zirconia bridge to compensate upper centrals (4).jpg'] },
  { kind: 'case', section: 'Fixed Prosthodontics', title: '2 single crowns for lower 4 & 5', images: ['/2 single crowns for lower 4&5 (1).jpg', '/2 single crowns for lower 4&5 (2).jpg'] },
  { kind: 'case', section: 'Fixed Prosthodontics', title: 'Zirconia bridge to compensate upper 5 & 6', images: ['/Zirconia bridge to compensate upper 5&6 (1).jpg', '/Zirconia bridge to compensate upper 5&6 (2).jpg'] },
  { kind: 'case', section: 'Fixed Prosthodontics', title: 'Surgical crown lengthening followed by post & core and zirconia crown', images: ['/Surgical crown lengthining followed by post&core and zirconia crown (1).jpg', '/Surgical crown lengthining followed by post&core and zirconia crown (2).jpg'] },
  { kind: 'case', section: 'Fixed Prosthodontics', title: 'Indirect occlusal overlay for upper 4', images: ['/Indirect occlusal overlay for upper 4 (1).jpg', '/Indirect occlusal overlay for upper 4 (2).jpg', '/Indirect occlusal overlay for upper 4 (3).jpg', '/Indirect occlusal overlay for upper 4 (4).jpg', '/Indirect occlusal overlay for upper 4 (5).jpg'] },
  { kind: 'case', section: 'Fixed Prosthodontics', title: 'E-max veneer and crown for upper centrals', images: ['/E-max veneer and crown for upper centrals (1).jpg', '/E-max veneer and crown for upper centrals (2).jpg', '/E-max veneer and crown for upper centrals (3).jpg', '/E-max veneer and crown for upper centrals (4).jpg', '/E-max veneer and crown for upper centrals (5).jpg', '/E-max veneer and crown for upper centrals (6).jpg', '/E-max veneer and crown for upper centrals (7).jpg'] },
]

export function ClinicalPortfolio() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const base = slides[index]
  const currentImages = base.images ?? []
  const current = { ...base, images: currentImages }

  const move = useCallback((nextIndex: number, nextDirection: number) => { setDirection(nextDirection); setIndex((nextIndex + slides.length) % slides.length); setLightbox(null) }, [])
  const next = useCallback(() => move(index + 1, 1), [index, move])
  const previous = useCallback(() => move(index - 1, -1), [index, move])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (lightbox !== null) { if (event.key === 'Escape') setLightbox(null); if (event.key === 'ArrowRight') setLightbox((value) => value === null ? null : (value + 1) % (currentImages?.length ?? 1)); if (event.key === 'ArrowLeft') setLightbox((value) => value === null ? null : (value - 1 + (currentImages?.length ?? 1)) % (currentImages?.length ?? 1)); return }
      if (event.key === 'ArrowRight') next(); if (event.key === 'ArrowLeft') previous()
    }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [currentImages?.length, lightbox, next, previous])

  useEffect(() => {
    const links: HTMLLinkElement[] = []
    for (let offset = 1; offset <= 4; offset++) {
      const slide = slides[(index + offset) % slides.length]
      slide.images?.forEach((src) => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.as = 'image'
        link.href = `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`
        document.head.appendChild(link)
        links.push(link)
      })
    }
    return () => { links.forEach((link) => link.remove()) }
  }, [index])

  return <main className={`portfolio-shell section-${current.section.toLowerCase().replaceAll(' ', '-')}`}>
    <header className="portfolio-header"><div className="header-center"><Image src="/Body Mini Picture.png" alt="Abdelrahman Alaa" width={52} height={64} className="header-avatar" onClick={() => move(0, -1)} style={{cursor:'pointer'}} /></div><a className="contact-link" href="mailto:abdelrahman.alaa@dentistry.example.com">Contact <ArrowRight size={14} /></a></header>
    <div className="portfolio-stage" onTouchStart={(event) => { (event.currentTarget as HTMLElement).dataset.touchX = String(event.touches[0].clientX) }} onTouchEnd={(event) => { const start = Number((event.currentTarget as HTMLElement).dataset.touchX); const delta = event.changedTouches[0].clientX - start; if (Math.abs(delta) > 50) delta < 0 ? next() : previous() }}>
      <button className="nav-arrow nav-arrow-left" onClick={previous} aria-label="Previous slide"><ArrowLeft size={22} strokeWidth={1.25} /></button>
      <div className="slide-frame" key={index} style={{ '--slide-direction': direction } as React.CSSProperties}>{current.kind === 'profile' ? <ProfileSlide slide={current} /> : current.kind === 'intro' ? <IntroSlide slide={current} /> : <CaseSlide slide={current} onImageClick={setLightbox} />}</div>
      <button className="nav-arrow nav-arrow-right" onClick={next} aria-label="Next slide"><ArrowRight size={22} strokeWidth={1.25} /></button>
    </div>
    <div className="progress-counter">{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</div>
    {lightbox !== null && currentImages && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Expanded clinical image" onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image"><X size={22} /></button><button className="lightbox-nav lightbox-prev" onClick={(event) => { event.stopPropagation(); setLightbox((value) => value === null ? null : (value - 1 + currentImages.length) % currentImages.length) }} aria-label="Previous image"><ChevronLeft /></button><Image src={currentImages[lightbox]} alt={`${current.title}, image ${lightbox + 1}`} width={1600} height={1100} className="lightbox-image" onClick={(event) => event.stopPropagation()} /><button className="lightbox-nav lightbox-next" onClick={(event) => { event.stopPropagation(); setLightbox((value) => value === null ? null : (value + 1) % currentImages.length) }} aria-label="Next image"><ChevronRight /></button><span className="lightbox-count">{String(lightbox + 1).padStart(2, '0')} / {String(currentImages.length).padStart(2, '0')}</span></div>}
  </main>
}

function ProfileSlide({ slide }: { slide: Slide }) { return <div className="profile-slide"><div className="profile-image-wrap"><Image src="/Body Profile Picture 2.png" alt="Abdelrahman Alaa" fill sizes="(max-width: 800px) 100vw, 50vw" className="profile-image" /></div><div className="profile-copy"><span className="eyebrow">01 / About the clinician</span><h1>{slide.title}</h1><p className="profile-description">Intern dentist at the Faculty of Dentistry, Assiut University, Class of 2025 — graduating with an overall grade of Very Good. Driven by a deep interest in Restorative Dentistry, Endodontics, Oral Surgery, and Oral & Maxillofacial Diseases, and actively seeking observer or unpaid assistant roles to build hands-on clinical experience and grow within the disciplines that matter most.</p></div></div> }
function IntroSlide({ slide }: { slide: Slide }) { const num = sectionNumbers[slide.section as Exclude<Section, 'Profile'>]; return <div className="intro-slide"><span className="intro-number">{num}</span><div><span className="eyebrow">A clinical collection</span><h1>{slide.title}</h1></div></div> }
function CaseSlide({ slide, onImageClick }: { slide: Slide; onImageClick: (index: number) => void }) { return <div className="case-slide"><div className="case-heading"><div><span className="eyebrow">{slide.section}</span><h1>{slide.title}</h1></div></div><div className="case-gallery">{slide.images?.length ? slide.images.map((image, imageIndex) => <button key={`${image}-${imageIndex}`} className="gallery-item" onClick={() => onImageClick(imageIndex)} aria-label={`View image ${imageIndex + 1} of ${slide.title}`}><Image src={image} alt={`${slide.title}, clinical view ${imageIndex + 1}`} fill sizes="(max-width: 700px) 100vw, 33vw" className="gallery-image" /></button>) : null}</div></div> }
