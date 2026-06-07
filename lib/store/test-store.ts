'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type TestState = {
  activeTestId: string | null
  answers: Record<string, string>
  timeRemainingSeconds: number
  isRunning: boolean
  isSubmitted: boolean
  _hasHydrated: boolean
  setAnswer: (questionId: string, answer: string) => void
  startTest: (testId: string, durationSeconds: number) => void
  submitTest: () => void
  stopTest: () => void
  tickTimer: () => void
  resetTest: () => void
  setHasHydrated: (v: boolean) => void
}

export const useTestStore = create<TestState>()(
  persist(
    (set) => ({
      activeTestId: null,
      answers: {},
      timeRemainingSeconds: 0,
      isRunning: false,
      isSubmitted: false,
      _hasHydrated: false,
      setAnswer: (questionId, answer) =>
        set((s) => ({ answers: { ...s.answers, [questionId]: answer } })),
      startTest: (testId, durationSeconds) =>
        set({ activeTestId: testId, timeRemainingSeconds: durationSeconds, isRunning: true, answers: {}, isSubmitted: false }),
      submitTest: () => set({ isRunning: false, isSubmitted: true }),
      stopTest: () => set({ isRunning: false }),
      tickTimer: () =>
        set((s) => ({
          timeRemainingSeconds: Math.max(0, s.timeRemainingSeconds - 1),
          isRunning: s.timeRemainingSeconds > 1,
        })),
      resetTest: () =>
        set({ activeTestId: null, answers: {}, timeRemainingSeconds: 0, isRunning: false, isSubmitted: false }),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'better-ielts-test',
      storage: createJSONStorage(() => localStorage),
      // don't persist transient hydration flag
      partialize: (state) => ({
        activeTestId: state.activeTestId,
        answers: state.answers,
        timeRemainingSeconds: state.timeRemainingSeconds,
        isRunning: state.isRunning,
        isSubmitted: state.isSubmitted,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
