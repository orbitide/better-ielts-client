'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react'
import type { PracticeTestItem, PracticeTestSeries } from '@/lib/data/practice'
import { useProgressStore } from '@/lib/store/progress-store'
import { cn } from '@/lib/utils'

type FilterOption = 'all' | 'completed' | 'not-started'
type TaskTypeFilter = 'all' | 'task1' | 'task2'

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

const FILTERS: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'not-started', label: 'Not started' },
  { value: 'completed', label: 'Completed' },
]

const TASK_TYPE_FILTERS: { value: TaskTypeFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'task1', label: 'Task 1' },
  { value: 'task2', label: 'Task 2' },
]

export function PracticeTestList({
  tests,
  recommendedHref,
  color,
  initialTaskType,
}: {
  tests: PracticeTestItem[]
  recommendedHref?: string
  color: string
  initialTaskType?: 'task1' | 'task2'
}) {
  const [filter, setFilter] = useState<FilterOption>('all')
  const [taskTypeFilter, setTaskTypeFilter] = useState<TaskTypeFilter>(initialTaskType ?? 'all')
  const { completedIds, _hasHydrated } = useProgressStore()

  const isCompleted = (id: string) => _hasHydrated && completedIds.includes(id)

  const hasTaskTypes = tests.some((t) => t.taskType)

  const filtered = tests.filter((t) => {
    if (filter === 'completed' && !isCompleted(t.id)) return false
    if (filter === 'not-started' && isCompleted(t.id)) return false
    if (taskTypeFilter !== 'all' && t.taskType !== taskTypeFilter) return false
    return true
  })

  const groups = groupBySeries(filtered)

  return (
    <div className="space-y-4">
      {/* Filter chips */}
      <div className="flex items-center gap-2">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              filter === value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border/60 bg-card text-muted-foreground hover:border-border hover:text-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Task type filter chips */}
      {hasTaskTypes && (
        <div className="flex items-center gap-2">
          {TASK_TYPE_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTaskTypeFilter(value)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                taskTypeFilter === value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border/60 bg-card text-muted-foreground hover:border-border hover:text-foreground',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* List */}
      {groups.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          {filter === 'completed' ? 'No completed tests yet.' : 'No tests match this filter.'}
        </p>
      ) : (
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
                  const done = isCompleted(test.id)
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
                            <p className={cn('font-semibold transition-colors truncate', done ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary')}>
                              {test.title}
                            </p>
                            {isRecommended && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                                Recommended
                              </span>
                            )}
                            {done && (
                              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="size-3" />
                                Completed
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
      )}
    </div>
  )
}
