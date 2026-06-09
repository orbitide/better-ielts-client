import { cache } from 'react'
import { fetchMockTests, fetchMockTest } from '@/lib/api/ielts'
import type { MockTest } from '@/lib/types/mock-test'

export const getAllMockTests = cache(async (): Promise<MockTest[]> => {
  try {
    return (await fetchMockTests()) as MockTest[]
  } catch {
    return []
  }
})

export const getMockTest = cache(async (id: string): Promise<MockTest | null> => {
  try {
    return (await fetchMockTest(id)) as MockTest
  } catch {
    return null
  }
})
