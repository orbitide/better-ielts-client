'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/lib/types/user'
import {
  loginAction,
  registerAction,
  googleAuthAction,
  logoutAction,
  refreshAction,
} from '@/app/actions/auth'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  _hasHydrated: boolean
  loginWithEmail: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  loginWithGoogle: (idToken: string) => Promise<{ ok: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => Promise<void>
  refresh: () => Promise<boolean>
  setHasHydrated: (has: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      loginWithEmail: async (email, password) => {
        const result = await loginAction(email, password)
        if (result.ok) {
          set({ user: result.user, isAuthenticated: true })
          return { ok: true }
        }
        return { ok: false, error: result.error }
      },
      loginWithGoogle: async (idToken) => {
        const result = await googleAuthAction(idToken)
        if (result.ok) {
          set({ user: result.user, isAuthenticated: true })
          return { ok: true }
        }
        return { ok: false, error: result.error }
      },
      register: async (name, email, password) => {
        const result = await registerAction(name, email, password)
        if (result.ok) {
          set({ user: result.user, isAuthenticated: true })
          return { ok: true }
        }
        return { ok: false, error: result.error }
      },
      logout: async () => {
        await logoutAction()
        set({ user: null, isAuthenticated: false })
      },
      refresh: async () => {
        const ok = await refreshAction()
        if (!ok) set({ user: null, isAuthenticated: false })
        return ok
      },
      setHasHydrated: (has) => set({ _hasHydrated: has }),
    }),
    {
      name: 'auth-session',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
