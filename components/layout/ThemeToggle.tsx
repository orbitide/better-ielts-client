'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { useUIStore, type Theme } from '@/lib/store/ui-store'
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { theme, setTheme } = useUIStore()

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
    { value: 'system', label: 'System', icon: <Monitor className="h-4 w-4" /> },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4 scale-100 dark:scale-0 transition-transform" />
        <Moon className="absolute h-4 w-4 scale-0 dark:scale-100 transition-transform" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={theme === opt.value ? 'bg-accent' : ''}
          >
            {opt.icon}
            <span className="ml-2">{opt.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
