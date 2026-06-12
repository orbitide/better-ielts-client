import { StudyPlanShell } from '@/components/study-plan/StudyPlanShell'

export const metadata = { title: 'Study Plan' }

export default function StudyPlanPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto min-h-full">
      <StudyPlanShell />
    </div>
  )
}
