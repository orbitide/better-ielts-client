import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { mockUser, bandHistory, recentActivity } from '@/lib/mock/users'

export const getCurrentUser = cache(async () => {
  await delay(150)
  return mockUser
})

export const getBandHistory = cache(async () => {
  await delay(150)
  return bandHistory
})

export const getRecentActivity = cache(async () => {
  await delay(150)
  return recentActivity
})
