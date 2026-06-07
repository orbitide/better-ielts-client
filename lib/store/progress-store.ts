'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ProgressState = {
  completedIds: string[]
  _hasHydrated: boolean
  markCompleted: (id: string) => void
  setHasHydrated: (v: boolean) => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedIds: [],
      _hasHydrated: false,
      markCompleted: (id) =>
        set((s) => ({
          completedIds: s.completedIds.includes(id) ? s.completedIds : [...s.completedIds, id],
        })),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'better-ielts-progress',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ completedIds: state.completedIds }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
