'use client'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) return

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        id="midia"
        accept="images/*"
        className="invisible h-0 w-0"
      />
      {preview && (
        <Image
          src={preview}
          alt="Imagem"
          className="aspect-video w-full rounded-lg object-cover"
          unoptimized
        />
      )}
    </>
  )
}
