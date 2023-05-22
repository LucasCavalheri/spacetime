'use client'

import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

interface DeleteMemoryProps {
  memory: {
    id: string
  }
}

export function DeleteMemory({ memory }: DeleteMemoryProps) {
  const router = useRouter()
  const token = Cookie.get('token')

  async function handleDeleteMemory() {
    await api.delete(`/memories/${memory.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    router.push('/')
  }

  return (
    <button
      onClick={handleDeleteMemory}
      className="inline-block self-end rounded-full bg-red-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-red-600"
    >
      Deletar memória
    </button>
  )
}
