'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OnboardingData } from '@/lib/types/onboarding'

type OnboardingState = {
  completed: boolean
  data: Partial<OnboardingData>
  _hasHydrated: boolean
  setField: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void
  complete: () => void
  reset: () => void
  setHasHydrated: (has: boolean) => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      completed: false,
      data: {},
      _hasHydrated: false,
      setField: (key, value) =>
        set((state) => ({ data: { ...state.data, [key]: value } })),
      complete: () => set({ completed: true }),
      reset: () => set({ completed: false, data: {} }),
      setHasHydrated: (has) => set({ _hasHydrated: has }),
    }),
    {
      name: 'onboarding',
      partialize: (state) => ({ completed: state.completed, data: state.data }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
