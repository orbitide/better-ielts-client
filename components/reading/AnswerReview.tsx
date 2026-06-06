'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import type { ReadingTest } from '@/lib/types/reading'
import { useTestStore } from '@/lib/store/test-store'
import { BandBadge } from '@/components/shared/BandBadge'
import { ExamResultsScreen } from '@/components/exam/ExamResultsScreen'
import { examExitHrefs } from '@/lib/utils/exam-routes'

interface AnswerReviewProps {
  test: ReadingTest
  answers: Record<string, string>
}

function calculateBand(score: number, total: number): number {
  const pct = score / total
  if (pct >= 0.90) return 9.0
  if (pct >= 0.80) return 8.0
  if (pct >= 0.70) return 7.0
  if (pct >= 0.60) return 6.5
  if (pct >= 0.50) return 6.0
  if (pct >= 0.40) return 5.5
  return 5.0
}

export function AnswerReview({ test, answers }: AnswerReviewProps) {
  const { resetTest } = useTestStore()
  const allQuestions = test.sections.flatMap((s) => s.questions)

  const correct = allQuestions.filter((q) => {
    const ans = answers[q.id]?.trim().toLowerCase()
    const correct = q.type === 'fill-blank' || q.type === 'matching' || q.type === 'mcq'
      ? (q as any).correctAnswer?.toLowerCase()
      : (q as any).correctAnswer?.toLowerCase()
    return ans === correct
  })

  const score = correct.length
  const total = allQuestions.length
  const band = calculateBand(score, total)

  return (
    <ExamResultsScreen
      module="Reading"
      title="Reading test complete"
      subtitle={test.title}
      exitHref={examExitHrefs.reading}
      exitLabel="Return to practice"
    >
      <div className="flex items-center justify-center gap-8 text-center">
        <div>
          <p className="text-3xl font-bold tabular-nums">
            {score}/{total}
          </p>
          <p className="text-sm text-muted-foreground">Correct answers</p>
        </div>
        <div>
          <BandBadge score={band} className="text-lg px-4 py-2" />
          <p className="mt-1 text-sm text-muted-foreground">Estimated band</p>
        </div>
        <div>
          <p className="text-3xl font-bold tabular-nums">
            {Math.round((score / total) * 100)}%
          </p>
          <p className="text-sm text-muted-foreground">Accuracy</p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Answer review
        </h3>
        {test.sections.map((section) => (
          <div key={section.id}>
            <h4 className="mb-3 text-sm font-medium text-foreground/80">
              Passage {section.passageIndex}: {section.passage.title}
            </h4>
            <div className="space-y-2">
              {section.questions.map((q) => {
                const userAnswer = answers[q.id]
                const correctAnswer = (q as any).correctAnswer
                const isCorrect =
                  userAnswer?.trim().toLowerCase() === correctAnswer?.toLowerCase()

                return (
                  <div
                    key={q.id}
                    className="flex items-start gap-3 rounded border border-black/8 bg-[#f8f8f8] p-3 text-sm dark:border-white/8 dark:bg-[#161616]"
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    ) : (
                      <XCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground">Q{q.questionNumber}</p>
                      {!isCorrect && (
                        <div className="mt-1 flex flex-wrap gap-2">
                          {userAnswer && (
                            <Badge variant="destructive" className="text-xs">
                              Your answer: {userAnswer}
                            </Badge>
                          )}
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100 text-xs text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                          >
                            Correct: {correctAnswer}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Button
          variant="outline"
          className="flex-1 gap-2 rounded-md"
          onClick={resetTest}
          asChild
        >
          <Link href={`/reading/${test.id}`}>
            <RotateCcw className="size-4" />
            Retake
          </Link>
        </Button>
        <Button
          className="flex-1 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48]"
          asChild
        >
          <Link href={examExitHrefs.reading}>Return to practice</Link>
        </Button>
      </div>
    </ExamResultsScreen>
  )
}
