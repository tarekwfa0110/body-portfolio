import Image from 'next/image'
import { imageSize } from '@/lib/images'
import type { Case } from '@/lib/types'

export function CaseSlide({
  item,
  onImageClick,
}: {
  item: Case
  onImageClick: (index: number) => void
}) {
  return (
    <div className="case-slide">
      <div className="case-heading">
        <span className="eyebrow">{item.section}</span>
        <h1>{item.title}</h1>
      </div>
      <div className="case-gallery" data-count={Math.min(item.images.length, 4)}>
        {item.images.map((src, i) => {
          const { width, height } = imageSize(src)
          return (
            <button
              key={`${src}-${i}`}
              className="gallery-item"
              onClick={() => onImageClick(i)}
              aria-label={`View image ${i + 1} of ${item.title}`}
            >
              <Image
                src={src}
                alt={`${item.title}, clinical view ${i + 1}`}
                width={width}
                height={height}
                sizes="(max-width: 800px) 100vw, 33vw"
                className="gallery-image"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
