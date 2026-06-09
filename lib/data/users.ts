import { cache } from 'react'
import { fetchCurrentUser, fetchBandHistory } from '@/lib/api/user'
import type { RecentActivity } from '@/lib/types/user'

export const getCurrentUser = cache(async () => {
  return fetchCurrentUser()
})

export const getBandHistory = cache(async () => {
  return fetchBandHistory()
})

export const getRecentActivity = cache(async (): Promise<RecentActivity[]> => {
  return []
})
