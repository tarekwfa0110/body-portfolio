import { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Photo } from '@/lib/types'

type Props = {
  title: string
  images: Photo[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

export function Lightbox({ title, images, index, onChange, onClose }: Props) {
  const count = images.length
  const step = (by: number) => onChange((index + by + count) % count)
  const image = images[index]
  const touchX = useRef(0)

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Expanded clinical image"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        const delta = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1)
      }}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Close image">
        <X size={22} />
      </button>
      {count > 1 && (
        <button
          className="lightbox-nav lightbox-prev"
          onClick={(e) => {
            e.stopPropagation()
            step(-1)
          }}
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>
      )}
      <Image
        src={image.src}
        alt={`${title}, image ${index + 1}`}
        width={image.width}
        height={image.height}
        sizes="100vw"
        className="lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />
      {count > 1 && (
        <button
          className="lightbox-nav lightbox-next"
          onClick={(e) => {
            e.stopPropagation()
            step(1)
          }}
          aria-label="Next image"
        >
          <ChevronRight />
        </button>
      )}
      <span className="lightbox-count">
        {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </span>
    </div>
  )
}
