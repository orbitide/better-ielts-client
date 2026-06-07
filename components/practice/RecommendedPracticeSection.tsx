'use client'

import { useAuthStore } from '@/lib/store/auth-store'
import { RecommendedPracticeCard } from '@/components/practice/RecommendedPracticeCard'
import type { PracticeRecommendation } from '@/lib/data/practice'

export function RecommendedPracticeSection({ recommendation }: { recommendation: PracticeRecommendation }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const hasHydrated = useAuthStore((s) => s._hasHydrated)

  if (!hasHydrated || !isAuthenticated) return null

  return <RecommendedPracticeCard recommendation={recommendation} />
}
