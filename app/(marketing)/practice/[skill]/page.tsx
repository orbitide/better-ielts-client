import { notFound } from 'next/navigation'
import {
  PRACTICE_SKILLS,
  getSkillPracticeGroup,
  getSkillPracticeRecommendation,
  isPracticeSkill,
} from '@/lib/data/practice'
import { SkillPracticeHub } from '@/components/practice/SkillPracticeHub'

export const revalidate = 60

type PageProps = {
  params: Promise<{ skill: string }>
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

export default async function SkillPracticePage({ params }: PageProps) {
  const { skill } = await params

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

  return <SkillPracticeHub group={group} recommendation={recommendation} />
}
