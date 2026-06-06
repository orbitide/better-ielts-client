'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import type { ReadingTest } from '@/lib/types/reading'
import { useTestStore } from '@/lib/store/test-store'
import { BandBadge } from '@/components/shared/BandBadge'

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
    <div className="flex flex-col h-full">
      {/* Results header */}
      <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-transparent">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Test Complete!</h2>
          <p className="text-muted-foreground mb-6">Here are your results for {test.title}</p>
          <div className="flex items-center justify-center gap-8">
            <div>
              <p className="text-4xl font-extrabold text-primary">{score}/{total}</p>
              <p className="text-sm text-muted-foreground">Correct answers</p>
            </div>
            <div>
              <BandBadge score={band} className="text-lg px-4 py-2" />
              <p className="text-sm text-muted-foreground mt-1">Estimated band</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold">{Math.round((score / total) * 100)}%</p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            <Button variant="outline" onClick={resetTest} asChild className="gap-2">
              <Link href="/reading/test-1">
                <RotateCcw className="h-4 w-4" />
                Retake
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Answer breakdown */}
      <ScrollArea className="flex-1">
        <div className="p-6 max-w-2xl mx-auto space-y-6">
          <h3 className="font-semibold">Answer Review</h3>
          {test.sections.map((section) => (
            <div key={section.id}>
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                Passage {section.passageIndex}: {section.passage.title}
              </h4>
              <div className="space-y-2">
                {section.questions.map((q) => {
                  const userAnswer = answers[q.id]
                  const correctAnswer = (q as any).correctAnswer
                  const isCorrect = userAnswer?.trim().toLowerCase() === correctAnswer?.toLowerCase()

                  return (
                    <div key={q.id} className="flex items-start gap-3 p-3 rounded-lg border text-sm">
                      {isCorrect ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">Q{q.questionNumber}</p>
                        {!isCorrect && (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {userAnswer && (
                              <Badge variant="destructive" className="text-xs">
                                Your answer: {userAnswer}
                              </Badge>
                            )}
                            <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
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
      </ScrollArea>
    </div>
  )
}
