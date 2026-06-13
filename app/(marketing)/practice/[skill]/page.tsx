import { notFound } from 'next/navigation'
import {
  PRACTICE_SKILLS,
  getSkillPracticeGroup,
  getSkillPracticeRecommendation,
  isPracticeSkill,
} from '@/lib/data/practice'
import { SkillPracticeHub } from '@/components/practice/SkillPracticeHub'

type PageProps = {
  params: Promise<{ skill: string }>
  searchParams: Promise<{ type?: string }>
}

export function generateStaticParams() {
  return PRACTICE_SKILLS.map((skill) => ({ skill }))
}

export async function generateMetadata({ params }: PageProps) {
  const { skill } = await params
  if (!isPracticeSkill(skill)) return { title: 'Practice' }
  const group = await getSkillPracticeGroup(skill)
  const label = group?.label ?? skill
  return {
    title: `${label} Practice`,
    description: `Practise IELTS ${label} with authentic test-style questions and detailed answer explanations. Build your skills and improve your band score.`,
  }
}

export default async function SkillPracticePage({ params, searchParams }: PageProps) {
  const { skill } = await params
  const { type } = await searchParams

  if (!isPracticeSkill(skill)) {
    notFound()
  }

  const [group, recommendation] = await Promise.all([
    getSkillPracticeGroup(skill),
    getSkillPracticeRecommendation(skill),
  ])

  if (!group) {
    notFound()
  }

  const initialTaskType = type === 'task1' || type === 'task2' ? type : undefined

  return <SkillPracticeHub group={group} recommendation={recommendation} initialTaskType={initialTaskType} />
}
