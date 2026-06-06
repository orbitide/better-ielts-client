'use client'

import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react'
import { useAuthStore } from '@/lib/store/auth-store'
import { useAuthHydration } from '@/hooks/use-auth-hydration'
import { ProfileMenu } from './ProfileMenu'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

export function PublicNavActions() {
  const hydrated = useAuthHydration()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (!hydrated) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-16 rounded-lg bg-muted animate-pulse hidden sm:block" />
        <div className="h-8 w-24 rounded-lg bg-muted animate-pulse" />
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'hidden sm:flex gap-1.5')}
        >
          <LayoutDashboard className="size-4" />
          Dashboard
        </Link>
        <ProfileMenu />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/login" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'hidden sm:flex')}>
        Sign In
      </Link>
      <Link href="/register" className={buttonVariants({ size: 'sm' })}>
        Get Started
      </Link>
    </div>
  )
}
