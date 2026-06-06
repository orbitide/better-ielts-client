import { AppSidebar } from '@/components/layout/AppSidebar'
import { AppHeader } from '@/components/layout/AppHeader'
import { AppFooter } from '@/components/layout/AppFooter'
import { AuthGate } from '@/components/layout/AuthGate'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar — hidden on mobile, visible lg+ */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:shrink-0 border-r bg-sidebar">
          <AppSidebar />
        </div>

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          <AppFooter />
        </div>
      </div>
    </AuthGate>
  )
}
