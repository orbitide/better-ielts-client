import type { StudyPlan, StudyPlanDay, StudyTask, TaskCategory } from '@/lib/types/study-plan'

type GenerateParams = {
  targetBand: number
  weeklyGoalMinutes: number
  focusSkills: TaskCategory[]
  weekStartDate: string // Monday YYYY-MM-DD
}

type TaskTemplate = Omit<StudyTask, 'id' | 'scheduledDate' | 'status'>

const TASK_POOL: Record<TaskCategory, TaskTemplate[]> = {
  listening: [
    { title: 'Listening Practice — Sections 1 & 2', description: 'Focus on note completion and multiple choice questions.', category: 'listening', durationMinutes: 30, linkHref: '/listening/test-1' },
    { title: 'Listening Full Test — Sections 3 & 4', description: 'Practice academic lecture and seminar questions.', category: 'listening', durationMinutes: 40, linkHref: '/listening/test-1' },
    { title: 'Listening — Diagram & Map Labelling', description: 'Work on spatial and diagram-based question types.', category: 'listening', durationMinutes: 25, linkHref: '/listening/test-1' },
  ],
  reading: [
    { title: 'Reading Practice — True/False/Not Given', description: 'Practice TFNG questions from Academic Test 1.', category: 'reading', durationMinutes: 40, linkHref: '/reading/test-1' },
    { title: 'Reading Full Test — Timed 60 Minutes', description: 'Complete a full timed reading test under exam conditions.', category: 'reading', durationMinutes: 60, linkHref: '/reading/test-1' },
    { title: 'Reading Passage — Matching Headings', description: 'Focus on skimming and paragraph heading questions.', category: 'reading', durationMinutes: 30, linkHref: '/reading/test-1' },
    { title: 'Review Incorrect Reading Answers', description: 'Go through all missed questions and understand why.', category: 'reading', durationMinutes: 20, linkHref: '/reading/test-1' },
  ],
  writing: [
    { title: 'Writing Task 2 — Full Essay', description: 'Write a complete Task 2 essay in 40 minutes.', category: 'writing', durationMinutes: 50, linkHref: '/writing/task2-1' },
    { title: 'Writing Task 1 — Bar Chart Description', description: 'Describe the internet usage bar chart in 20 minutes.', category: 'writing', durationMinutes: 25, linkHref: '/writing/task1-1' },
    { title: 'Writing Task 2 — Draft Introduction', description: 'Write a strong introduction for a technology essay.', category: 'writing', durationMinutes: 15, linkHref: '/writing/task2-1' },
    { title: 'Grammar: Complex Sentences Review', description: 'Review subordinate clauses and relative clauses.', category: 'writing', durationMinutes: 20, linkHref: '/lesson/g1-l1' },
  ],
  speaking: [
    { title: 'Speaking Part 2 Practice', description: 'Record yourself on the Environment cue card.', category: 'speaking', durationMinutes: 30, linkHref: '/speaking/session-1' },
    { title: 'Speaking — Full Session (Parts 1–3)', description: 'Practice all three parts of the speaking test.', category: 'speaking', durationMinutes: 30, linkHref: '/speaking/session-2' },
    { title: 'Speaking Part 1 — Fluency Drills', description: 'Build fluency answering personal questions quickly.', category: 'speaking', durationMinutes: 20, linkHref: '/speaking/session-1' },
  ],
  vocabulary: [
    { title: 'Vocabulary: Environment (10 words)', description: 'Learn and practise 10 environment vocabulary words.', category: 'vocabulary', durationMinutes: 20, linkHref: '/vocabulary/environment' },
    { title: 'Vocabulary: Technology (10 words)', description: 'Learn 10 technology topic vocabulary words.', category: 'vocabulary', durationMinutes: 20, linkHref: '/vocabulary/technology' },
    { title: 'Vocabulary Quiz — Mixed Topics', description: 'Test your recall across all vocabulary studied this week.', category: 'vocabulary', durationMinutes: 15, linkHref: '/vocabulary/environment' },
  ],
  'mock-test': [
    { title: 'Full Mock Test — Academic Practice', description: 'Complete a full 2h45m mock test under exam conditions.', category: 'mock-test', durationMinutes: 165, linkHref: '/mock-test/full-1' },
  ],
}

function addDays(date: string, n: number): string {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

function pickTasks(
  focusSkills: TaskCategory[],
  targetMinutes: number,
  dayIndex: number
): TaskTemplate[] {
  const all: TaskCategory[] = ['listening', 'reading', 'writing', 'speaking', 'vocabulary']

  // Build ordered list: focused skills first, then the rest
  const nonFocus = all.filter((s) => !focusSkills.includes(s))
  const ordered = [...focusSkills.filter((s) => s !== 'mock-test'), ...nonFocus]

  const selected: TaskTemplate[] = []
  let minutes = 0

  // Rotate starting category by day index so each day feels different
  const rotated = [...ordered.slice(dayIndex % ordered.length), ...ordered.slice(0, dayIndex % ordered.length)]

  for (const cat of rotated) {
    if (minutes >= targetMinutes) break
    const pool = TASK_POOL[cat]
    // Pick a task from pool that fits remaining time (or the shortest if none fit)
    const remaining = targetMinutes - minutes
    const fits = pool.filter((t) => t.durationMinutes <= remaining)
    const task = fits.length > 0 ? fits[dayIndex % fits.length] : pool[pool.length - 1]
    selected.push(task)
    minutes += task.durationMinutes
  }

  return selected
}

export function generateStudyPlan({
  targetBand,
  weeklyGoalMinutes,
  focusSkills,
  weekStartDate,
}: GenerateParams): StudyPlan {
  // Distribute weeklyGoalMinutes: Mon–Fri get equal shares, Sat = lighter review, Sun = mock test or rest
  const hasMockTest = focusSkills.includes('mock-test') || weeklyGoalMinutes >= 420
  const sundayMinutes = hasMockTest ? 165 : 0
  const saturdayMinutes = Math.min(60, Math.round(weeklyGoalMinutes * 0.15))
  const weekdayTotal = weeklyGoalMinutes - sundayMinutes - saturdayMinutes
  const dailyMinutes = Math.max(30, Math.round(weekdayTotal / 5))

  const days: StudyPlanDay[] = []
  let taskCounter = 0

  function makeTask(template: TaskTemplate, date: string): StudyTask {
    taskCounter++
    return {
      ...template,
      id: `gen-task-${taskCounter}`,
      scheduledDate: date,
      status: 'pending',
    }
  }

  // Mon–Fri
  for (let i = 0; i < 5; i++) {
    const date = addDays(weekStartDate, i)
    const templates = pickTasks(focusSkills, dailyMinutes, i)
    const tasks = templates.map((t) => makeTask(t, date))
    days.push({
      date,
      tasks,
      totalMinutes: tasks.reduce((sum, t) => sum + t.durationMinutes, 0),
      completedMinutes: 0,
    })
  }

  // Saturday — review day
  const satDate = addDays(weekStartDate, 5)
  if (saturdayMinutes > 0) {
    const satTemplates = pickTasks(focusSkills, saturdayMinutes, 5)
    const satTasks = satTemplates.map((t) => makeTask(t, satDate))
    days.push({
      date: satDate,
      tasks: satTasks,
      totalMinutes: satTasks.reduce((sum, t) => sum + t.durationMinutes, 0),
      completedMinutes: 0,
    })
  } else {
    days.push({ date: satDate, tasks: [], totalMinutes: 0, completedMinutes: 0 })
  }

  // Sunday — mock test or rest
  const sunDate = addDays(weekStartDate, 6)
  if (hasMockTest) {
    const mockTemplate = TASK_POOL['mock-test'][0]
    const mockTask = makeTask(mockTemplate, sunDate)
    days.push({
      date: sunDate,
      tasks: [mockTask],
      totalMinutes: mockTask.durationMinutes,
      completedMinutes: 0,
    })
  } else {
    days.push({ date: sunDate, tasks: [], totalMinutes: 0, completedMinutes: 0 })
  }

  return {
    id: `plan-${Date.now()}`,
    userId: 'user-1',
    weekStartDate,
    targetBand,
    weeklyGoalMinutes,
    days,
  }
}

/** Returns the ISO date string for the most recent Monday */
export function currentWeekStartDate(): string {
  const today = new Date()
  const day = today.getDay() // 0=Sun, 1=Mon, …
  const diff = day === 0 ? -6 : 1 - day
  const monday = new Date(today)
  monday.setDate(today.getDate() + diff)
  return monday.toISOString().slice(0, 10)
}
