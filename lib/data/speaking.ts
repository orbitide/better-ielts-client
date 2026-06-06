import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { speakingSessions } from '@/lib/mock/speaking-sessions'
import type { SpeakingSession } from '@/lib/types/speaking'

export const getAllSpeakingSessions = cache(async (): Promise<SpeakingSession[]> => {
  await delay(200)
  return speakingSessions
})

export const getSpeakingSession = cache(async (id: string): Promise<SpeakingSession | null> => {
  await delay(250)
  return speakingSessions.find((s) => s.id === id) ?? null
})
