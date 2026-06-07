'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'
import { useOnboardingStore } from '@/lib/store/onboarding-store'

export function AuthGate({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const onboardingCompleted = useOnboardingStore((s) => s.completed)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/')
    } else if (!onboardingCompleted) {
      router.replace('/onboarding')
    }
  }, [isAuthenticated, onboardingCompleted, router])

  if (!isAuthenticated || !onboardingCompleted) return null
  return <>{children}</>
}
