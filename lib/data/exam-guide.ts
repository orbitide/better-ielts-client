import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { examGuideData } from '@/lib/mock/exam-guide'

export const getExamGuide = cache(async () => {
  await delay(100)
  return examGuideData
})
