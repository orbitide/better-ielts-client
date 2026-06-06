import Link from 'next/link'
import { ChevronRight, BookMarked, Headphones, PenLine, Mic } from 'lucide-react'
import type { PracticeRecommendation, PracticeSkillGroup } from '@/lib/data/practice'
import { RecommendedPracticeCard } from './RecommendedPracticeCard'
import { PracticeTestList } from './PracticeTestList'
import { PracticeGreeting } from './PracticeGreeting'

const skillIcons = {
  reading: BookMarked,
  listening: Headphones,
  writing: PenLine,
  speaking: Mic,
} as const

export function SkillPracticeHub({
  group,
  recommendation,
}: {
  group: PracticeSkillGroup
  recommendation: PracticeRecommendation
}) {
  const Icon = skillIcons[group.skill]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/practice" className="hover:text-foreground transition-colors">
            Practice
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground font-medium">{group.label}</span>
        </nav>

        <PracticeGreeting />

        {/* Header */}
        <div className="mb-8 mt-2 flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted/60 ring-1 ring-foreground/5">
            <Icon className={group.color} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{group.label} Practice</h1>
            <p className="mt-2 text-muted-foreground text-lg leading-relaxed">{group.description}</p>
          </div>
        </div>

        {/* Recommended */}
        <div className="mb-8">
          <RecommendedPracticeCard recommendation={recommendation} />
        </div>

        {/* All tests */}
        <div>
          <h2 className="text-lg font-semibold tracking-tight mb-4">
            All {group.label.toLowerCase()} tests
          </h2>
          <PracticeTestList
            tests={group.tests}
            recommendedHref={recommendation.href}
            color={group.color}
          />
        </div>
      </div>
    </div>
  )
}
