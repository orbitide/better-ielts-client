import { fetchCurrentStudyPlan } from '@/lib/api/ielts'
import type { StudyPlan } from '@/lib/types/study-plan'

export const getStudyPlan = async (_userId?: string): Promise<StudyPlan | null> => {
  try {
    return (await fetchCurrentStudyPlan()) as StudyPlan
  } catch {
    return null
  }
}
