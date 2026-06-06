'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { CountdownTimer } from '@/components/shared/CountdownTimer'
import { BandBadge } from '@/components/shared/BandBadge'
import { useTestStore } from '@/lib/store/test-store'
import { useTestTimer } from '@/lib/hooks/use-timer'
import type { ListeningTest, ListeningQuestion } from '@/lib/types/listening'
import { Play, Pause, RotateCcw, ChevronRight, Clock, Volume2, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ListeningTestShell({ test }: { test: ListeningTest }) {
  const { startTest, answers, setAnswer, resetTest } = useTestStore()
  const timeRemaining = useTestTimer()
  const [started, setStarted] = useState(false)
  const [sectionIdx, setSectionIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentSection = test.sections[sectionIdx]

  const allQuestions = test.sections.flatMap((s) => s.questions)

  const handleStart = () => {
    startTest(test.id, test.durationMinutes * 60)
    setStarted(true)
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    setIsPlaying(false)
    setShowTranscript(false)
  }, [sectionIdx])

  useEffect(() => {
    return () => resetTest()
  }, [resetTest])

  function getScore() {
    const correct = allQuestions.filter((q) => {
      const a = answers[q.id]?.trim().toLowerCase()
      const c = q.correctAnswer.toLowerCase()
      return a === c
    }).length
    const pct = correct / allQuestions.length
    if (pct >= 0.90) return { score: correct, band: 9.0 }
    if (pct >= 0.80) return { score: correct, band: 8.0 }
    if (pct >= 0.70) return { score: correct, band: 7.5 }
    if (pct >= 0.60) return { score: correct, band: 7.0 }
    if (pct >= 0.50) return { score: correct, band: 6.5 }
    if (pct >= 0.40) return { score: correct, band: 6.0 }
    return { score: correct, band: 5.5 }
  }

  if (!started) {
    return (
      <div className="flex items-center justify-center min-h-full p-6">
        <div className="max-w-md w-full text-center">
          <div className="rounded-2xl border bg-card p-8">
            <Badge variant="secondary" className="mb-4">Listening Test</Badge>
            <h1 className="text-2xl font-bold mb-2">{test.title}</h1>
            <p className="text-muted-foreground text-sm mb-6">
              {test.sections.length} sections · {allQuestions.length} questions · {test.durationMinutes} minutes
            </p>
            <div className="space-y-1.5 text-sm text-left mb-8 p-4 bg-muted/50 rounded-lg text-muted-foreground list-disc list-inside">
              <p className="font-medium text-foreground mb-2">Instructions:</p>
              <p>• You will hear each section once only</p>
              <p>• Write answers as you listen — do not wait until the end</p>
              <p>• Answers must follow the word limit where given</p>
              <p>• Transcripts are available after each section</p>
            </div>
            <Button size="lg" className="w-full" onClick={handleStart}>
              Start Listening Test
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (submitted) {
    const { score, band } = getScore()
    return (
      <div className="flex items-center justify-center min-h-full p-6">
        <div className="max-w-md w-full text-center rounded-2xl border bg-card p-8">
          <h2 className="text-2xl font-bold mb-6">Test Complete!</h2>
          <div className="flex items-center justify-center gap-8 mb-8">
            <div>
              <p className="text-4xl font-extrabold text-primary">{score}/{allQuestions.length}</p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div>
              <BandBadge score={band} className="text-lg px-4 py-2" />
              <p className="text-sm text-muted-foreground mt-1">Est. band</p>
            </div>
          </div>
          <Button asChild className="w-full" onClick={resetTest}>
            <a href="/dashboard">Back to Dashboard</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50 shrink-0 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {test.sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSectionIdx(i)}
              className={cn(
                'text-xs px-3 py-1 rounded-full border transition-colors',
                i === sectionIdx ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'
              )}
            >
              Section {s.sectionNumber}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <CountdownTimer seconds={timeRemaining} />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Section {currentSection.sectionNumber}</h2>
            <Badge variant="secondary">{currentSection.questions.length} questions</Badge>
          </div>

          {/* Audio player */}
          <div className="rounded-xl border bg-muted/30 p-4">
            <audio
              ref={audioRef}
              src={currentSection.audioUrl}
              onEnded={() => setIsPlaying(false)}
              onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
            />
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </button>
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span className="flex items-center gap-1"><Volume2 className="h-3 w-3" /> Audio</span>
                  <span>{Math.floor(currentTime)}s / {currentSection.audioDurationSeconds}s</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(currentTime / currentSection.audioDurationSeconds) * 100}%` }}
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranscript(!showTranscript)}
                className="gap-1.5 text-xs"
              >
                {showTranscript ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {showTranscript ? 'Hide' : 'Show'} Transcript
              </Button>
            </div>
            {showTranscript && (
              <div className="mt-4 p-3 bg-background rounded-lg text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap border">
                {currentSection.transcript}
              </div>
            )}
          </div>

          {/* Questions */}
          <div className="space-y-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Questions {currentSection.questions[0]?.questionNumber}–{currentSection.questions[currentSection.questions.length - 1]?.questionNumber}
            </p>
            {currentSection.questions.map((q) => (
              <ListeningQuestionItem key={q.id} question={q} />
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t shrink-0">
        <Button variant="outline" size="sm" onClick={() => setSectionIdx((i) => Math.max(0, i - 1))} disabled={sectionIdx === 0} className="gap-2">
          Previous
        </Button>
        {sectionIdx < test.sections.length - 1 ? (
          <Button size="sm" onClick={() => setSectionIdx((i) => i + 1)} className="gap-2">
            Next Section <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="sm" onClick={() => setSubmitted(true)} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle className="h-4 w-4" />
            Submit Test
          </Button>
        )}
      </div>
    </div>
  )
}

function ListeningQuestionItem({ question }: { question: ListeningQuestion }) {
  const { answers, setAnswer } = useTestStore()

  if (question.type === 'mcq' && question.options) {
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium">
          <span className="text-muted-foreground mr-1.5">{question.questionNumber}.</span>
          {question.stem}
        </p>
        <div className="space-y-1.5">
          {question.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setAnswer(question.id, opt.label)}
              className={cn(
                'w-full text-left flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors',
                answers[question.id] === opt.label ? 'border-primary bg-primary/10 font-medium' : 'hover:bg-accent'
              )}
            >
              <span className={cn(
                'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
                answers[question.id] === opt.label ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
              )}>{opt.label}</span>
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">
        <span className="text-muted-foreground mr-1.5">{question.questionNumber}.</span>
        {question.stem}
      </p>
      <Input
        value={answers[question.id] ?? ''}
        onChange={(e) => setAnswer(question.id, e.target.value)}
        placeholder="Write your answer"
        className="text-sm"
      />
    </div>
  )
}
