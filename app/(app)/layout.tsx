import { AppLayoutRouter } from '@/components/layout/AppLayoutRouter'
import { AuthGate } from '@/components/layout/AuthGate'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <AppLayoutRouter>{children}</AppLayoutRouter>
    </AuthGate>
  )
}
