'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/lib/types/user'
import { mockUser } from '@/lib/mock/users'
import { DUMMY_CREDENTIALS } from '@/lib/auth/dummy-credentials'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  loginWithEmail: (email: string, password: string) => boolean
  loginWithGoogle: () => void
  register: (name: string, email: string, password: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loginWithEmail: (email, password) => {
        if (
          email === DUMMY_CREDENTIALS.email &&
          password === DUMMY_CREDENTIALS.password
        ) {
          set({ user: mockUser, isAuthenticated: true })
          return true
        }
        return false
      },
      loginWithGoogle: () => set({ user: mockUser, isAuthenticated: true }),
      register: (name, email) => {
        set({
          user: { ...mockUser, name, email },
          isAuthenticated: true,
        })
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-session' }
  )
)
