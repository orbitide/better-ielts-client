import { connection } from 'next/server'
import { AppLayoutRouter } from '@/components/layout/AppLayoutRouter'
import { AuthGate } from '@/components/layout/AuthGate'
import { PresenceTracker } from '@/components/layout/PresenceTracker'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await connection()

  return (
    <AuthGate>
      <PresenceTracker />
      <AppLayoutRouter>{children}</AppLayoutRouter>
    </AuthGate>
  )
}
