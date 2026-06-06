'use client'

import { create } from 'zustand'

type TestState = {
  activeTestId: string | null
  answers: Record<string, string>
  timeRemainingSeconds: number
  isRunning: boolean
  setAnswer: (questionId: string, answer: string) => void
  startTest: (testId: string, durationSeconds: number) => void
  stopTest: () => void
  tickTimer: () => void
  resetTest: () => void
}

export const useTestStore = create<TestState>((set) => ({
  activeTestId: null,
  answers: {},
  timeRemainingSeconds: 0,
  isRunning: false,
  setAnswer: (questionId, answer) =>
    set((s) => ({ answers: { ...s.answers, [questionId]: answer } })),
  startTest: (testId, durationSeconds) =>
    set({ activeTestId: testId, timeRemainingSeconds: durationSeconds, isRunning: true, answers: {} }),
  stopTest: () => set({ isRunning: false }),
  tickTimer: () =>
    set((s) => ({
      timeRemainingSeconds: Math.max(0, s.timeRemainingSeconds - 1),
      isRunning: s.timeRemainingSeconds > 1,
    })),
  resetTest: () =>
    set({ activeTestId: null, answers: {}, timeRemainingSeconds: 0, isRunning: false }),
}))
