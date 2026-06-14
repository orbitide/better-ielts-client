import { fetchCurrentUser, fetchBandHistory } from '@/lib/api/user'
import type { RecentActivity } from '@/lib/types/user'

export const getCurrentUser = async () => {
  return fetchCurrentUser()
}

export const getBandHistory = async () => {
  return fetchBandHistory()
}

export const getRecentActivity = async (): Promise<RecentActivity[]> => {
  return []
}
