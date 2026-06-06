export type LessonType = 'video' | 'reading' | 'exercise' | 'quiz'

export type Lesson = {
  id: string
  courseId: string
  title: string
  description: string
  type: LessonType
  durationMinutes: number
  orderIndex: number
  isCompleted: boolean
  videoUrl?: string
  content?: string
}

export type Course = {
  id: string
  title: string
  description: string
  skill: 'listening' | 'reading' | 'writing' | 'speaking' | 'general'
  level: 'beginner' | 'intermediate' | 'advanced'
  thumbnailUrl: string
  totalLessons: number
  totalDurationMinutes: number
  enrolledCount: number
  rating: number
  lessons: Lesson[]
  tags: string[]
}
