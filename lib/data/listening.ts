import { cache } from 'react'
import { fetchListeningTests, fetchListeningTest } from '@/lib/api/ielts'
import type { ListeningTest, ListeningTestSummary } from '@/lib/types/listening'

export const getAllListeningTests = cache(async (): Promise<ListeningTestSummary[]> => {
  try {
    return (await fetchListeningTests()) as ListeningTestSummary[]
  } catch {
    return []
  }
})

export const getListeningTest = cache(async (id: string): Promise<ListeningTest | null> => {
  try {
    return (await fetchListeningTest(id)) as ListeningTest
  } catch {
    return null
  }
})
