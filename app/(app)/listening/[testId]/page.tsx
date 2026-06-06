import { getListeningTest } from '@/lib/data/listening'
import { notFound } from 'next/navigation'
import { ListeningTestShell } from '@/components/listening/ListeningTestShell'

export async function generateMetadata({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params
  const test = await getListeningTest(testId)
  return { title: test?.title ?? 'Listening Test' }
}

export default async function ListeningTestPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params
  const test = await getListeningTest(testId)
  if (!test) notFound()
  return <ListeningTestShell test={test} />
}
