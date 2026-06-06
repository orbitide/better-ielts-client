'use client'

import { useEffect } from 'react'
import { useUIStore } from '@/lib/store/ui-store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUIStore((s) => s.theme)
  const setTheme = useUIStore((s) => s.setTheme)

  // On mount, resolve 'system' to the OS preference once and store it
  useEffect(() => {
    if (useUIStore.getState().theme === 'system') {
      setTheme(
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return <>{children}</>
}
