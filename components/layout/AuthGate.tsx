'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'
import { useOnboardingStore } from '@/lib/store/onboarding-store'

export function AuthGate({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const onboardingCompleted = useOnboardingStore((s) => s.completed)
  const router = useRouter()
  const pathname = usePathname()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`)
    } else if (!onboardingCompleted) {
      router.replace('/onboarding')
    }
  }, [hydrated, isAuthenticated, onboardingCompleted, router, pathname])

  if (!hydrated || !isAuthenticated || !onboardingCompleted) return null
  return <>{children}</>
}
