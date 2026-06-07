'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTestStore } from '@/lib/store/test-store'
import { useTestTimer } from '@/lib/hooks/use-timer'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CountdownTimer } from '@/components/shared/CountdownTimer'
import { McqQuestion } from './McqQuestion'
import { TfngQuestion } from './TfngQuestion'
import { MatchingQuestion } from './MatchingQuestion'
import { FillBlankQuestion } from './FillBlankQuestion'
import { AnswerReview } from './AnswerReview'
import { ResizableSplitPane } from '@/components/shared/ResizableSplitPane'
import { ExamIntroScreen } from '@/components/exam/ExamIntroScreen'
import { ExamToolbar, ExamSectionTab } from '@/components/exam/ExamToolbar'
import { ExamFooter } from '@/components/exam/ExamFooter'
import { cn } from '@/lib/utils'
import { examExitHrefs } from '@/lib/utils/exam-routes'
import type { ReadingTest } from '@/lib/types/reading'
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from 'lucide-react'

interface ReadingTestShellProps {
  test: ReadingTest
}

export function ReadingTestShell({ test }: ReadingTestShellProps) {
  const { startTest, submitTest, answers, resetTest, activeTestId, isSubmitted, _hasHydrated } = useTestStore()
  const timeRemaining = useTestTimer()
  const router = useRouter()
  const started = activeTestId === test.id
  const [sectionIndex, setSectionIndex] = useState(0)
  const submitted = isSubmitted
  const [fontSize, setFontSize] = useState(1)

  const fontSizes = ['text-xs', 'text-sm', 'text-base', 'text-lg'] as const
  const decreaseFont = () => setFontSize((f) => Math.max(0, f - 1))
  const increaseFont = () => setFontSize((f) => Math.min(fontSizes.length - 1, f + 1))

  const currentSection = test.sections[sectionIndex]
  const allQuestions = test.sections.flatMap((s) => s.questions)

  const handleStart = () => {
    startTest(test.id, test.durationMinutes * 60)
  }

  if (!_hasHydrated) return null

  if (!started) {
    return (
      <ExamIntroScreen
        module="Reading"
        title={test.title}
        meta={`${test.sections.length} passages · ${allQuestions.length} questions · ${test.durationMinutes} minutes`}
        instructions={[
          'Read all three passages and answer all 40 questions.',
          'You have exactly 60 minutes — no extra time is given.',
          'Pay attention to word limits on fill-in-the-blank questions.',
          'Answers are not case-sensitive.',
        ]}
        onStart={handleStart}
        startLabel="Begin reading test"
        exitHref={examExitHrefs.reading}
      />
    )
  }

  if (submitted) {
    return <AnswerReview test={test} answers={answers} />
  }

  return (
    <div className="flex h-full flex-col">
      <ExamToolbar
        module="Reading"
        exitHref={examExitHrefs.reading}
        onExit={() => { resetTest(); router.push(examExitHrefs.reading) }}
        center={
          <>
            {test.sections.map((s, i) => (
              <ExamSectionTab
                key={s.id}
                active={i === sectionIndex}
                onClick={() => setSectionIndex(i)}
              >
                Passage {s.passageIndex}
              </ExamSectionTab>
            ))}
          </>
        }
        trailing={
          <div className="flex items-center gap-3 text-sm text-white/90">
            <span className="hidden items-center gap-1.5 sm:flex">
              <Clock className="size-3.5 text-white/60" />
              <CountdownTimer seconds={timeRemaining} warningThreshold={600} className="text-white" />
            </span>
            <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs tabular-nums">
              {Object.keys(answers).length}/{allQuestions.length}
            </span>
          </div>
        }
      />

      <ResizableSplitPane
        storageKey="reading-split-percent"
        defaultLeftPercent={62}
        minLeftPercent={35}
        maxLeftPercent={78}
        className="bg-[#f8f8f8] dark:bg-[#181818]"
        left={
          <div className="flex h-full flex-col bg-white dark:bg-[#1e1e1e]">
            <div className="flex shrink-0 items-center justify-end gap-1 border-b px-4 py-1.5">
              <button
                onClick={decreaseFont}
                disabled={fontSize === 0}
                className="rounded px-2 py-0.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
              >
                A−
              </button>
              <button
                onClick={increaseFont}
                disabled={fontSize === fontSizes.length - 1}
                className="rounded px-2 py-0.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
              >
                A+
              </button>
            </div>
            <ScrollArea className="h-full flex-1">
              <div className="p-6">
                <h2 className="mb-4 text-base font-semibold text-foreground">{currentSection.passage.title}</h2>
                <div className={cn('max-w-none leading-[1.75] text-foreground/90', fontSizes[fontSize])}>
                  {currentSection.passage.body.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-4">{para}</p>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        }
        right={
          <ScrollArea className="h-full bg-[#fafafa] dark:bg-[#161616]">
            <div className="space-y-4 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
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
        }
      />

      <ExamFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSectionIndex((i) => Math.max(0, i - 1))}
          disabled={sectionIndex === 0}
          className="gap-2 rounded-md border-black/15 bg-white dark:border-white/15 dark:bg-[#222]"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        {sectionIndex < test.sections.length - 1 ? (
          <Button
            size="sm"
            onClick={() => setSectionIndex((i) => i + 1)}
            className="gap-2 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48]"
          >
            Next passage
            <ChevronRight className="size-4" />
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => submitTest()}
            className="gap-2 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48]"
          >
            <CheckCircle className="size-4" />
            Submit test
          </Button>
        )}
      </ExamFooter>
    </div>
  )
}
