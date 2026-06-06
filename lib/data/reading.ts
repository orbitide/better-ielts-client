import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { readingTests } from '@/lib/mock/reading-tests'
import type { ReadingTest } from '@/lib/types/reading'

export const getAllReadingTests = cache(async (): Promise<ReadingTest[]> => {
  await delay(200)
  return readingTests
})

export const getReadingTest = cache(async (id: string): Promise<ReadingTest | null> => {
  await delay(250)
  return readingTests.find((t) => t.id === id) ?? null
})
