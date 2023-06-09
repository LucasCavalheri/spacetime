'use client'

import { ChangeEvent, useState } from 'react'

interface MediaPickerProps {
  coverUrl?: string | null
}

export function MediaPicker({ coverUrl }: MediaPickerProps) {
  const [preview, setPreview] = useState<string | null>(coverUrl || null)

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
        name="coverUrl"
        type="file"
        id="midia"
        accept="images/*"
        className="invisible h-0 w-0"
      />
      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt="Imagem"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
