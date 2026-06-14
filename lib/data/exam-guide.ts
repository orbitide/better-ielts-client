import { fetchExamGuide } from '@/lib/api/ielts'
import type { ExamGuideData } from '@/lib/types/exam-guide'

export const getExamGuide = async (): Promise<ExamGuideData | null> => {
  try {
    return (await fetchExamGuide()) as ExamGuideData
  } catch {
    return null
  }
}
