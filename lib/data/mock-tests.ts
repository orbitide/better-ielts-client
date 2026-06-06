import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { mockTests } from '@/lib/mock/mock-tests'
import type { MockTest } from '@/lib/types/mock-test'

export const getAllMockTests = cache(async (): Promise<MockTest[]> => {
  await delay(200)
  return mockTests
})

export const getMockTest = cache(async (id: string): Promise<MockTest | null> => {
  await delay(250)
  return mockTests.find((t) => t.id === id) ?? null
})
