import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { getCurrentUser } from '@/lib/data/users'
import { getStudyPlan } from '@/lib/data/study-plan'
import { getAllReadingTests } from '@/lib/data/reading'
import { getAllListeningTests } from '@/lib/data/listening'
import { getAllWritingTasks } from '@/lib/data/writing'
import { getAllSpeakingSessions } from '@/lib/data/speaking'
import type { BandScore } from '@/lib/types/user'

export type PracticeSkill = 'reading' | 'listening' | 'writing' | 'speaking'

export const PRACTICE_SKILLS: PracticeSkill[] = ['reading', 'listening', 'writing', 'speaking']

export function isPracticeSkill(value: string): value is PracticeSkill {
  return PRACTICE_SKILLS.includes(value as PracticeSkill)
}

export type PracticeTestSeries = {
  id: string
  label: string
}

export type PracticeTestItem = {
  id: string
  title: string
  href: string
  duration: string
  meta?: string
  series?: PracticeTestSeries
}

export type PracticeSkillGroup = {
  skill: PracticeSkill
  label: string
  description: string
  href: string
  tests: PracticeTestItem[]
  accent: string
  accentSoft: string
  color: string
}

export type PracticeRecommendation = {
  skill: PracticeSkill
  label: string
  title: string
  description: string
  reason: string
  href: string
  duration: string
  bandGap?: number
}

const skillLabels: Record<PracticeSkill, string> = {
  reading: 'Reading',
  listening: 'Listening',
  writing: 'Writing',
  speaking: 'Speaking',
}

function formatWritingMeta(type: string, timeMinutes: number) {
  return `${type === 'task1' ? 'Task 1' : 'Task 2'} · ${timeMinutes} min`
}

function findWeakestSkill(bands: BandScore, target: number): PracticeSkill {
  const skills: PracticeSkill[] = ['listening', 'reading', 'writing', 'speaking']
  return skills.reduce((weakest, skill) => {
    const gap = target - bands[skill]
    const weakestGap = target - bands[weakest]
    return gap > weakestGap ? skill : weakest
  })
}

const practiceSeriesMap: Record<string, PracticeTestSeries> = {
  'set-1': { id: 'set-1', label: 'Practice Set 1' },
  'set-2': { id: 'set-2', label: 'Practice Set 2' },
}

const readingSeriesById: Record<string, string> = {
  'test-1': 'set-1',
  'test-2': 'set-1',
  'test-3': 'set-2',
}

const listeningSeriesById: Record<string, string> = {
  'test-1': 'set-1',
}

const writingSeriesById: Record<string, string> = {
  'task1-1': 'set-1',
  'task2-1': 'set-1',
  'task1-2': 'set-1',
  'task2-2': 'set-1',
  'task1-3': 'set-2',
  'task2-3': 'set-2',
  'task2-4': 'set-2',
}

const speakingSeriesById: Record<string, string> = {
  'session-1': 'set-1',
  'session-2': 'set-1',
  'session-3': 'set-2',
}

export const getPracticeCatalog = cache(async (): Promise<PracticeSkillGroup[]> => {
  await delay(100)
  const [reading, listening, writing, speaking] = await Promise.all([
    getAllReadingTests(),
    getAllListeningTests(),
    getAllWritingTasks(),
    getAllSpeakingSessions(),
  ])

  return [
    {
      skill: 'reading',
      label: 'Reading',
      description: 'Academic and General Training passages with all question types.',
      href: '/practice/reading',
      accent: 'bg-violet-500',
      accentSoft: 'from-violet-500/8',
      color: 'text-violet-600 dark:text-violet-400',
      tests: reading.map((t) => ({
        id: t.id,
        title: t.title,
        href: `/reading/${t.id}`,
        duration: `${t.durationMinutes} min`,
        meta: `${t.sections.length} passages · ${t.sections.reduce((n, s) => n + s.questions.length, 0)} questions`,
        series: practiceSeriesMap[readingSeriesById[t.id]],
      })),
    },
    {
      skill: 'listening',
      label: 'Listening',
      description: 'Four-section audio tests with transcripts and answer keys.',
      href: '/practice/listening',
      accent: 'bg-blue-500',
      accentSoft: 'from-blue-500/8',
      color: 'text-blue-600 dark:text-blue-400',
      tests: listening.map((t) => ({
        id: t.id,
        title: t.title,
        href: `/listening/${t.id}`,
        duration: `${t.durationMinutes} min`,
        meta: `${t.sections.length} sections · 40 questions`,
        series: practiceSeriesMap[listeningSeriesById[t.id]],
      })),
    },
    {
      skill: 'writing',
      label: 'Writing',
      description: 'Task 1 and Task 2 prompts with sample Band 9 answers.',
      href: '/practice/writing',
      accent: 'bg-primary',
      accentSoft: 'from-primary/10',
      color: 'text-primary',
      tests: writing.map((t) => ({
        id: t.id,
        title: t.title,
        href: `/writing/${t.id}`,
        duration: `${t.timeMinutes} min`,
        meta: formatWritingMeta(t.type, t.timeMinutes),
        series: practiceSeriesMap[writingSeriesById[t.id]],
      })),
    },
    {
      skill: 'speaking',
      label: 'Speaking',
      description: 'Parts 1–3 sessions with cue cards and model answers.',
      href: '/practice/speaking',
      accent: 'bg-pink-500',
      accentSoft: 'from-pink-500/8',
      color: 'text-pink-600 dark:text-pink-400',
      tests: speaking.map((s) => ({
        id: s.id,
        title: s.title,
        href: `/speaking/${s.id}`,
        duration: '11–14 min',
        meta: `${s.parts.length} parts`,
        series: practiceSeriesMap[speakingSeriesById[s.id]],
      })),
    },
  ]
})

export const getSkillPracticeGroup = cache(async (skill: PracticeSkill): Promise<PracticeSkillGroup | null> => {
  const catalog = await getPracticeCatalog()
  return catalog.find((g) => g.skill === skill) ?? null
})

export const getSkillPracticeRecommendation = cache(async (skill: PracticeSkill): Promise<PracticeRecommendation> => {
  const [user, plan, group] = await Promise.all([
    getCurrentUser(),
    getStudyPlan('user-1'),
    getSkillPracticeGroup(skill),
  ])

  if (!group) {
    throw new Error(`Unknown practice skill: ${skill}`)
  }

  const pendingTask = plan.days
    .flatMap((d) => d.tasks)
    .find((t) => t.status === 'pending' && t.category === skill)

  if (pendingTask) {
    return {
      skill,
      label: skillLabels[skill],
      title: pendingTask.title,
      description: pendingTask.description,
      reason: 'Next on your study plan',
      href: pendingTask.linkHref,
      duration: `${pendingTask.durationMinutes} min`,
    }
  }

  const bandGap = user.targetBand - user.currentBand[skill]
  if (bandGap > 0) {
    const recommendedTest = group.tests[0]
    return {
      skill,
      label: skillLabels[skill],
      title: recommendedTest.title,
      description: `Your ${skill} band is ${user.currentBand[skill]} — practise here to reach your ${user.targetBand} target.`,
      reason: bandGap >= 0.5 ? 'Focus area for your target band' : 'Keep building momentum',
      href: recommendedTest.href,
      duration: recommendedTest.duration,
      bandGap,
    }
  }

  const recommendedTest = group.tests[0]
  return {
    skill,
    label: skillLabels[skill],
    title: recommendedTest.title,
    description: group.description,
    reason: 'Start here',
    href: recommendedTest.href,
    duration: recommendedTest.duration,
  }
})

export const getPracticeRecommendation = cache(async (): Promise<PracticeRecommendation> => {
  const [user, plan, catalog] = await Promise.all([
    getCurrentUser(),
    getStudyPlan('user-1'),
    getPracticeCatalog(),
  ])

  const skillCategories = new Set<PracticeSkill>(['reading', 'listening', 'writing', 'speaking'])

  const pendingTask = plan.days
    .flatMap((d) => d.tasks)
    .find((t) => t.status === 'pending' && skillCategories.has(t.category as PracticeSkill))

  if (pendingTask && skillCategories.has(pendingTask.category as PracticeSkill)) {
    const skill = pendingTask.category as PracticeSkill
    const group = catalog.find((g) => g.skill === skill)!
    const matchedTest = group.tests.find((t) => pendingTask.linkHref.includes(t.id))

    return {
      skill,
      label: skillLabels[skill],
      title: pendingTask.title,
      description: pendingTask.description,
      reason: 'Next on your study plan',
      href: pendingTask.linkHref,
      duration: `${pendingTask.durationMinutes} min`,
    }
  }

  const weakest = findWeakestSkill(user.currentBand, user.targetBand)
  const group = catalog.find((g) => g.skill === weakest)!
  const recommendedTest = group.tests[0]
  const bandGap = user.targetBand - user.currentBand[weakest]

  return {
    skill: weakest,
    label: skillLabels[weakest],
    title: recommendedTest.title,
    description: `Focus here to close your ${bandGap.toFixed(1)}-band gap toward your ${user.targetBand} target.`,
    reason: 'Your weakest skill',
    href: recommendedTest.href,
    duration: recommendedTest.duration,
    bandGap,
  }
})
