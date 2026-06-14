import { fetchSpeakingSessions, fetchSpeakingSession } from '@/lib/api/ielts'
import type { SpeakingSession, SpeakingSessionSummary } from '@/lib/types/speaking'

export const getAllSpeakingSessions = async (): Promise<SpeakingSessionSummary[]> => {
  try {
    return (await fetchSpeakingSessions()) as SpeakingSessionSummary[]
  } catch {
    return []
  }
}

export const getSpeakingSession = async (id: string): Promise<SpeakingSession | null> => {
  try {
    return (await fetchSpeakingSession(id)) as SpeakingSession
  } catch {
    return null
  }
}
