'use client'

import { Sun, Moon } from 'lucide-react'
import { useUIStore } from '@/lib/store/ui-store'
import { buttonVariants } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useUIStore()

  return (
    <button
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  )
}
