'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/store/auth-store'

export function AuthBootstrap() {
  useEffect(() => {
    useAuthStore.getState().bootstrap()
  }, [])

  return null
}
