'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { MobileNav } from './MobileNav'
import { ProfileMenu } from './ProfileMenu'
import { SearchDialog } from './SearchDialog'

export function AppHeader() {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b bg-background/80 backdrop-blur-sm px-4 lg:px-6 shrink-0">
      {/* Mobile menu trigger */}
      <MobileNav />

      {/* Search trigger */}
      <div className="flex-1 max-w-sm hidden sm:block">
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="relative w-full flex items-center rounded-lg border bg-muted/50 pl-9 pr-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors text-left cursor-text"
          aria-label="Open search"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
          <span className="flex-1">Search lessons, tests...</span>
          <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border bg-background px-1.5 text-[10px] font-medium ml-2">
            Ctrl K
          </kbd>
        </button>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <ProfileMenu />
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
