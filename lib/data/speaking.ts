import { cache } from 'react'
import { fetchSpeakingSessions, fetchSpeakingSession } from '@/lib/api/ielts'
import type { SpeakingSession } from '@/lib/types/speaking'

export const getAllSpeakingSessions = cache(async (): Promise<SpeakingSession[]> => {
  try {
    return (await fetchSpeakingSessions()) as SpeakingSession[]
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
