import { cache } from 'react'
import { fetchSpeakingSessions, fetchSpeakingSession } from '@/lib/api/ielts'
import type { SpeakingSession, SpeakingSessionSummary } from '@/lib/types/speaking'

export const getAllSpeakingSessions = cache(async (): Promise<SpeakingSessionSummary[]> => {
  try {
    return (await fetchSpeakingSessions()) as SpeakingSessionSummary[]
  } catch {
    return []
  }
})

export const getSpeakingSession = cache(async (id: string): Promise<SpeakingSession | null> => {
  try {
    return (await fetchSpeakingSession(id)) as SpeakingSession
  } catch {
    return null
  }
})
