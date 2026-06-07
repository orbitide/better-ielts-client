'use client'

import { useAuthStore } from '@/lib/store/auth-store'
import { useAuthHydration } from '@/hooks/use-auth-hydration'
import { AppShell } from './AppShell'
import { MarketingGuestShell } from './MarketingGuestShell'

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const hydrated = useAuthHydration()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (!hydrated) return null

  if (isAuthenticated) {
    return <AppShell>{children}</AppShell>
  }

  return <MarketingGuestShell>{children}</MarketingGuestShell>
}
