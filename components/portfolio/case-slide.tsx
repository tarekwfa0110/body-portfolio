import Image from 'next/image'
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
        {item.images.map((image, i) => {
          return (
            <button
              key={`${image.src}-${i}`}
              className="gallery-item"
              onClick={() => onImageClick(i)}
              aria-label={`View image ${i + 1} of ${item.title}`}
            >
              <Image
                src={image.src}
                alt={`${item.title}, clinical view ${i + 1}`}
                width={image.width}
                height={image.height}
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
