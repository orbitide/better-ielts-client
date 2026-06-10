import { cache } from 'react'
import type { Course, Lesson } from '@/lib/types/course'

export const getAllCourses = cache(async (): Promise<Course[]> => {
  return []
})

export const getCourse = cache(async (_id: string): Promise<Course | null> => {
  return null
})

export const getLesson = cache(async (_lessonId: string): Promise<{ lesson: Lesson; course: Course } | null> => {
  return null
})

export const getCoursesBySkill = cache(async (_skill: Course['skill']): Promise<Course[]> => {
  return []
})
