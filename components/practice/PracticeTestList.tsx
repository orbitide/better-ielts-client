import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import type { PracticeTestItem, PracticeTestSeries } from '@/lib/data/practice'
import { cn } from '@/lib/utils'

function groupBySeries(tests: PracticeTestItem[]) {
  return tests.reduce<{ series: PracticeTestSeries | undefined; tests: PracticeTestItem[] }[]>(
    (acc, test) => {
      const key = test.series?.id ?? '__none__'
      const existing = acc.find((g) => (g.series?.id ?? '__none__') === key)
      if (existing) {
        existing.tests.push(test)
      } else {
        acc.push({ series: test.series, tests: [test] })
      }
      return acc
    },
    [],
  )
}

export function PracticeTestList({
  tests,
  recommendedHref,
  color,
}: {
  tests: PracticeTestItem[]
  recommendedHref?: string
  color: string
}) {
  const groups = groupBySeries(tests)

  return (
    <div className="space-y-6">
      {groups.map(({ series, tests: groupTests }) => (
        <div key={series?.id ?? '__none__'}>
          {series && (
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {series.label}
            </p>
          )}
          <ul className="space-y-2">
            {groupTests.map((test) => {
              const isRecommended = test.href === recommendedHref
              return (
                <li key={test.id}>
                  <Link
                    href={test.href}
                    className={cn(
                      'group flex items-center justify-between gap-4 rounded-xl border px-4 py-4 transition-all duration-200',
                      isRecommended
                        ? 'border-primary/20 bg-primary/5 ring-1 ring-primary/10'
                        : 'border-border/60 bg-card hover:border-border hover:shadow-sm',
                    )}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {test.title}
                        </p>
                        {isRecommended && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                            Recommended
                          </span>
                        )}
                      </div>
                      {test.meta && (
                        <p className="mt-1 text-sm text-muted-foreground">{test.meta}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="size-3.5" />
                      {test.duration}
                      <ArrowRight className={cn('size-4 transition-all', color, 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0')} />
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
