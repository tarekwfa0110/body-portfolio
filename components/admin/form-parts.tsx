'use client'

import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useFormStatus } from 'react-dom'

const MAX_EDGE = 1800

// Phone photos are several MB; shrink them in the browser so the upload stays
// under the host's request size limit. The server compresses them again to WebP.
async function shrink(file: File) {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', 0.82),
  )
  return blob
    ? new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' })
    : file
}

export function PhotoInput({
  name,
  multiple,
  required,
}: {
  name: string
  multiple?: boolean
  required?: boolean
}) {
  const generationRef = useRef(0)
  return (
    <input
      type="file"
      name={name}
      accept="image/*"
      multiple={multiple}
      required={required}
      onChange={async (event) => {
        const input = event.currentTarget
        const files = Array.from(input.files ?? [])
        const generation = ++generationRef.current
        const shrunk = new DataTransfer()
        for (const file of files) {
          const converted = await shrink(file).catch(() => file)
          if (generation !== generationRef.current) return
          shrunk.items.add(converted)
        }
        if (generation !== generationRef.current) return
        const total = Array.from(shrunk.files).reduce((sum, f) => sum + f.size, 0)
        if (total > 4 * 1024 * 1024) {
          alert('Selected photos are too large after compression. Please choose fewer or smaller photos.')
          input.value = ''
          return
        }
        input.files = shrunk.files
      }}
    />
  )
}

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="admin-button" disabled={pending}>
      {pending ? 'Working…' : children}
    </button>
  )
}
