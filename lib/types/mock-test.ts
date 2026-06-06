export type MockTestSection = {
  id: string
  skill: 'listening' | 'reading' | 'writing' | 'speaking'
  orderIndex: number
  durationMinutes: number
  testId: string
}

export type MockTest = {
  id: string
  title: string
  description: string
  type: 'academic' | 'general'
  durationMinutes: number
  sections: MockTestSection[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}
