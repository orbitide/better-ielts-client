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
        'rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-200',
        'hover:shadow-md',
      )}
    >
      <div className="p-6">
        <div className="mb-5 flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted/60">
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

