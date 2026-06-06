import { getMockTest } from '@/lib/data/mock-tests'
import { notFound } from 'next/navigation'
import { MockTestShell } from '@/components/mock-test/MockTestShell'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const test = await getMockTest(id)
  return { title: test?.title ?? 'Mock Test' }
}

export default async function MockTestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const test = await getMockTest(id)
  if (!test) notFound()
  return <MockTestShell test={test} />
}
