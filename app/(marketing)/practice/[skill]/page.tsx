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
}

export function generateStaticParams() {
  return PRACTICE_SKILLS.map((skill) => ({ skill }))
}

export async function generateMetadata({ params }: PageProps) {
  const { skill } = await params
  if (!isPracticeSkill(skill)) return { title: 'Practice' }
  const group = await getSkillPracticeGroup(skill)
  return { title: `${group?.label ?? skill} Practice` }
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
