import { getStudyPlan } from '@/lib/data/study-plan'
import { getCurrentUser } from '@/lib/data/users'
import { StudyPlanShell } from '@/components/study-plan/StudyPlanShell'

export const metadata = { title: 'Study Plan' }

export default async function StudyPlanPage() {
  const [plan, user] = await Promise.all([
    getStudyPlan('user-1'),
    getCurrentUser(),
  ])

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto min-h-full">
      <StudyPlanShell fallbackPlan={plan} user={user} />
    </div>
  )
}
