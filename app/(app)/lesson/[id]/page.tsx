import { getLesson } from '@/lib/data/courses'
import { notFound } from 'next/navigation'
import { LessonPlayer } from '@/components/lesson/LessonPlayer'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getLesson(id)
  return { title: result?.lesson.title ?? 'Lesson' }
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getLesson(id)
  if (!result) notFound()
  return <LessonPlayer lesson={result.lesson} course={result.course} />
}
