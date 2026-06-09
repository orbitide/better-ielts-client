import { cache } from 'react'
import { fetchWritingTasks, fetchWritingTask } from '@/lib/api/ielts'
import type { WritingTask } from '@/lib/types/writing'

export const getAllWritingTasks = cache(async (): Promise<WritingTask[]> => {
  try {
    return (await fetchWritingTasks()) as WritingTask[]
  } catch {
    return []
  }
})

export const getWritingTask = cache(async (id: string): Promise<WritingTask | null> => {
  try {
    return (await fetchWritingTask(id)) as WritingTask
  } catch {
    return null
  }
})
