'use client'

import { useState, useEffect } from 'react'
import { useTestStore } from '@/lib/store/test-store'
import { useTestTimer } from '@/lib/hooks/use-timer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CountdownTimer } from '@/components/shared/CountdownTimer'
import { McqQuestion } from './McqQuestion'
import { TfngQuestion } from './TfngQuestion'
import { MatchingQuestion } from './MatchingQuestion'
import { FillBlankQuestion } from './FillBlankQuestion'
import { AnswerReview } from './AnswerReview'
import type { ReadingTest } from '@/lib/types/reading'
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReadingTestShellProps {
  test: ReadingTest
}

export function ReadingTestShell({ test }: ReadingTestShellProps) {
  const { startTest, answers, resetTest } = useTestStore()
  const timeRemaining = useTestTimer()
  const [started, setStarted] = useState(false)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const currentSection = test.sections[sectionIndex]
  const allQuestions = test.sections.flatMap((s) => s.questions)

  const handleStart = () => {
    startTest(test.id, test.durationMinutes * 60)
    setStarted(true)
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  useEffect(() => {
    return () => resetTest()
  }, [resetTest])

  if (!started) {
    return (
      <div className="flex items-center justify-center min-h-full p-6">
        <div className="max-w-md w-full text-center">
          <div className="rounded-2xl border bg-card p-8">
            <Badge variant="secondary" className="mb-4">Academic Reading</Badge>
            <h1 className="text-2xl font-bold mb-2">{test.title}</h1>
            <p className="text-muted-foreground text-sm mb-6">
              {test.sections.length} passages · {allQuestions.length} questions · {test.durationMinutes} minutes
            </p>
            <div className="space-y-2 text-sm text-left mb-8 p-4 bg-muted/50 rounded-lg">
              <p className="font-medium mb-2">Instructions:</p>
              <ul className="space-y-1.5 text-muted-foreground list-disc list-inside">
                <li>Read all three passages and answer all 40 questions</li>
                <li>You have exactly 60 minutes — no extra time is given</li>
                <li>Pay attention to word limits on fill-in-the-blank questions</li>
                <li>Answers are not case-sensitive</li>
              </ul>
            </div>
            <Button size="lg" className="w-full" onClick={handleStart}>
              Start Reading Test
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (submitted) {
    return <AnswerReview test={test} answers={answers} />
  }

  return (
    <div className="flex flex-col h-full">
      {/* Test header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium hidden sm:block">{test.title}</span>
          <div className="flex gap-1">
            {test.sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSectionIndex(i)}
                className={cn(
                  'text-xs px-3 py-1 rounded-full border transition-colors',
                  i === sectionIndex
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'hover:bg-accent'
                )}
              >
                Passage {s.passageIndex}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <CountdownTimer seconds={timeRemaining} warningThreshold={600} />
          </div>
          <Badge variant="outline" className="text-xs">
            {Object.keys(answers).length}/{allQuestions.length} answered
          </Badge>
        </div>
      </div>

      {/* Split pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Passage */}
        <ScrollArea className="flex-1 border-r">
          <div className="p-6 max-w-2xl">
            <h2 className="text-lg font-bold mb-4">{currentSection.passage.title}</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {currentSection.passage.body.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4 leading-relaxed text-sm">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Questions */}
        <ScrollArea className="w-full max-w-sm lg:max-w-md shrink-0">
          <div className="p-4 space-y-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Questions {currentSection.questions[0]?.questionNumber}–{currentSection.questions[currentSection.questions.length - 1]?.questionNumber}
            </p>
            {currentSection.questions.map((q) => {
              if (q.type === 'mcq') return <McqQuestion key={q.id} question={q} />
              if (q.type === 'tfng') return <TfngQuestion key={q.id} question={q} />
              if (q.type === 'matching') return <MatchingQuestion key={q.id} question={q} />
              if (q.type === 'fill-blank') return <FillBlankQuestion key={q.id} question={q} />
              return null
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-t bg-background shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSectionIndex((i) => Math.max(0, i - 1))}
          disabled={sectionIndex === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        {sectionIndex < test.sections.length - 1 ? (
          <Button
            size="sm"
            onClick={() => setSectionIndex((i) => i + 1)}
            className="gap-2"
          >
            Next Passage
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="sm" onClick={handleSubmit} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle className="h-4 w-4" />
            Submit Test
          </Button>
        )}
      </div>
    </div>
  )
}
