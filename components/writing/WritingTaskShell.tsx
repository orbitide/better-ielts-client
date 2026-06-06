'use client'

import { useState, useEffect, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CountdownTimer } from '@/components/shared/CountdownTimer'
import { BandBadge } from '@/components/shared/BandBadge'
import type { WritingTask } from '@/lib/types/writing'
import { Clock, CheckCircle, BookOpen, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

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
      <div className="flex items-center justify-center min-h-full p-6">
        <div className="max-w-lg w-full">
          <div className="rounded-2xl border bg-card p-8">
            <Badge variant="secondary" className="mb-4">
              Writing {task.type === 'task1' ? 'Task 1' : 'Task 2'}
            </Badge>
            <h1 className="text-xl font-bold mb-3">{task.title}</h1>
            <div className="rounded-lg bg-muted/50 p-4 mb-6">
              <p className="text-sm leading-relaxed">{task.prompt}</p>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{task.timeMinutes} minutes</span>
              <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" />Minimum {task.wordMinimum} words</span>
            </div>
            <Button size="lg" className="w-full" onClick={() => setStarted(true)}>
              Start Writing
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <ScrollArea className="h-full">
        <div className="p-6 max-w-3xl mx-auto space-y-6">
          <div className="text-center py-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
              <CheckCircle className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold mb-1">Submission Received</h2>
            <p className="text-muted-foreground">Here is your AI feedback based on the IELTS marking criteria.</p>
          </div>

          {/* Overall score */}
          <div className="rounded-xl border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Estimated Band Score</p>
            <BandBadge score={MOCK_FEEDBACK.overallBand} className="text-xl px-5 py-2" />
            <p className="text-xs text-muted-foreground mt-2">Words written: {wordCount}</p>
          </div>

          {/* Criteria breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_FEEDBACK.criteria.map((c) => (
              <div key={c.name} className="rounded-xl border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <BandBadge score={c.band} />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.feedback}</p>
              </div>
            ))}
          </div>

          {/* Improvements */}
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-semibold mb-3">Key improvements</h3>
            <ul className="space-y-2">
              {MOCK_FEEDBACK.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {imp}
                </li>
              ))}
            </ul>
          </div>

          {/* Your submission */}
          {task.sampleAnswer && (
            <div className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Sample Band 9 Answer</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSample(!showSample)}>
                  {showSample ? 'Hide' : 'Show'}
                </Button>
              </div>
              {showSample && (
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {task.sampleAnswer}
                </p>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 flex-1" asChild>
              <Link href={`/writing/${task.id}`}>
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </ScrollArea>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50 shrink-0 flex-wrap gap-2">
        <Badge variant="secondary">Writing {task.type === 'task1' ? 'Task 1' : 'Task 2'}</Badge>
        <div className="flex items-center gap-4 text-sm">
          <span className={cn(
            'font-medium',
            wordCount >= task.wordMinimum ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'
          )}>
            {wordCount} / {task.wordMinimum} words
          </span>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <CountdownTimer seconds={timeLeft} warningThreshold={300} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* Prompt */}
        <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r p-4 shrink-0 overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Task Prompt</p>
          <p className="text-sm leading-relaxed mb-4">{task.prompt}</p>
          {task.type === 'task1' && (
            <img
              src={task.imageUrl}
              alt={task.imageAlt}
              className="w-full rounded-lg border object-cover"
            />
          )}
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col p-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing your response here..."
            className="flex-1 resize-none text-sm leading-relaxed font-serif min-h-64 lg:min-h-0"
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

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-4 py-3 border-t shrink-0">
        <Button
          onClick={() => setSubmitted(true)}
          disabled={wordCount < Math.round(task.wordMinimum * 0.7)}
          className="gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
        >
          <CheckCircle className="h-4 w-4" />
          Submit Essay
        </Button>
      </div>
    </div>
  )
}
