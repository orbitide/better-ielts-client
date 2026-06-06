'use client'

import { useState, useEffect, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CountdownTimer } from '@/components/shared/CountdownTimer'
import { BandBadge } from '@/components/shared/BandBadge'
import type { WritingTask } from '@/lib/types/writing'
import { Clock, CheckCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ResizableSplitPane } from '@/components/shared/ResizableSplitPane'
import { ExamIntroScreen } from '@/components/exam/ExamIntroScreen'
import { ExamToolbar } from '@/components/exam/ExamToolbar'
import { ExamFooter } from '@/components/exam/ExamFooter'
import { ExamResultsScreen } from '@/components/exam/ExamResultsScreen'
import { examExitHrefs } from '@/lib/utils/exam-routes'

const MOCK_FEEDBACK = {
  overallBand: 6.5,
  criteria: [
    { name: 'Task Achievement', band: 6.5, feedback: 'Your response addresses the task requirements adequately. The position is clear, but some ideas could be developed more fully with specific examples.' },
    { name: 'Coherence & Cohesion', band: 7.0, feedback: 'Ideas are generally well-organised with a clear progression. Linking devices are used effectively, though some paragraphs could be better connected.' },
    { name: 'Lexical Resource', band: 6.5, feedback: 'A sufficient range of vocabulary is used with some less common items. There are occasional inaccuracies in word choice and collocation.' },
    { name: 'Grammatical Range & Accuracy', band: 6.0, feedback: 'A mix of simple and complex sentence structures is used. There are some grammatical errors which occasionally impede communication.' },
  ],
  improvements: [
    'Try to include more specific examples or statistics to support your arguments.',
    'Vary your sentence structure more — aim for a mix of complex and compound sentences.',
    'Replace some high-frequency words with more precise academic vocabulary.',
  ],
}

export function WritingTaskShell({ task }: { task: WritingTask }) {
  const [started, setStarted] = useState(false)
  const [text, setText] = useState('')
  const [timeLeft, setTimeLeft] = useState(task.timeMinutes * 60)
  const [submitted, setSubmitted] = useState(false)
  const [showSample, setShowSample] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const wordProgress = Math.min(100, (wordCount / task.wordMinimum) * 100)

  useEffect(() => {
    if (started && !submitted) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => Math.max(0, t - 1))
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [started, submitted])

  if (!started) {
    return (
      <ExamIntroScreen
        module={`Writing — ${task.type === 'task1' ? 'Task 1' : 'Task 2'}`}
        title={task.title}
        meta={`${task.timeMinutes} minutes · Minimum ${task.wordMinimum} words`}
        instructions={[
          task.prompt,
          task.type === 'task1'
            ? 'Summarise the visual information in your own words.'
            : 'Write a clear, well-structured essay with an introduction, body paragraphs, and conclusion.',
          'The timer starts when you begin. Plan briefly, then write.',
        ]}
        onStart={() => setStarted(true)}
        startLabel="Begin writing task"
        exitHref={examExitHrefs.writing}
      />
    )
  }

  if (submitted) {
    return (
      <ExamResultsScreen
        module={`Writing — ${task.type === 'task1' ? 'Task 1' : 'Task 2'}`}
        title="Submission received"
        subtitle={`${task.title} · AI feedback based on IELTS marking criteria`}
        exitHref={examExitHrefs.writing}
        exitLabel="Return to practice"
        wide
      >
        <div className="rounded border border-black/8 bg-[#f8f8f8] p-6 text-center dark:border-white/8 dark:bg-[#161616]">
          <p className="mb-2 text-sm text-muted-foreground">Estimated band score</p>
          <BandBadge score={MOCK_FEEDBACK.overallBand} className="px-5 py-2 text-xl" />
          <p className="mt-2 text-xs text-muted-foreground">Words written: {wordCount}</p>
        </div>

        <div className="mt-6 space-y-4">
          {MOCK_FEEDBACK.criteria.map((c) => (
            <div
              key={c.name}
              className="rounded border border-black/8 bg-[#f8f8f8] p-4 dark:border-white/8 dark:bg-[#161616]"
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="min-w-0 text-sm font-semibold">{c.name}</p>
                <BandBadge score={c.band} className="shrink-0" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{c.feedback}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded border border-black/8 bg-[#f8f8f8] p-5 dark:border-white/8 dark:bg-[#161616]">
          <h3 className="mb-3 font-semibold">Key improvements</h3>
          <ul className="space-y-2">
            {MOCK_FEEDBACK.improvements.map((imp, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b2f36]/10 text-xs font-bold text-[#2b2f36] dark:text-white/80">
                  {i + 1}
                </span>
                {imp}
              </li>
            ))}
          </ul>
        </div>

        {text.trim() && (
          <div className="mt-6 rounded border border-black/8 bg-[#f8f8f8] p-5 dark:border-white/8 dark:bg-[#161616]">
            <h3 className="mb-3 font-semibold">Your response</h3>
            <p className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-foreground/90">
              {text}
            </p>
          </div>
        )}

        {task.sampleAnswer && (
          <div className="mt-6 rounded border border-black/8 bg-[#f8f8f8] p-5 dark:border-white/8 dark:bg-[#161616]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-semibold">Sample band 9 answer</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowSample(!showSample)}>
                {showSample ? 'Hide' : 'Show'}
              </Button>
            </div>
            {showSample && (
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {task.sampleAnswer}
              </p>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" className="flex-1 gap-2 rounded-md" asChild>
            <Link href={`/writing/${task.id}`}>
              <RotateCcw className="size-4" />
              Try again
            </Link>
          </Button>
          <Button
            className="flex-1 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48]"
            asChild
          >
            <Link href={examExitHrefs.writing}>Return to practice</Link>
          </Button>
        </div>
      </ExamResultsScreen>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <ExamToolbar
        module={`Writing — ${task.type === 'task1' ? 'Task 1' : 'Task 2'}`}
        exitHref={examExitHrefs.writing}
        trailing={
          <div className="flex items-center gap-4 text-sm text-white/90">
            <span className={cn('font-mono tabular-nums', wordCount >= task.wordMinimum ? 'text-white' : 'text-white/60')}>
              {wordCount}/{task.wordMinimum} words
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-white/60" />
              <CountdownTimer seconds={timeLeft} warningThreshold={300} className="text-white" />
            </span>
          </div>
        }
      />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden flex-col lg:hidden">
        <div className="border-b p-4 max-h-48 overflow-y-auto shrink-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Task Prompt</p>
          <p className="text-sm leading-relaxed mb-4">{task.prompt}</p>
          {task.type === 'task1' && task.imageUrl && (
            <img src={task.imageUrl} alt={task.imageAlt} className="w-full rounded-lg border object-cover" />
          )}
        </div>
        <div className="flex flex-1 flex-col p-4 min-h-0">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing your response here..."
            className="flex-1 resize-none text-sm leading-relaxed font-serif min-h-64"
          />
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Word count progress</span>
              <span>{wordCount} / {task.wordMinimum} minimum</span>
            </div>
            <Progress value={wordProgress} className="h-1.5" />
          </div>
        </div>
      </div>

      <div className="hidden flex-1 overflow-hidden lg:flex">
        <ResizableSplitPane
          storageKey="writing-split-percent"
          defaultLeftPercent={38}
          minLeftPercent={25}
          maxLeftPercent={55}
          className="bg-[#f8f8f8] dark:bg-[#181818]"
          left={
            <ScrollArea className="h-full bg-white dark:bg-[#1e1e1e]">
              <div className="p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Task Prompt</p>
                <p className="text-sm leading-relaxed mb-4">{task.prompt}</p>
                {task.type === 'task1' && task.imageUrl && (
                  <img src={task.imageUrl} alt={task.imageAlt} className="w-full rounded-lg border object-cover" />
                )}
              </div>
            </ScrollArea>
          }
          right={
            <div className="flex h-full flex-col bg-[#fafafa] p-4 dark:bg-[#161616]">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start writing your response here..."
                className="min-h-0 flex-1 resize-none border-black/10 bg-white text-sm leading-relaxed font-serif dark:border-white/10 dark:bg-[#1e1e1e]"
              />
              <div className="mt-3 shrink-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Word count progress</span>
                  <span>{wordCount} / {task.wordMinimum} minimum</span>
                </div>
                <Progress value={wordProgress} className="h-1.5" />
              </div>
            </div>
          }
        />
      </div>

      <ExamFooter className="justify-end">
        <Button
          onClick={() => setSubmitted(true)}
          disabled={wordCount < Math.round(task.wordMinimum * 0.7)}
          className="gap-2 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48] disabled:opacity-50"
        >
          <CheckCircle className="size-4" />
          Submit response
        </Button>
      </ExamFooter>
    </div>
  )
}
