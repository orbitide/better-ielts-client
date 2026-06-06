import type { StudyPlan } from '@/lib/types/study-plan'

export const mockStudyPlan: StudyPlan = {
  id: 'plan-1',
  userId: 'user-1',
  weekStartDate: '2026-06-02',
  targetBand: 7.5,
  weeklyGoalMinutes: 420,
  days: [
    {
      date: '2026-06-02',
      totalMinutes: 60,
      completedMinutes: 60,
      tasks: [
        { id: 'task-mon-1', title: 'Listening Practice Test — Section 1 & 2', description: 'Focus on note completion and multiple choice.', category: 'listening', durationMinutes: 30, status: 'completed', linkHref: '/listening/test-1', scheduledDate: '2026-06-02' },
        { id: 'task-mon-2', title: 'Vocabulary: Environment (10 words)', description: 'Learn and practice 10 environment vocabulary words.', category: 'vocabulary', durationMinutes: 20, status: 'completed', linkHref: '/vocabulary/environment', scheduledDate: '2026-06-02' },
        { id: 'task-mon-3', title: 'Writing Task 2 — Draft Introduction', description: 'Write a strong introduction for a technology essay.', category: 'writing', durationMinutes: 10, status: 'completed', linkHref: '/writing/task2-1', scheduledDate: '2026-06-02' },
      ],
    },
    {
      date: '2026-06-03',
      totalMinutes: 70,
      completedMinutes: 70,
      tasks: [
        { id: 'task-tue-1', title: 'Reading Practice — True/False/Not Given', description: 'Practice TFNG questions from Academic Test 1.', category: 'reading', durationMinutes: 40, status: 'completed', linkHref: '/reading/test-1', scheduledDate: '2026-06-03' },
        { id: 'task-tue-2', title: 'Speaking Part 2 Practice', description: 'Record yourself on the Environment cue card.', category: 'speaking', durationMinutes: 30, status: 'completed', linkHref: '/speaking/session-1', scheduledDate: '2026-06-03' },
      ],
    },
    {
      date: '2026-06-04',
      totalMinutes: 60,
      completedMinutes: 60,
      tasks: [
        { id: 'task-wed-1', title: 'Listening Full Test — Sections 3 & 4', description: 'Practice academic lecture and seminar questions.', category: 'listening', durationMinutes: 40, status: 'completed', linkHref: '/listening/test-1', scheduledDate: '2026-06-04' },
        { id: 'task-wed-2', title: 'Grammar: Complex Sentences Review', description: 'Review subordinate clauses and relative clauses.', category: 'writing', durationMinutes: 20, status: 'completed', linkHref: '/lesson/g1-l1', scheduledDate: '2026-06-04' },
      ],
    },
    {
      date: '2026-06-05',
      totalMinutes: 90,
      completedMinutes: 90,
      tasks: [
        { id: 'task-thu-1', title: 'Full Writing Session — Task 2 Essay', description: 'Write a complete Task 2 essay in 40 minutes.', category: 'writing', durationMinutes: 50, status: 'completed', linkHref: '/writing/task2-1', scheduledDate: '2026-06-05' },
        { id: 'task-thu-2', title: 'Vocabulary: Technology (10 words)', description: 'Learn 10 technology topic vocabulary words.', category: 'vocabulary', durationMinutes: 20, status: 'completed', linkHref: '/vocabulary/technology', scheduledDate: '2026-06-05' },
        { id: 'task-thu-3', title: 'Reading Passage 2 — Timed Practice', description: 'Complete passage 2 from Academic Test 1 in 20 minutes.', category: 'reading', durationMinutes: 20, status: 'completed', linkHref: '/reading/test-1', scheduledDate: '2026-06-05' },
      ],
    },
    {
      date: '2026-06-06',
      totalMinutes: 60,
      completedMinutes: 32,
      tasks: [
        { id: 'task-fri-1', title: 'Reading Full Test — 60 minutes', description: 'Complete a timed full reading test.', category: 'reading', durationMinutes: 60, status: 'completed', linkHref: '/reading/test-1', scheduledDate: '2026-06-06' },
      ],
    },
    {
      date: '2026-06-07',
      totalMinutes: 90,
      completedMinutes: 0,
      tasks: [
        { id: 'task-sat-1', title: 'Speaking Practice — Full Session', description: 'Practice all three parts of the speaking test.', category: 'speaking', durationMinutes: 30, status: 'pending', linkHref: '/speaking/session-2', scheduledDate: '2026-06-07' },
        { id: 'task-sat-2', title: 'Writing Task 1 — Bar Chart', description: 'Describe the internet usage bar chart in 20 minutes.', category: 'writing', durationMinutes: 25, status: 'pending', linkHref: '/writing/task1-1', scheduledDate: '2026-06-07' },
        { id: 'task-sat-3', title: 'Vocabulary Quiz — Environment & Technology', description: 'Test your recall of this week\'s vocabulary.', category: 'vocabulary', durationMinutes: 20, status: 'pending', linkHref: '/vocabulary/environment', scheduledDate: '2026-06-07' },
        { id: 'task-sat-4', title: 'Review incorrect answers from Reading Test', description: 'Go through all missed questions and understand why.', category: 'reading', durationMinutes: 15, status: 'pending', linkHref: '/reading/test-1', scheduledDate: '2026-06-07' },
      ],
    },
    {
      date: '2026-06-08',
      totalMinutes: 165,
      completedMinutes: 0,
      tasks: [
        { id: 'task-sun-1', title: 'Full Mock Test — Academic Practice 1', description: 'Complete the full 2h45m mock test under exam conditions.', category: 'mock-test', durationMinutes: 165, status: 'pending', linkHref: '/mock-test/full-1', scheduledDate: '2026-06-08' },
      ],
    },
  ],
}
