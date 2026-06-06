import Link from 'next/link'
import { ArrowRight, BookMarked, Headphones, Mic, PenLine } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button-variants'
import type { PracticeSkillGroup } from '@/lib/data/practice'
import { cn } from '@/lib/utils'

const skillIcons = {
  reading: BookMarked,
  listening: Headphones,
  writing: PenLine,
  speaking: Mic,
} as const

export function SkillPracticeCard({ group }: { group: PracticeSkillGroup }) {
  const Icon = skillIcons[group.skill]

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-200',
        'hover:shadow-md hover:border-border/80',
      )}
    >
      <div className={cn('pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-70', group.accentSoft)} />
      <div className={cn('absolute left-0 right-0 top-0 h-1', group.accent)} />

      <div className="relative p-6">
        <div className="mb-5 flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-foreground/5 bg-muted/50">
            <Icon className={cn('size-5', group.color)} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold tracking-tight">{group.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{group.description}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {group.tests.length} test{group.tests.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        <Link
          href={group.href}
          className={cn(buttonVariants(), 'gap-2 w-full')}
        >
          Browse {group.label}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  )
}
