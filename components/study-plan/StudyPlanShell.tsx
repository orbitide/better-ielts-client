'use client'

import { Target, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { PageHeader } from '@/components/shared/PageHeader'
import { BandBadge } from '@/components/shared/BandBadge'
import { WeeklyCalendarClient } from '@/components/study-plan/WeeklyCalendarClient'
import { CreatePlanDialog } from '@/components/study-plan/CreatePlanDialog'
import { useStudyPlanStore } from '@/lib/store/study-plan-store'
import { formatBand, formatMinutes } from '@/lib/utils/format'
import type { StudyPlan } from '@/lib/types/study-plan'
import type { User } from '@/lib/types/user'

interface StudyPlanShellProps {
  fallbackPlan: StudyPlan
  user: User
}

export function StudyPlanShell({ fallbackPlan, user }: StudyPlanShellProps) {
  const storePlan = useStudyPlanStore((s) => s.plan)
  const hasHydrated = useStudyPlanStore((s) => s._hasHydrated)
  const updateTaskStatus = useStudyPlanStore((s) => s.updateTaskStatus)

  const hasPlan = hasHydrated && !!storePlan
  // Use store plan once hydrated; fall back to server-fetched mock otherwise
  const plan = hasPlan ? storePlan! : fallbackPlan

  const totalCompletedMinutes = plan.days.reduce((sum, d) => sum + d.completedMinutes, 0)
  const weeklyProgress = Math.round((totalCompletedMinutes / plan.weeklyGoalMinutes) * 100)

  function handleTaskComplete(taskId: string) {
    updateTaskStatus(taskId, 'completed')
  }

  return (
    <>
      <PageHeader
        title="Study Plan"
        description="Your personalised weekly learning schedule."
      >
        <BandBadge score={user.targetBand} />
        <CreatePlanDialog
          currentTargetBand={plan.targetBand}
          currentWeeklyGoalMinutes={plan.weeklyGoalMinutes}
          hasPlan={hasPlan}
        />
      </PageHeader>

      {/* Weekly overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Weekly Goal</span>
            </div>
            <p className="text-2xl font-bold">{formatMinutes(plan.weeklyGoalMinutes)}</p>
            <Progress value={weeklyProgress} className="mt-2 h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">{weeklyProgress}% complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Time Studied</span>
            </div>
            <p className="text-2xl font-bold">{formatMinutes(totalCompletedMinutes)}</p>
            <p className="text-xs text-muted-foreground mt-1">of {formatMinutes(plan.weeklyGoalMinutes)} goal</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Target Band</span>
            </div>
            <p className="text-2xl font-bold text-primary">{formatBand(plan.targetBand)}</p>
            <p className="text-xs text-muted-foreground mt-1">current: {formatBand(user.currentBand.overall)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive weekly calendar */}
      <WeeklyCalendarClient days={plan.days} onTaskComplete={handleTaskComplete} />
    </>
  )
}
