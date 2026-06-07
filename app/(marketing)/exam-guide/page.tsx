import type { Metadata } from 'next'
import Link from 'next/link'
import { getExamGuide } from '@/lib/data/exam-guide'
import { ExamGuideShell } from '@/components/exam-guide/ExamGuideShell'
import { buttonVariants } from '@/components/ui/button-variants'

export const metadata: Metadata = {
  title: 'IELTS Exam Guide — Format, Structure & Question Types',
  description: 'A complete overview of the IELTS exam: Listening, Reading, Writing, and Speaking sections, question types, timings, and scoring.',
}

export default async function ExamGuidePublicPage() {
  const guide = await getExamGuide()

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 space-y-10 min-h-[85vh]">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">IELTS Exam Guide</h1>
        <p className="text-muted-foreground max-w-2xl">
          Everything you need to know about the IELTS exam format — section structure, question types, timings, and scoring — for both Academic and General Training.
        </p>
      </div>

      <ExamGuideShell data={guide} showPracticeLinks={true} />

      <div className="rounded-xl border bg-muted/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold">Ready to practise?</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Work through real-style questions for each skill with instant feedback.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/practice" className={buttonVariants({ variant: 'outline' })}>
            Browse practice tests
          </Link>
          <Link href="/mock-tests" className={buttonVariants({ variant: 'default' })}>
            Try a mock exam
          </Link>
        </div>
      </div>
    </div>
  )
}
