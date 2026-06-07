import { courses } from '@/lib/mock/courses'
import { vocabTopics } from '@/lib/mock/vocabulary'
import { blogPosts } from '@/lib/mock/blog-posts'
import { readingTests } from '@/lib/mock/reading-tests'
import { writingTasks } from '@/lib/mock/writing-tasks'
import { mockTests } from '@/lib/mock/mock-tests'

export type SearchResult = {
  id: string
  label: string
  description: string
  category: 'Course' | 'Lesson' | 'Vocabulary' | 'Blog' | 'Reading Test' | 'Writing Task' | 'Mock Test'
  href: string
}

type ScoredResult = SearchResult & { score: number }

function score(query: string, title: string, extra: string): number {
  const q = query.toLowerCase()
  let s = 0
  if (title.toLowerCase().includes(q)) s += 3
  if (extra.toLowerCase().includes(q)) s += 1
  return s
}

function buildIndex(): SearchResult[] {
  const items: SearchResult[] = []

  for (const course of courses) {
    items.push({
      id: `course-${course.id}`,
      label: course.title,
      description: course.description,
      category: 'Course',
      href: `/practice/${course.skill}`,
    })
    for (const lesson of course.lessons) {
      items.push({
        id: `lesson-${lesson.id}`,
        label: lesson.title,
        description: lesson.description,
        category: 'Lesson',
        href: `/lesson/${lesson.id}`,
      })
    }
  }

  for (const topic of vocabTopics) {
    items.push({
      id: `vocab-${topic.id}`,
      label: topic.title,
      description: topic.description,
      category: 'Vocabulary',
      href: `/vocabulary/${topic.slug}`,
    })
  }

  for (const post of blogPosts) {
    items.push({
      id: `blog-${post.id}`,
      label: post.title,
      description: post.excerpt,
      category: 'Blog',
      href: `/blog/${post.slug}`,
    })
  }

  for (const test of readingTests) {
    items.push({
      id: `reading-${test.id}`,
      label: test.title,
      description: '',
      category: 'Reading Test',
      href: `/reading/${test.id}`,
    })
  }

  for (const task of writingTasks) {
    items.push({
      id: `writing-${task.id}`,
      label: task.title,
      description: task.prompt.slice(0, 80),
      category: 'Writing Task',
      href: `/writing/${task.id}`,
    })
  }

  for (const test of mockTests) {
    items.push({
      id: `mock-${test.id}`,
      label: test.title,
      description: test.description,
      category: 'Mock Test',
      href: `/mock-test/${test.id}`,
    })
  }

  return items
}

const searchIndex = buildIndex()

export function search(query: string): SearchResult[] {
  const q = query.trim()
  if (q.length < 2) return []

  const scored: ScoredResult[] = searchIndex
    .map((item) => ({ ...item, score: score(q, item.label, item.description) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, 8)
}
