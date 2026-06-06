'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { BandBadge } from '@/components/shared/BandBadge'
import type { SpeakingSession } from '@/lib/types/speaking'
import { Mic, MicOff, Play, Square, ChevronRight, Clock, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const PART_FEEDBACK = [
  { band: 6.5, strengths: ['Good fluency with some hesitation', 'Relevant vocabulary used'], improvements: ['Develop answers further', 'Use more idiomatic expressions'] },
  { band: 7.0, strengths: ['Well-structured long turn', 'Covered all cue card points'], improvements: ['More complex grammar structures', 'Reduce self-correction'] },
  { band: 6.5, strengths: ['Good range of opinion language', 'Relevant ideas discussed'], improvements: ['Speculate and hypothesise more', 'Develop abstract ideas further'] },
]

export function SpeakingSessionShell({ session }: { session: SpeakingSession }) {
  const [started, setStarted] = useState(false)
  const [partIdx, setPartIdx] = useState(0)
  const [phase, setPhase] = useState<'intro' | 'prep' | 'recording' | 'done-part' | 'finished'>('intro')
  const [isRecording, setIsRecording] = useState(false)
  const [prepTime, setPrepTime] = useState(0)
  const [recordingTime, setRecordingTime] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const mediaRef = useRef<MediaRecorder | null>(null)

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

  if (!started) {
    return (
      <div className="flex items-center justify-center min-h-full p-6">
        <div className="max-w-md w-full text-center">
          <div className="rounded-2xl border bg-card p-8">
            <Badge variant="secondary" className="mb-4">Speaking Practice</Badge>
            <h1 className="text-2xl font-bold mb-2">{session.title}</h1>
            <p className="text-muted-foreground text-sm mb-6">
              3 parts · ~14 minutes total · Real IELTS format
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {session.parts.map((p) => (
                <div key={p.part} className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground">Part {p.part}</p>
                  <p className="font-semibold text-sm">{p.speakingMinutes}m</p>
                </div>
              ))}
            </div>
            <Button size="lg" className="w-full" onClick={() => setStarted(true)}>
              Start Speaking Session
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'finished') {
    return (
      <ScrollArea className="h-full">
        <div className="p-6 max-w-2xl mx-auto space-y-6">
          <div className="text-center py-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30 mb-4">
              <CheckCircle className="h-7 w-7 text-pink-600 dark:text-pink-400" />
            </div>
            <h2 className="text-2xl font-bold">Session Complete!</h2>
          </div>
          {session.parts.map((part, i) => {
            const fb = PART_FEEDBACK[i]
            return (
              <div key={part.part} className="rounded-xl border bg-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Part {part.part}: {part.topic}</h3>
                  <BandBadge score={fb.band} />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strengths</p>
                    <ul className="space-y-0.5 text-muted-foreground">
                      {fb.strengths.map((s) => <li key={s}>• {s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Improve</p>
                    <ul className="space-y-0.5 text-muted-foreground">
                      {fb.improvements.map((s) => <li key={s}>• {s}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
          <Button className="w-full" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </ScrollArea>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50 shrink-0">
        <div className="flex gap-1">
          {session.parts.map((p, i) => (
            <div
              key={p.part}
              className={cn(
                'text-xs px-3 py-1 rounded-full border',
                i === partIdx ? 'bg-primary text-primary-foreground border-primary' : 'opacity-50'
              )}
            >
              Part {p.part}
            </div>
          ))}
        </div>
        <Badge variant="secondary">Speaking Practice</Badge>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 max-w-xl mx-auto space-y-6">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Part {currentPart.part}</p>
            <h2 className="text-xl font-bold">{currentPart.topic}</h2>
          </div>

          {/* Cue card (Part 2) */}
          {currentPart.cueCardPrompt && (
            <div className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-5">
              <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">Cue Card</p>
              <p className="text-sm font-semibold mb-2">{currentPart.questions[0]}</p>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{currentPart.cueCardPrompt}</p>
            </div>
          )}

          {/* Questions (Part 1 & 3) */}
          {!currentPart.cueCardPrompt && (
            <div className="space-y-2">
              {currentPart.questions.map((q, i) => (
                <div key={i} className="rounded-lg bg-muted/50 px-4 py-3 text-sm">{q}</div>
              ))}
            </div>
          )}

          {/* Recording interface */}
          <div className="rounded-xl border bg-card p-6 text-center space-y-4">
            {phase === 'intro' && (
              <>
                <p className="text-sm text-muted-foreground">
                  {currentPart.preparationSeconds
                    ? `You will have ${currentPart.preparationSeconds}s to prepare, then ${currentPart.speakingMinutes} minutes to speak.`
                    : `You have ${currentPart.speakingMinutes} minutes to answer all questions.`}
                </p>
                <Button onClick={startPrep} className="gap-2">
                  <Play className="h-4 w-4" />
                  {currentPart.preparationSeconds ? 'Start Preparation' : 'Start Speaking'}
                </Button>
              </>
            )}

            {phase === 'prep' && (
              <>
                <p className="text-sm font-semibold">Preparation Time</p>
                <div className="text-5xl font-mono font-bold text-primary">{prepTime}s</div>
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
                      className="w-1.5 rounded-full bg-primary"
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
                      setPhase('finished')
                    }
                  }}
                  className="gap-2"
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
