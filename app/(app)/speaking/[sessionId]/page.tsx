import { getSpeakingSession } from '@/lib/data/speaking'
import { notFound } from 'next/navigation'
import { SpeakingSessionShell } from '@/components/speaking/SpeakingSessionShell'

export async function generateMetadata({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params
  const session = await getSpeakingSession(sessionId)
  return { title: session?.title ?? 'Speaking Session' }
}

export default async function SpeakingSessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params
  const session = await getSpeakingSession(sessionId)
  if (!session) notFound()
  return <SpeakingSessionShell session={session} />
}
