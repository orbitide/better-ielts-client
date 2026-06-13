'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { BandBadge } from '@/components/shared/BandBadge'
import type { SpeakingSession } from '@/lib/types/speaking'
import { Play, Square, ChevronRight, CheckCircle, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { ExamIntroScreen } from '@/components/exam/ExamIntroScreen'
import { ExamToolbar, ExamSectionTab } from '@/components/exam/ExamToolbar'
import { ExamResultsScreen } from '@/components/exam/ExamResultsScreen'
import { examExitHrefs } from '@/lib/utils/exam-routes'
import { useProgressStore } from '@/lib/store/progress-store'
import { uploadSpeakingAudio, submitSpeakingSubmission } from '@/lib/api/ielts'
import type { SpeakingSubmission } from '@/lib/types/speaking'

export function SpeakingSessionShell({ session }: { session: SpeakingSession }) {
  const { markCompleted } = useProgressStore()
  const [started, setStarted] = useState(false)
  const [partIdx, setPartIdx] = useState(0)
  const [phase, setPhase] = useState<'intro' | 'prep' | 'recording' | 'done-part' | 'finished'>('intro')
  const [isRecording, setIsRecording] = useState(false)
  const [prepTime, setPrepTime] = useState(0)
  const [recordingTime, setRecordingTime] = useState(0)
  const [submission, setSubmission] = useState<SpeakingSubmission | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const mediaRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const currentPart = session.parts[partIdx]

  const clearInterval_ = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const startPrep = () => {
    if (!currentPart.preparationSeconds) {
      setPhase('recording')
      return
    }
    setPrepTime(currentPart.preparationSeconds)
    setPhase('prep')
    intervalRef.current = setInterval(() => {
      setPrepTime((t) => {
        if (t <= 1) {
          clearInterval_()
          setPhase('recording')
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  const startRecording = async () => {
    setIsRecording(true)
    setRecordingTime(0)
    intervalRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRef.current = new MediaRecorder(stream)
      mediaRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }
      mediaRef.current.start()
    } catch {
      // Graceful fallback — continue without real recording
    }
  }

  const stopRecording = () => {
    clearInterval_()
    setIsRecording(false)
    if (mediaRef.current?.state === 'recording') {
      mediaRef.current.stop()
      mediaRef.current.stream.getTracks().forEach((t) => t.stop())
    }
    setPhase('done-part')
  }

  useEffect(() => {
    if (phase === 'recording' && !isRecording) {
      startRecording()
    }
  }, [phase])

  useEffect(() => () => clearInterval_(), [])

  const finishSession = async () => {
    markCompleted(session.id)
    setPhase('finished')

    let audioUrl: string | undefined
    if (audioChunksRef.current.length > 0) {
      try {
        const mimeType = mediaRef.current?.mimeType || 'audio/webm'
        const combined = new Blob(audioChunksRef.current, { type: mimeType })
        const uploadResult = await uploadSpeakingAudio(combined)
        audioUrl = uploadResult.url
      } catch {
        // Continue without audio if upload fails
      }
    }

    try {
      const result = await submitSpeakingSubmission(session.id, audioUrl)
      setSubmission(result)
    } catch {
      // Submission failed silently — results screen shows pending state
    }
  }

  if (!started) {
    return (
      <ExamIntroScreen
        module="Speaking"
        title={session.title}
        meta="3 parts · ~14 minutes · Real IELTS format"
        instructions={[
          'Part 1: Short questions on familiar topics (4–5 minutes).',
          'Part 2: Cue card with 1 minute preparation, then 2-minute long turn.',
          'Part 3: Abstract discussion related to Part 2 (4–5 minutes).',
          'Speak clearly and naturally — the examiner assesses fluency, not opinions.',
        ]}
        onStart={() => setStarted(true)}
        startLabel="Begin speaking test"
        exitHref={examExitHrefs.speaking}
      />
    )
  }

  if (phase === 'finished') {
    return (
      <ExamResultsScreen
        module="Speaking"
        title="Speaking session complete"
        subtitle={session.title}
        exitHref={examExitHrefs.speaking}
        exitLabel="Return to practice"
      >
        {submission?.feedback ? (
          <div className="rounded border border-black/8 bg-[#f8f8f8] p-5 dark:border-white/8 dark:bg-[#161616]">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">Overall band score</h3>
              <BandBadge score={submission.feedback.overallBand} />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {[
                { name: 'Fluency & Coherence', band: submission.feedback.fluencyCoherence },
                { name: 'Lexical Resource', band: submission.feedback.lexicalResource },
                { name: 'Grammatical Range', band: submission.feedback.grammaticalRange },
                { name: 'Pronunciation', band: submission.feedback.pronunciation },
              ].map((c) => (
                <div key={c.name} className="rounded border border-black/8 bg-white p-3 text-center dark:border-white/8 dark:bg-[#1e1e1e]">
                  <p className="mb-1 text-xs text-muted-foreground">{c.name}</p>
                  <BandBadge score={c.band} />
                </div>
              ))}
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{submission.feedback.comments}</p>
          </div>
        ) : (
          <div className="rounded border border-black/8 bg-[#f8f8f8] p-6 text-center dark:border-white/8 dark:bg-[#161616]">
            <p className="text-sm text-muted-foreground">
              Your responses have been submitted. Feedback will be available within 2 hours.
            </p>
          </div>
        )}
        <div className="mt-8 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 gap-2 rounded-md"
            onClick={() => {
              setStarted(false)
              setPartIdx(0)
              setPhase('intro')
            }}
            asChild
          >
            <Link href={`/speaking/${session.id}`}>
              <RotateCcw className="size-4" />
              Try again
            </Link>
          </Button>
          <Button
            className="flex-1 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48]"
            asChild
          >
            <Link href={examExitHrefs.speaking}>Return to practice</Link>
          </Button>
        </div>
      </ExamResultsScreen>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <ExamToolbar
        module="Speaking"
        exitHref={examExitHrefs.speaking}
        center={
          <>
            {session.parts.map((p, i) => (
              <ExamSectionTab key={p.part} active={i === partIdx} onClick={() => {}}>
                Part {p.part}
              </ExamSectionTab>
            ))}
          </>
        }
      />

      <ScrollArea className="flex-1 bg-[#f8f8f8] dark:bg-[#181818]">
        <div className="mx-auto max-w-xl space-y-6 p-6">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Part {currentPart.part}</p>
            <h2 className="text-xl font-bold">{currentPart.topic}</h2>
          </div>

          {/* Cue card (Part 2) */}
          {currentPart.cueCardPrompt && (
            <div className="rounded border border-dashed border-black/20 bg-white p-5 dark:border-white/20 dark:bg-[#1e1e1e]">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Cue card
              </p>
              <p className="mb-2 text-sm font-semibold">{currentPart.questions[0]}</p>
              <p className="whitespace-pre-line text-sm text-muted-foreground">
                {currentPart.cueCardPrompt}
              </p>
            </div>
          )}

          {!currentPart.cueCardPrompt && (
            <div className="space-y-2">
              {currentPart.questions.map((q, i) => (
                <div
                  key={i}
                  className="rounded border border-black/8 bg-white px-4 py-3 text-sm dark:border-white/8 dark:bg-[#1e1e1e]"
                >
                  {q}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4 rounded border border-black/10 bg-white p-6 text-center dark:border-white/10 dark:bg-[#1e1e1e]">
            {phase === 'intro' && (
              <>
                <p className="text-sm text-muted-foreground">
                  {currentPart.preparationSeconds
                    ? `You will have ${currentPart.preparationSeconds}s to prepare, then ${currentPart.speakingMinutes} minutes to speak.`
                    : `You have ${currentPart.speakingMinutes} minutes to answer all questions.`}
                </p>
                <Button
                  onClick={startPrep}
                  className="gap-2 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48]"
                >
                  <Play className="h-4 w-4" />
                  {currentPart.preparationSeconds ? 'Start Preparation' : 'Start Speaking'}
                </Button>
              </>
            )}

            {phase === 'prep' && (
              <>
                <p className="text-sm font-semibold">Preparation Time</p>
                <div className="font-mono text-5xl font-bold tabular-nums">{prepTime}s</div>
                <Progress value={(1 - prepTime / (currentPart.preparationSeconds ?? 1)) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">Recording starts automatically</p>
              </>
            )}

            {phase === 'recording' && (
              <>
                <div className="flex items-center justify-center gap-2 text-destructive">
                  <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                  <span className="text-sm font-semibold">Recording</span>
                  <span className="font-mono text-sm">{Math.floor(recordingTime / 60)}:{String(recordingTime % 60).padStart(2, '0')}</span>
                </div>
                <div className="flex h-16 items-end justify-center gap-0.5">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-[#2b2f36] dark:bg-white/70"
                      style={{ height: `${20 + Math.random() * 60}%`, animation: `pulse ${0.5 + Math.random() * 0.5}s ease-in-out infinite` }}
                    />
                  ))}
                </div>
                <Button variant="destructive" onClick={stopRecording} className="gap-2">
                  <Square className="h-4 w-4 fill-current" />
                  Stop Recording
                </Button>
              </>
            )}

            {phase === 'done-part' && (
              <>
                <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Part {currentPart.part} complete</span>
                </div>
                <p className="text-sm text-muted-foreground">Recording saved. Duration: {Math.floor(recordingTime / 60)}:{String(recordingTime % 60).padStart(2, '0')}</p>
                <Button
                  onClick={() => {
                    if (partIdx < session.parts.length - 1) {
                      setPartIdx((i) => i + 1)
                      setPhase('intro')
                      setRecordingTime(0)
                    } else {
                      void finishSession()
                    }
                  }}
                  className="gap-2 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48]"
                >
                  {partIdx < session.parts.length - 1 ? (
                    <>Next Part <ChevronRight className="h-4 w-4" /></>
                  ) : (
                    <>View Feedback <CheckCircle className="h-4 w-4" /></>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
