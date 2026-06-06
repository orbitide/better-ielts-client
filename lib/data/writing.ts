import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { writingTasks } from '@/lib/mock/writing-tasks'
import type { WritingTask } from '@/lib/types/writing'

export const getAllWritingTasks = cache(async (): Promise<WritingTask[]> => {
  await delay(200)
  return writingTasks
})

export const getWritingTask = cache(async (id: string): Promise<WritingTask | null> => {
  await delay(250)
  return writingTasks.find((t) => t.id === id) ?? null
})
