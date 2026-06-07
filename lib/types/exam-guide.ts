export type ExamSkill = 'listening' | 'reading' | 'writing' | 'speaking'

export type QuestionTypeInfo = {
  name: string
  description: string
}

export type SkillSection = {
  skill: ExamSkill
  label: string
  duration: string
  totalQuestions: number
  scoringMethod: string
  format: string
  questionTypes: QuestionTypeInfo[]
  tips: string[]
  practiceHref?: string
}

export type ExamGuideData = {
  overview: string
  examOrder: string[]
  academicVsGeneral: {
    sharedSkills: string[]
    differingSkills: string[]
    notes: string
  }
  skills: SkillSection[]
}
