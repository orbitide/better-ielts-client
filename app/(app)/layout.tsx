import { AppLayoutRouter } from '@/components/layout/AppLayoutRouter'
import { AuthGate } from '@/components/layout/AuthGate'
import { PresenceTracker } from '@/components/layout/PresenceTracker'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <PresenceTracker />
      <AppLayoutRouter>{children}</AppLayoutRouter>
    </AuthGate>
  )
}
