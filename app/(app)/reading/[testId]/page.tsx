import { getReadingTest } from '@/lib/data/reading'
import { notFound } from 'next/navigation'
import { ReadingTestShell } from '@/components/reading/ReadingTestShell'

export async function generateMetadata({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params
  const test = await getReadingTest(testId)
  return { title: test?.title ?? 'Reading Test' }
}

export default async function ReadingTestPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params
  const test = await getReadingTest(testId)
  if (!test || test.sections.length === 0) notFound()
  return <ReadingTestShell test={test} />
}
