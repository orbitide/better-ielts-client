export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'skipped'
export type TaskCategory =
  | 'listening'
  | 'reading'
  | 'writing'
  | 'speaking'
  | 'vocabulary'
  | 'mock-test'

export type StudyTask = {
  id: string
  title: string
  description: string
  category: TaskCategory
  durationMinutes: number
  status: TaskStatus
  linkHref: string
}

export type StudyPlanDay = {
  date: string
  tasks: StudyTask[]
}

export type StudyPlan = {
  id: string
  userId: string
  weekStartDate: string
  days: StudyPlanDay[]
  targetBand: number
  weeklyGoalMinutes: number
}
