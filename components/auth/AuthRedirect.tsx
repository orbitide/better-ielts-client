'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'

export function AuthRedirect({ to = '/dashboard' }: { to?: string }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const router = useRouter()
  const searchParams = useSearchParams()
  const target = searchParams.get('redirect') ?? to

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(target)
    }
  }, [isAuthenticated, router, target])

  return null
}
