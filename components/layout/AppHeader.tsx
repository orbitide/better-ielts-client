import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { MobileNav } from './MobileNav'
import { ProfileMenu } from './ProfileMenu'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b bg-background/80 backdrop-blur-sm px-4 lg:px-6 shrink-0">
      {/* Mobile menu trigger */}
      <MobileNav />

      {/* Search */}
      <div className="flex-1 max-w-sm hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search lessons, tests..."
            className="w-full rounded-lg border bg-muted/50 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            readOnly
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <ProfileMenu />
      </div>
    </header>
  )
}
