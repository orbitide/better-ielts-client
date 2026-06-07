'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { CountdownTimer } from '@/components/shared/CountdownTimer'
import { BandBadge } from '@/components/shared/BandBadge'
import { useTestStore } from '@/lib/store/test-store'
import { useProgressStore } from '@/lib/store/progress-store'
import { useTestTimer } from '@/lib/hooks/use-timer'
import type { ListeningTest, ListeningQuestion } from '@/lib/types/listening'
import { Play, Pause, ChevronRight, Clock, Volume2, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ExamIntroScreen } from '@/components/exam/ExamIntroScreen'
import { ExamToolbar, ExamSectionTab } from '@/components/exam/ExamToolbar'
import { ExamFooter } from '@/components/exam/ExamFooter'
import { ExamResultsScreen } from '@/components/exam/ExamResultsScreen'
import { examExitHrefs } from '@/lib/utils/exam-routes'
import Link from 'next/link'
import { RotateCcw } from 'lucide-react'

export function ListeningTestShell({ test }: { test: ListeningTest }) {
  const { startTest, submitTest, answers, setAnswer, resetTest, activeTestId, isSubmitted, _hasHydrated } = useTestStore()
  const { markCompleted } = useProgressStore()
  const timeRemaining = useTestTimer()
  const router = useRouter()
  const started = activeTestId === test.id
  const [sectionIdx, setSectionIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const submitted = isSubmitted
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentSection = test.sections[sectionIdx]

  const allQuestions = test.sections.flatMap((s) => s.questions)

  const handleStart = () => {
    startTest(test.id, test.durationMinutes * 60)
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

  if (!_hasHydrated) return null

  if (!started) {
    return (
      <ExamIntroScreen
        module="Listening"
        title={test.title}
        meta={`${test.sections.length} sections · ${allQuestions.length} questions · ${test.durationMinutes} minutes`}
        instructions={[
          'You will hear each section once only.',
          'Write answers as you listen — do not wait until the end.',
          'Answers must follow the word limit where given.',
          'Transcripts are available after each section.',
        ]}
        onStart={handleStart}
        startLabel="Begin listening test"
        exitHref={examExitHrefs.listening}
      />
    )
  }

  if (submitted) {
    const { score, band } = getScore()
    return (
      <ExamResultsScreen
        module="Listening"
        title="Listening test complete"
        subtitle={test.title}
        exitHref={examExitHrefs.listening}
        exitLabel="Return to practice"
      >
        <div className="flex items-center justify-center gap-8 text-center">
          <div>
            <p className="text-3xl font-bold tabular-nums">
              {score}/{allQuestions.length}
            </p>
            <p className="text-sm text-muted-foreground">Correct</p>
          </div>
          <div>
            <BandBadge score={band} className="text-lg px-4 py-2" />
            <p className="mt-1 text-sm text-muted-foreground">Estimated band</p>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 gap-2 rounded-md"
            onClick={resetTest}
            asChild
          >
            <Link href={`/listening/${test.id}`}>
              <RotateCcw className="size-4" />
              Retake
            </Link>
          </Button>
          <Button
            className="flex-1 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48]"
            asChild
          >
            <Link href={examExitHrefs.listening}>Return to practice</Link>
          </Button>
        </div>
      </ExamResultsScreen>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <ExamToolbar
        module="Listening"
        exitHref={examExitHrefs.listening}
        onExit={() => { resetTest(); router.push(examExitHrefs.listening) }}
        center={
          <>
            {test.sections.map((s, i) => (
              <ExamSectionTab
                key={s.id}
                active={i === sectionIdx}
                onClick={() => setSectionIdx(i)}
              >
                Section {s.sectionNumber}
              </ExamSectionTab>
            ))}
          </>
        }
        trailing={
          <span className="flex items-center gap-1.5 text-sm text-white/90">
            <Clock className="size-3.5 text-white/60" />
            <CountdownTimer seconds={timeRemaining} className="text-white" />
          </span>
        }
      />

      <ScrollArea className="flex-1 bg-[#f8f8f8] dark:bg-[#181818]">
        <div className="mx-auto max-w-2xl space-y-6 p-6">
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

      <ExamFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSectionIdx((i) => Math.max(0, i - 1))}
          disabled={sectionIdx === 0}
          className="rounded-md border-black/15 bg-white dark:border-white/15 dark:bg-[#222]"
        >
          Previous
        </Button>
        {sectionIdx < test.sections.length - 1 ? (
          <Button
            size="sm"
            onClick={() => setSectionIdx((i) => i + 1)}
            className="gap-2 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48]"
          >
            Next section
            <ChevronRight className="size-4" />
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => { submitTest(); markCompleted(test.id) }}
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
