'use client'

import { useAuthStore } from '@/lib/store/auth-store'

export function useAuthHydration() {
  return useAuthStore((s) => s._hasHydrated)
}
