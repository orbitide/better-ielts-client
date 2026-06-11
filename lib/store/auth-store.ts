'use client'

import { create } from 'zustand'
import type { User } from '@/lib/types/user'
import {
  loginAction,
  registerAction,
  googleAuthAction,
  logoutAction,
  refreshAction,
  meAction,
} from '@/app/actions/auth'
import { fetchOnboardingProfile } from '@/lib/api/onboarding'
import { useOnboardingStore } from '@/lib/store/onboarding-store'

async function syncOnboardingStatus() {
  const profile = await fetchOnboardingProfile()
  useOnboardingStore.getState().setFromServer(profile)
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  _hasHydrated: boolean
  bootstrap: () => Promise<void>
  loginWithEmail: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  loginWithGoogle: (idToken: string) => Promise<{ ok: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => Promise<void>
  refresh: () => Promise<boolean>
  setHasHydrated: (has: boolean) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  _hasHydrated: false,
  bootstrap: async () => {
    const result = await meAction()
    if (result.ok) {
      set({ user: result.user, isAuthenticated: true, _hasHydrated: true })
      await syncOnboardingStatus()
    } else {
      set({ user: null, isAuthenticated: false, _hasHydrated: true })
    }
  },
  loginWithEmail: async (email, password) => {
    const result = await loginAction(email, password)
    if (result.ok) {
      set({ user: result.user, isAuthenticated: true })
      await syncOnboardingStatus()
      return { ok: true }
    }
    return { ok: false, error: result.error }
  },
  loginWithGoogle: async (idToken) => {
    const result = await googleAuthAction(idToken)
    if (result.ok) {
      set({ user: result.user, isAuthenticated: true })
      await syncOnboardingStatus()
      return { ok: true }
    }
    return { ok: false, error: result.error }
  },
  register: async (name, email, password) => {
    const result = await registerAction(name, email, password)
    if (result.ok) {
      set({ user: result.user, isAuthenticated: true })
      await syncOnboardingStatus()
      return { ok: true }
    }
    return { ok: false, error: result.error }
  },
  logout: async () => {
    await logoutAction()
    set({ user: null, isAuthenticated: false })
    useOnboardingStore.getState().reset()
  },
  refresh: async () => {
    const ok = await refreshAction()
    if (!ok) set({ user: null, isAuthenticated: false })
    return ok
  },
  setHasHydrated: (has) => set({ _hasHydrated: has }),
}))
