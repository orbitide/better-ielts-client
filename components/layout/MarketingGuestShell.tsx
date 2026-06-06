import { PublicNav } from './PublicNav'
import { Footer } from './Footer'

export function MarketingGuestShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
