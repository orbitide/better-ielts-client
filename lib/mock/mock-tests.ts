import type { MockTest } from '@/lib/types/mock-test'

export const mockTests: MockTest[] = [
  {
    id: 'full-1',
    title: 'Full Academic IELTS Practice Test 1',
    description: 'A complete IELTS Academic test simulation covering all four skills: Listening, Reading, Writing, and Speaking. Designed to replicate exam conditions.',
    type: 'academic',
    durationMinutes: 165,
    difficulty: 'intermediate',
    sections: [
      { id: 'full1-s1', skill: 'listening', orderIndex: 1, durationMinutes: 40, testId: 'test-1' },
      { id: 'full1-s2', skill: 'reading', orderIndex: 2, durationMinutes: 60, testId: 'test-1' },
      { id: 'full1-s3', skill: 'writing', orderIndex: 3, durationMinutes: 60, testId: 'task1-1' },
      { id: 'full1-s4', skill: 'speaking', orderIndex: 4, durationMinutes: 15, testId: 'session-1' },
    ],
  },
  {
    id: 'full-2',
    title: 'Full Academic IELTS Practice Test 2',
    description: 'A second full-length IELTS Academic practice test with fresh content. Ideal for tracking your improvement over time.',
    type: 'academic',
    durationMinutes: 165,
    difficulty: 'advanced',
    sections: [
      { id: 'full2-s1', skill: 'listening', orderIndex: 1, durationMinutes: 40, testId: 'test-1' },
      { id: 'full2-s2', skill: 'reading', orderIndex: 2, durationMinutes: 60, testId: 'test-1' },
      { id: 'full2-s3', skill: 'writing', orderIndex: 3, durationMinutes: 60, testId: 'task2-2' },
      { id: 'full2-s4', skill: 'speaking', orderIndex: 4, durationMinutes: 15, testId: 'session-2' },
    ],
  },
]
