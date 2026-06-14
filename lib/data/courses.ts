import type { Course, Lesson } from '@/lib/types/course'

export const getAllCourses = async (): Promise<Course[]> => {
  return []
}

export const getCourse = async (_id: string): Promise<Course | null> => {
  return null
}

export const getLesson = async (_lessonId: string): Promise<{ lesson: Lesson; course: Course } | null> => {
  return null
}

export const getCoursesBySkill = async (_skill: Course['skill']): Promise<Course[]> => {
  return []
}
