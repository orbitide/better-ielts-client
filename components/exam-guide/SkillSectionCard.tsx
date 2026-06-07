import Link from 'next/link'
import { CheckCircle2, Lightbulb, Clock, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { skillColor } from '@/lib/utils/format'
import { buttonVariants } from '@/components/ui/button-variants'
import type { SkillSection } from '@/lib/types/exam-guide'

interface SkillSectionCardProps {
  section: SkillSection
}

export function SkillSectionCard({ section }: SkillSectionCardProps) {
  return (
    <div className="space-y-5">
      {/* Meta badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium', skillColor(section.skill))}>
          <Clock className="size-3" />
          {section.duration}
        </span>
        {section.totalQuestions > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-muted text-muted-foreground">
            <Hash className="size-3" />
            {section.totalQuestions} questions
          </span>
        )}
      </div>

      {/* Format */}
      <div>
        <p className="text-sm font-medium mb-1">Format</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{section.format}</p>
      </div>

      {/* Scoring */}
      <div>
        <p className="text-sm font-medium mb-1">Scoring</p>
        <p className="text-sm text-muted-foreground">{section.scoringMethod}</p>
      </div>

      {/* Question types */}
      <div>
        <p className="text-sm font-medium mb-2">Question Types</p>
        <ul className="space-y-2">
          {section.questionTypes.map((qt) => (
            <li key={qt.name} className="rounded-lg border bg-card p-3">
              <p className="text-sm font-medium">{qt.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{qt.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Tips */}
      <div>
        <p className="text-sm font-medium mb-2 flex items-center gap-1.5">
          <Lightbulb className="size-4 text-amber-500" />
          Tips
        </p>
        <ul className="space-y-1.5">
          {section.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-emerald-500" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Practice link (in-app only) */}
      {section.practiceHref && (
        <Link href={section.practiceHref} className={buttonVariants({ variant: 'outline' })}>
          Practice {section.label}
        </Link>
      )}
    </div>
  )
}
