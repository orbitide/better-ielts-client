export type MockTestSection = {
  skill: 'listening' | 'reading' | 'writing' | 'speaking'
  contentId: string
  title: string
  durationMinutes: number
}

export type MockTest = {
  id: string
  title: string
  description: string
  type: 'academic' | 'general'
  durationMinutes: number
  sectionCount: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

// Detail view of a single mock test — sections are fetched separately via a paginated call
export type MockTestDetail = {
  id: string
  title: string
  description: string
  type: 'academic' | 'general'
  durationMinutes: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}
