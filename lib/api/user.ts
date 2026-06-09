import serverApi from '@/lib/api/server'
import type { User } from '@/lib/types/user'

export async function fetchCurrentUser(): Promise<User> {
  const { data } = await serverApi.get('/api/users/me')
  const u = data.data
  return {
    id: u.id,
    name: u.name ?? '',
    email: u.email ?? '',
    avatarUrl: u.avatarUrl ?? '',
    targetBand: u.targetBand ?? 7,
    currentBand: u.currentBand ?? { overall: 0, listening: 0, reading: 0, writing: 0, speaking: 0 },
    totalStudyHours: u.totalStudyHours ?? 0,
    joinedAt: u.joinedAt ? new Date(u.joinedAt).toISOString().split('T')[0] : '',
    plan: u.plan ?? 'free',
  }
}

export async function fetchBandHistory() {
  const { data } = await serverApi.get('/api/users/me/band-history')
  const entries = (data.data ?? []) as Array<{
    scores: { overall: number; listening: number; reading: number; writing: number; speaking: number }
    recordedAt: string
  }>
  return entries
    .sort((a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime())
    .slice(-6)
    .map((e) => ({
      month: new Date(e.recordedAt).toLocaleString('default', { month: 'short' }),
      overall: e.scores.overall,
      listening: e.scores.listening,
      reading: e.scores.reading,
      writing: e.scores.writing,
      speaking: e.scores.speaking,
    }))
}
