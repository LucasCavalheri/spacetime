import { EditMemoryForm } from '@/components/EditMemoryForm'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

interface MemoryProps {
  params: {
    id: string
  }
}

interface IMemory {
  id: string
  coverUrl: string
  content: string
  isPublic: boolean
}

export default async function Memory({ params: { id } }: MemoryProps) {
  const token = cookies().get('token')?.value
  const { data } = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: IMemory = data

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>
      <EditMemoryForm memory={memory} />
    </div>
  )
}
