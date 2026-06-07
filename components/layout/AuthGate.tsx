'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'
import { useOnboardingStore } from '@/lib/store/onboarding-store'

export function AuthGate({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const authHydrated = useAuthStore((s) => s._hasHydrated)
  const onboardingCompleted = useOnboardingStore((s) => s.completed)
  const onboardingHydrated = useOnboardingStore((s) => s._hasHydrated)
  const router = useRouter()
  const pathname = usePathname()

  const storesReady = authHydrated && onboardingHydrated

  useEffect(() => {
    if (!storesReady) return
    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`)
    } else if (!onboardingCompleted) {
      router.replace('/onboarding')
    }
  }, [storesReady, isAuthenticated, onboardingCompleted, router, pathname])

  if (!storesReady || !isAuthenticated || !onboardingCompleted) return null
  return <>{children}</>
}
