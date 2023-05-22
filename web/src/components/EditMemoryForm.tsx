'use client'

import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { MediaPicker } from './MediaPicker'
import { DeleteMemory } from './DeleteMemory'

interface EditMemoryProps {
  memory: {
    id: string
    coverUrl: string
    content: string
    isPublic: boolean
  }
}

export function EditMemoryForm({ memory }: EditMemoryProps) {
  const router = useRouter()
  const token = Cookie.get('token')

  async function handleEditMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    formData.set('isPublic', memory.isPublic.toString())
    const file = formData.get('coverUrl')
    const hasFile = file instanceof File && file.size > 0

    formData.set('coverUrl', memory.coverUrl)
    if (hasFile) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', file)
      const uploadResponse = await api.post('/upload', uploadFormData)
      formData.set('coverUrl', uploadResponse.data.fileUrl)
    }

    await api.put(
      `/memories/${memory.id}`,
      {
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
        coverUrl: formData.get('coverUrl'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    router.push('/')
  }

  return (
    <form onSubmit={handleEditMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="midia"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="outline:none h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 focus:ring-0"
          />
          Tornar memória pública
        </label>
      </div>
      <MediaPicker coverUrl={memory.coverUrl} />
      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      >
        {memory.content}
      </textarea>
      <div className="flex justify-between">
        <DeleteMemory memory={memory} />
        <button
          className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
          type="submit"
        >
          Salvar Edição
        </button>
      </div>
    </form>
  )
}
