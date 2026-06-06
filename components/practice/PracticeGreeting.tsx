'use client'

import { useAuthStore } from '@/lib/store/auth-store'
import { useAuthHydration } from '@/hooks/use-auth-hydration'

export function PracticeGreeting() {
  const hydrated = useAuthHydration()
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (!hydrated || !isAuthenticated || !user) return null

  const firstName = user.name.split(' ')[0]

  return (
    <p className="text-sm text-muted-foreground">
      Welcome back, <span className="font-medium text-foreground">{firstName}</span>
      {' · '}Target band {user.targetBand}
    </p>
  )
}
