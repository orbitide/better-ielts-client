import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { courses } from '@/lib/mock/courses'
import type { Course } from '@/lib/types/course'

export const getAllCourses = cache(async (): Promise<Course[]> => {
  await delay(200)
  return courses
})

export const getCourse = cache(async (id: string): Promise<Course | null> => {
  await delay(200)
  return courses.find((c) => c.id === id) ?? null
})

export const getLesson = cache(async (lessonId: string) => {
  await delay(200)
  for (const course of courses) {
    const lesson = course.lessons.find((l) => l.id === lessonId)
    if (lesson) return { lesson, course }
  }
  return null
})

export const getCoursesBySkill = cache(async (skill: Course['skill']) => {
  await delay(200)
  return courses.filter((c) => c.skill === skill)
})
