import { getWritingTask } from '@/lib/data/writing'
import { notFound } from 'next/navigation'
import { WritingTaskShell } from '@/components/writing/WritingTaskShell'

export async function generateMetadata({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params
  const task = await getWritingTask(taskId)
  return { title: task?.title ?? 'Writing Task' }
}

export default async function WritingTaskPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params
  const task = await getWritingTask(taskId)
  if (!task) notFound()
  return <WritingTaskShell task={task} />
}
