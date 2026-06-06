import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { listeningTests } from '@/lib/mock/listening-tests'
import type { ListeningTest } from '@/lib/types/listening'

export const getAllListeningTests = cache(async (): Promise<ListeningTest[]> => {
  await delay(200)
  return listeningTests
})

export const getListeningTest = cache(async (id: string): Promise<ListeningTest | null> => {
  await delay(250)
  return listeningTests.find((t) => t.id === id) ?? null
})
