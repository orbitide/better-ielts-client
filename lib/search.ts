export type SearchResult = {
  id: string
  label: string
  description: string
  category: 'Course' | 'Lesson' | 'Vocabulary' | 'Blog' | 'Reading Test' | 'Writing Task' | 'Mock Test'
  href: string
}

export function search(_query: string): SearchResult[] {
  return []
}
