import { cache } from 'react'
import { fetchMockTests, fetchMockTest, fetchMockTestSections } from '@/lib/api/ielts'
import type { MockTest, MockTestDetail, MockTestSection } from '@/lib/types/mock-test'
import type { PagedResult } from '@/lib/types/paged-result'

export const getAllMockTests = cache(async (): Promise<MockTest[]> => {
  try {
    return (await fetchMockTests()) as MockTest[]
  } catch {
    return []
  }
})

export const getMockTest = cache(async (id: string): Promise<MockTestDetail | null> => {
  try {
    return (await fetchMockTest(id)) as MockTestDetail
  } catch {
    return null
  }
})

export const getMockTestSections = cache(
  async (id: string, page = 1, pageSize = 20): Promise<PagedResult<MockTestSection>> => {
    try {
      return (await fetchMockTestSections(id, page, pageSize)) as PagedResult<MockTestSection>
    } catch {
      return { items: [], totalCount: 0, page, pageSize, totalPages: 0, hasNextPage: false, hasPreviousPage: false }
    }
  },
)
