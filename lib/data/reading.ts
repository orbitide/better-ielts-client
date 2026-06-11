import { cache } from 'react'
import { fetchReadingTests, fetchReadingTest } from '@/lib/api/ielts'
import type { ReadingTest, ReadingTestSummary } from '@/lib/types/reading'

export const getAllReadingTests = cache(async (): Promise<ReadingTestSummary[]> => {
  try {
    return (await fetchReadingTests()) as ReadingTestSummary[]
  } catch {
    return []
  }
})

export const getReadingTest = cache(async (id: string): Promise<ReadingTest | null> => {
  try {
    return (await fetchReadingTest(id)) as ReadingTest
  } catch {
    return null
  }
})
