import { fetchWritingTasks, fetchWritingTask } from '@/lib/api/ielts'
import type { WritingTask, WritingTaskSummary } from '@/lib/types/writing'

export const getAllWritingTasks = async (): Promise<WritingTaskSummary[]> => {
  try {
    return (await fetchWritingTasks()) as WritingTaskSummary[]
  } catch {
    return []
  }
}

export const getWritingTask = async (id: string): Promise<WritingTask | null> => {
  try {
    return (await fetchWritingTask(id)) as WritingTask
  } catch {
    return null
  }
}
