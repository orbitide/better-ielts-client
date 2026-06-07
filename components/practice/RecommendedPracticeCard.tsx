import Link from 'next/link'
import { ArrowRight, BookMarked, Headphones, PenLine, Mic, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button-variants'
import type { PracticeRecommendation } from '@/lib/data/practice'
import { cn } from '@/lib/utils'

const skillIcons = {
  reading: BookMarked,
  listening: Headphones,
  writing: PenLine,
  speaking: Mic,
} as const

const skillAccents = {
  reading: { text: 'text-violet-600 dark:text-violet-400' },
  listening: { text: 'text-blue-600 dark:text-blue-400' },
  writing: { text: 'text-primary' },
  speaking: { text: 'text-pink-500 dark:text-pink-400' },
} as const

export function RecommendedPracticeCard({ recommendation }: { recommendation: PracticeRecommendation }) {
  const Icon = skillIcons[recommendation.skill]
  const accent = skillAccents[recommendation.skill]

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4 min-w-0">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted/60">
            <Icon className={cn('size-5', accent.text)} />
          </div>
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Sparkles className="size-2.5" />
                Recommended
              </span>
              <span className="text-xs font-medium text-muted-foreground">{recommendation.reason}</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {recommendation.label}
            </p>
            <h2 className="mt-0.5 text-lg font-bold tracking-tight text-foreground truncate">
              {recommendation.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {recommendation.description}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{recommendation.duration}</p>
          </div>
        </div>

        <Link
          href={recommendation.href}
          className={cn(buttonVariants({ size: 'lg' }), 'gap-2 shrink-0 w-full sm:w-auto')}
        >
          Start now
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  )
}

