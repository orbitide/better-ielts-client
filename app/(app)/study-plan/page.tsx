import { getStudyPlan } from '@/lib/data/study-plan'
import { getCurrentUser } from '@/lib/data/users'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { WeeklyCalendarClient } from '@/components/study-plan/WeeklyCalendarClient'
import { BookMarked, Headphones, PenLine, Mic, Brain, ClipboardList, Clock, Target } from 'lucide-react'
import { formatBand, formatMinutes, skillColor } from '@/lib/utils/format'
import { BandBadge } from '@/components/shared/BandBadge'

export const metadata = { title: 'Study Plan' }

export default async function StudyPlanPage() {
  const [plan, user] = await Promise.all([
    getStudyPlan('user-1'),
    getCurrentUser(),
  ])

  const totalCompletedMinutes = plan.days.reduce((sum, d) => sum + d.completedMinutes, 0)
  const weeklyProgress = Math.round((totalCompletedMinutes / plan.weeklyGoalMinutes) * 100)

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Study Plan"
        description="Your personalised weekly learning schedule."
      >
        <BandBadge score={user.targetBand} />
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
      <WeeklyCalendarClient days={plan.days} />
    </div>
  )
}
