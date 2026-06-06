'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/lib/types/user'
import { mockUser } from '@/lib/mock/users'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: mockUser,
      isAuthenticated: true,
      login: () => set({ user: mockUser, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-session' }
  )
)
