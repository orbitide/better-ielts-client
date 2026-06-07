'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { StudyPlan, TaskStatus } from '@/lib/types/study-plan'

type StudyPlanStoreState = {
  plan: StudyPlan | null
  _hasHydrated: boolean
  setPlan: (plan: StudyPlan) => void
  updateTaskStatus: (taskId: string, status: TaskStatus) => void
  setHasHydrated: (v: boolean) => void
}

export const useStudyPlanStore = create<StudyPlanStoreState>()(
  persist(
    (set) => ({
      plan: null,
      _hasHydrated: false,
      setPlan: (plan) => set({ plan }),
      updateTaskStatus: (taskId, status) =>
        set((s) => {
          if (!s.plan) return s
          const updatedDays = s.plan.days.map((day) => {
            const updatedTasks = day.tasks.map((task) =>
              task.id === taskId ? { ...task, status } : task
            )
            const completedMinutes = updatedTasks
              .filter((t) => t.status === 'completed')
              .reduce((sum, t) => sum + t.durationMinutes, 0)
            return { ...day, tasks: updatedTasks, completedMinutes }
          })
          return { plan: { ...s.plan, days: updatedDays } }
        }),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'better-ielts-study-plan',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ plan: state.plan }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
