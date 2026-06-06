import type { User } from '@/lib/types/user'

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex',
  targetBand: 7.5,
  currentBand: {
    overall: 6.5,
    listening: 7.0,
    reading: 6.5,
    writing: 6.0,
    speaking: 6.5,
  },
  studyStreak: 12,
  totalStudyHours: 87,
  joinedAt: '2025-09-01',
  plan: 'pro',
}

export const bandHistory = [
  { month: 'Sep', overall: 5.5, listening: 6.0, reading: 5.5, writing: 5.0, speaking: 5.5 },
  { month: 'Oct', overall: 5.5, listening: 6.0, reading: 5.5, writing: 5.5, speaking: 5.5 },
  { month: 'Nov', overall: 6.0, listening: 6.5, reading: 6.0, writing: 5.5, speaking: 6.0 },
  { month: 'Dec', overall: 6.0, listening: 6.5, reading: 6.0, writing: 6.0, speaking: 6.0 },
  { month: 'Jan', overall: 6.5, listening: 7.0, reading: 6.5, writing: 6.0, speaking: 6.0 },
  { month: 'Feb', overall: 6.5, listening: 7.0, reading: 6.5, writing: 6.0, speaking: 6.5 },
]

export const recentActivity = [
  { id: '1', type: 'reading', title: 'Reading Test: Academic Practice 1', score: '32/40', date: '2026-06-06', href: '/reading/test-1' },
  { id: '2', type: 'writing', title: 'Writing Task 2: Technology Essay', wordCount: 285, date: '2026-06-05', href: '/writing/task2-1' },
  { id: '3', type: 'listening', title: 'Listening Test: General Practice 1', score: '36/40', date: '2026-06-04', href: '/listening/test-1' },
  { id: '4', type: 'speaking', title: 'Speaking Session: Environment', band: 6.5, date: '2026-06-03', href: '/speaking/session-1' },
  { id: '5', type: 'vocabulary', title: 'Vocabulary: Technology (20 words)', score: '18/20', date: '2026-06-02', href: '/vocabulary/technology' },
]
