import { fetchReadingTests, fetchReadingTest } from '@/lib/api/ielts'
import type { ReadingTest, ReadingTestSummary } from '@/lib/types/reading'

export const getAllReadingTests = async (): Promise<ReadingTestSummary[]> => {
  try {
    return (await fetchReadingTests()) as ReadingTestSummary[]
  } catch {
    return []
  }
}

export const getReadingTest = async (id: string): Promise<ReadingTest | null> => {
  try {
    return (await fetchReadingTest(id)) as ReadingTest
  } catch {
    return null
  }
}
