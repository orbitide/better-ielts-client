import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { mockStudyPlan } from '@/lib/mock/study-plans'

export const getStudyPlan = cache(async (_userId: string) => {
  await delay(200)
  return mockStudyPlan
})
