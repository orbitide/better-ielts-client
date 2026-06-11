export type RecentActivity = {
  id: string
  type: 'reading' | 'listening' | 'writing' | 'speaking' | 'vocabulary'
  title: string
  href: string
  date: string
  score?: string
  band?: number
}

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
  totalStudyHours: number
  joinedAt: string
  plan: 'free' | 'pro' | 'elite'
  isEmailVerified: boolean
}
