export type BandScore = {
  overall: number
  listening: number
  reading: number
  writing: number
  speaking: number
}

export type User = {
  id: string
  name: string
  email: string
  avatarUrl: string
  targetBand: number
  currentBand: BandScore
  studyStreak: number
  totalStudyHours: number
  joinedAt: string
  plan: 'free' | 'pro' | 'elite'
}
