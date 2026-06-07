'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OnboardingData } from '@/lib/types/onboarding'

type OnboardingState = {
  completed: boolean
  data: Partial<OnboardingData>
  setField: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void
  complete: () => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      completed: false,
      data: {},
      setField: (key, value) =>
        set((state) => ({ data: { ...state.data, [key]: value } })),
      complete: () => set({ completed: true }),
      reset: () => set({ completed: false, data: {} }),
    }),
    { name: 'onboarding' }
  )
)
