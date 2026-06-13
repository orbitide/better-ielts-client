'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { skillColor, formatMinutes } from '@/lib/utils/format'
import type { StudyPlanDay } from '@/lib/types/study-plan'

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function dayMinutes(day: StudyPlanDay) {
  const totalMinutes = day.tasks.reduce((sum, t) => sum + t.durationMinutes, 0)
  const completedMinutes = day.tasks
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => sum + t.durationMinutes, 0)
  return { totalMinutes, completedMinutes }
}

interface WeeklyCalendarClientProps {
  days: StudyPlanDay[]
  onTaskComplete?: (taskId: string) => void
}

export function WeeklyCalendarClient({ days, onTaskComplete }: WeeklyCalendarClientProps) {
  const today = new Date().toISOString().slice(0, 10)
  const todayIndex = days.findIndex((d) => d.date === today)
  const [selectedIndex, setSelectedIndex] = useState(todayIndex >= 0 ? todayIndex : 0)
  const selectedDay = days[selectedIndex]
  const selectedDayMinutes = dayMinutes(selectedDay)

  return (
    <div className="space-y-4">
      {/* Day selector */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              const date = new Date(day.date)
              const dayName = dayNames[i]
              const isToday = day.date === today
              const isSelected = i === selectedIndex
              const { totalMinutes, completedMinutes } = dayMinutes(day)
              const pct = totalMinutes > 0 ? (completedMinutes / totalMinutes) * 100 : 0

              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedIndex(i)}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-lg p-2 text-center transition-all',
                    isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-accent',
                    isToday && !isSelected && 'ring-1 ring-primary'
                  )}
                >
                  <span className="text-xs font-medium">{dayName}</span>
                  <span className="text-lg font-bold">{date.getDate()}</span>
                  {/* Progress dot */}
                  <div className={cn('h-1.5 w-6 rounded-full', isSelected ? 'bg-primary-foreground/30' : 'bg-muted')}>
                    <div
                      className={cn('h-full rounded-full', isSelected ? 'bg-primary-foreground' : 'bg-primary')}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected day tasks */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              {new Date(selectedDay.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatMinutes(selectedDayMinutes.completedMinutes)}/{formatMinutes(selectedDayMinutes.totalMinutes)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {selectedDay.tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Rest day — no tasks scheduled.</p>
          ) : (
            selectedDay.tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  'flex items-start gap-3 rounded-lg border p-3',
                  task.status === 'completed' && 'opacity-60'
                )}
              >
                {task.status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <button
                    onClick={() => onTaskComplete?.(task.id)}
                    title="Mark as complete"
                    className="shrink-0 mt-0.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Circle className="h-5 w-5 text-muted-foreground hover:text-emerald-500 transition-colors" />
                  </button>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="secondary" className={`text-xs ${skillColor(task.category)}`}>
                      {task.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.durationMinutes}m
                    </span>
                  </div>
                </div>
                {task.status !== 'completed' && (
                  <Button variant="ghost" size="sm" asChild className="shrink-0 gap-1 text-xs">
                    <Link href={task.linkHref}>
                      Start <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
