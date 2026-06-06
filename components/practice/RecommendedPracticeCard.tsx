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
  reading: { accent: 'bg-violet-500', soft: 'from-violet-500/10', iconBg: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400' },
  listening: { accent: 'bg-blue-500', soft: 'from-blue-500/10', iconBg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
  writing: { accent: 'bg-primary', soft: 'from-primary/12', iconBg: 'bg-primary/10', text: 'text-primary' },
  speaking: { accent: 'bg-pink-500', soft: 'from-pink-500/10', iconBg: 'bg-pink-500/10', text: 'text-pink-600 dark:text-pink-400' },
} as const

export function RecommendedPracticeCard({ recommendation }: { recommendation: PracticeRecommendation }) {
  const Icon = skillIcons[recommendation.skill]
  const accent = skillAccents[recommendation.skill]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-sm ring-1 ring-primary/10">
      <div className={cn('pointer-events-none absolute inset-0 bg-gradient-to-r to-transparent', accent.soft)} />
      <div className={cn('absolute left-0 top-0 bottom-0 w-1', accent.accent)} />

      <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4 min-w-0">
          <div className={cn('flex size-12 shrink-0 items-center justify-center rounded-xl ring-1 ring-foreground/5', accent.iconBg)}>
            <Icon className={cn('size-5', accent.text)} />
          </div>
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="size-2.5" />
                Recommended
              </span>
              <span className="text-xs font-medium text-muted-foreground">{recommendation.reason}</span>
            </div>
            <p className={cn('text-xs font-semibold uppercase tracking-wider', accent.text)}>
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
