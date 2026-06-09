'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Leaf, Cpu, GraduationCap, Heart, Plane, Briefcase,
  Users, Palette, UtensilsCrossed, Trophy, Building2, Radio,
  PhoneOff, Mic, MicOff, ChevronRight, RotateCcw, CheckCircle,
  Star, Check,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ExamToolbar } from '@/components/exam/ExamToolbar'
import { ExamResultsScreen } from '@/components/exam/ExamResultsScreen'
import { examExitHrefs } from '@/lib/utils/exam-routes'
import { callSelectionTopics, callPromptCards } from '@/lib/mock/call-topics'
import type { CallPhase, CallPromptCard, CallSummary } from '@/lib/types/call'
import { cn } from '@/lib/utils'

const TOPIC_ICONS: Record<string, LucideIcon> = {
  environment: Leaf,
  technology: Cpu,
  education: GraduationCap,
  health: Heart,
  travel: Plane,
  work: Briefcase,
  family: Users,
  arts: Palette,
  food: UtensilsCrossed,
  sport: Trophy,
  cities: Building2,
  media: Radio,
}

const NEGATIVE_FLAGS = [
  { id: 'contact-info', label: 'Asked for phone number or personal contact info' },
  { id: 'personal-questions', label: 'Asked inappropriate personal questions' },
  { id: 'offensive-language', label: 'Used offensive or inappropriate language' },
  { id: 'silent', label: 'Did not engage or stayed mostly silent' },
  { id: 'dominated', label: 'Dominated the conversation without listening' },
] as const

function formatCallTime(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

function StarRating({
  value,
  onChange,
  size = 'md',
}: {
  value: number | null
  onChange: (v: number) => void
  size?: 'sm' | 'md'
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <Star
            className={cn(
              size === 'md' ? 'size-7' : 'size-5',
              star <= (value ?? 0)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-none text-muted-foreground/30',
            )}
          />
        </button>
      ))}
    </div>
  )
}

export function CallShell() {
  const [phase, setPhase] = useState<CallPhase>('setup')
  const [selectedTopicIds, setSelectedTopicIds] = useState<Set<string>>(new Set())
  const [matchProgress, setMatchProgress] = useState(0)
  const [callSeconds, setCallSeconds] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [promptIndex, setPromptIndex] = useState(0)
  const [shuffledPrompts, setShuffledPrompts] = useState<CallPromptCard[]>([])
  const [summary, setSummary] = useState<CallSummary | null>(null)

  // Review state
  const [reviewOverall, setReviewOverall] = useState<number | null>(null)
  const [reviewFluency, setReviewFluency] = useState<number | null>(null)
  const [reviewEngagement, setReviewEngagement] = useState<number | null>(null)
  const [reviewVocabulary, setReviewVocabulary] = useState<number | null>(null)
  const [reviewFlags, setReviewFlags] = useState<Set<string>>(new Set())
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearInterval_ = () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  const clearTimeout_ = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }

  useEffect(() => () => { clearInterval_(); clearTimeout_() }, [])

  function toggleTopic(id: string) {
    setSelectedTopicIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleFlag(id: string) {
    setReviewFlags((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function startMatching() {
    setPhase('matching')
    setMatchProgress(0)
    intervalRef.current = setInterval(() => {
      setMatchProgress((prev) => {
        if (prev >= 100) {
          clearInterval_()
          setPhase('connecting')
          timeoutRef.current = setTimeout(() => {
            const shuffled = [...callPromptCards].sort(() => Math.random() - 0.5)
            setShuffledPrompts(shuffled)
            setPromptIndex(0)
            setCallSeconds(0)
            setPhase('active')
            intervalRef.current = setInterval(() => setCallSeconds((s) => s + 1), 1000)
          }, 800)
          return 100
        }
        return prev + 2.5
      })
    }, 75)
  }

  function endCall() {
    clearInterval_()
    clearTimeout_()
    setSummary({
      durationSeconds: callSeconds,
      topicsDiscussed: shuffledPrompts.slice(0, promptIndex + 1).map((p) => p.topicLabel),
    })
    setPhase('review')
  }

  function submitReview() {
    setReviewSubmitted(true)
    setPhase('ended')
  }

  function skipReview() {
    setReviewSubmitted(false)
    setPhase('ended')
  }

  function resetToSetup() {
    setPhase('setup')
    setSelectedTopicIds(new Set())
    setMatchProgress(0)
    setCallSeconds(0)
    setIsMuted(false)
    setPromptIndex(0)
    setShuffledPrompts([])
    setSummary(null)
    setReviewOverall(null)
    setReviewFluency(null)
    setReviewEngagement(null)
    setReviewVocabulary(null)
    setReviewFlags(new Set())
    setReviewSubmitted(false)
  }

  const currentPrompt = shuffledPrompts[promptIndex]

  // ── Setup ──────────────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="flex h-full flex-col">
        <ExamToolbar module="Speaking Call" exitHref={examExitHrefs.call} exitLabel="Exit" />
        <div className="flex flex-1 items-center justify-center overflow-y-auto p-6">
          <div className="w-full max-w-lg">
            <div className="overflow-hidden rounded border border-black/10 bg-[#f8f8f8] shadow-sm dark:border-white/10 dark:bg-[#1c1c1c]">
              <div className="border-b border-black/8 bg-[#2b2f36] px-6 py-4 dark:border-white/8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  Live Speaking Practice
                </p>
                <p className="mt-0.5 text-sm font-medium text-white">
                  Choose topics you'd like to discuss
                </p>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {callSelectionTopics.map((topic) => {
                    const Icon = TOPIC_ICONS[topic.icon] ?? Leaf
                    const isSelected = selectedTopicIds.has(topic.id)
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => toggleTopic(topic.id)}
                        className={cn(
                          'flex cursor-pointer flex-col items-center gap-1.5 rounded border p-3 text-center text-xs transition-colors',
                          isSelected
                            ? 'border-primary bg-primary/8 ring-1 ring-primary/20 dark:bg-primary/10'
                            : 'border-black/10 bg-white hover:border-black/20 dark:border-white/10 dark:bg-[#161616] dark:hover:border-white/20',
                        )}
                      >
                        <Icon className={cn('size-5', isSelected ? 'text-primary' : 'text-muted-foreground')} />
                        <span className={cn('font-medium leading-tight', isSelected ? 'text-primary' : 'text-foreground')}>
                          {topic.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="border-t border-black/8 p-4 dark:border-white/8">
                <Button
                  onClick={startMatching}
                  disabled={selectedTopicIds.size === 0}
                  className="w-full rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48] disabled:opacity-50"
                >
                  Find a Partner
                </Button>
                {selectedTopicIds.size === 0 && (
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    Select at least one topic to continue
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Matching ───────────────────────────────────────────────────────────────
  if (phase === 'matching') {
    const selectedLabels = callSelectionTopics
      .filter((t) => selectedTopicIds.has(t.id))
      .map((t) => t.label)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-8 p-6 bg-[#f8f8f8] dark:bg-[#181818]">
        <div className="flex flex-col items-center gap-5">
          <div className="relative flex items-center justify-center">
            <span className="absolute size-32 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: '1.5s' }} />
            <span className="absolute size-24 rounded-full bg-primary/15 animate-pulse" />
            <div className="relative size-20 rounded-full bg-muted" />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold">Finding your speaking partner</p>
            <p className="mt-1 text-sm text-muted-foreground">Matching you with someone who shares your interests…</p>
          </div>
          <Progress value={matchProgress} className="h-1.5 w-64" />
          <div className="flex flex-wrap justify-center gap-1.5">
            {selectedLabels.map((label) => (
              <Badge key={label} variant="secondary">{label}</Badge>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Connecting ─────────────────────────────────────────────────────────────
  if (phase === 'connecting') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 p-6 bg-[#f8f8f8] dark:bg-[#181818]">
        <div className="size-20 rounded-full bg-[#2b2f36] text-white flex items-center justify-center text-2xl font-bold">
          AK
        </div>
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="size-5" />
          <span className="font-semibold">Partner found! Connecting…</span>
        </div>
      </div>
    )
  }

  // ── Active call ────────────────────────────────────────────────────────────
  if (phase === 'active' && currentPrompt) {
    const TopicIcon = TOPIC_ICONS[currentPrompt.topicId] ?? Leaf
    const userInitials = 'ME'

    return (
      <div className="flex h-full flex-col">
        <ExamToolbar
          module="Speaking Call"
          exitHref={examExitHrefs.call}
          exitLabel="End Call"
          onExit={endCall}
          center={
            <span className="font-mono text-sm tabular-nums">{formatCallTime(callSeconds)}</span>
          }
          trailing={
            <button
              type="button"
              onClick={() => setIsMuted((m) => !m)}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {isMuted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
            </button>
          }
        />

        <div className="flex flex-1 flex-col items-center justify-between gap-6 overflow-hidden p-6 bg-[#f8f8f8] dark:bg-[#181818]">
          {/* Avatars */}
          <div className="flex flex-1 items-center justify-center gap-12 sm:gap-20">
            <div className="flex flex-col items-center gap-2">
              <div className="size-20 rounded-full bg-[#2b2f36] text-white flex items-center justify-center text-xl font-bold">
                {userInitials}
              </div>
              <span className="text-xs text-muted-foreground">You</span>
            </div>

            <div className="flex h-12 items-end gap-0.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-[#2b2f36]/40 dark:bg-white/30"
                  style={{
                    height: `${30 + Math.random() * 50}%`,
                    animation: `pulse ${0.6 + (i % 4) * 0.15}s ease-in-out infinite`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="size-20 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xl font-bold">
                  AK
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#181818]" />
              </div>
              <span className="text-xs text-muted-foreground">Amira K.</span>
            </div>
          </div>

          {/* Topic prompt card */}
          <div className="w-full max-w-xl shrink-0">
            <div className="rounded border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#1c1c1c]">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  <TopicIcon className="size-4 text-muted-foreground" />
                  {currentPrompt.topicLabel}
                </span>
                <Badge variant="outline" className="text-xs">
                  Topic {promptIndex + 1} of {shuffledPrompts.length}
                </Badge>
              </div>

              <ol className="space-y-2 text-sm text-foreground/80">
                {currentPrompt.prompts.map((prompt, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="shrink-0 font-semibold text-muted-foreground">{i + 1}.</span>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-3 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setPromptIndex((i) => (i + 1) % shuffledPrompts.length)}
                >
                  Next Topic
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Review ─────────────────────────────────────────────────────────────────
  if (phase === 'review') {
    const optionalRatings = [
      { key: 'fluency', label: 'Fluency', desc: 'How smoothly and naturally they spoke', value: reviewFluency, onChange: setReviewFluency },
      { key: 'engagement', label: 'Engagement', desc: 'How communicative and responsive they were', value: reviewEngagement, onChange: setReviewEngagement },
      { key: 'vocabulary', label: 'Vocabulary', desc: 'Range and accuracy of words used', value: reviewVocabulary, onChange: setReviewVocabulary },
    ] as const

    return (
      <div className="flex h-full flex-col">
        <ExamToolbar module="Speaking Call" exitHref={examExitHrefs.call} exitLabel="Exit" />
        <div className="flex flex-1 items-start justify-center overflow-y-auto p-6">
          <div className="w-full max-w-lg">
            <div className="overflow-hidden rounded border border-black/10 bg-[#f8f8f8] shadow-sm dark:border-white/10 dark:bg-[#1c1c1c]">

              {/* Header */}
              <div className="border-b border-black/8 bg-[#2b2f36] px-6 py-4 dark:border-white/8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  After Call
                </p>
                <p className="mt-0.5 text-sm font-medium text-white">Rate your speaking partner — Amira K.</p>
              </div>

              <div className="divide-y divide-black/8 dark:divide-white/8">

                {/* Overall rating (required) */}
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">Overall rating</p>
                      <p className="text-xs text-muted-foreground">Required to submit</p>
                    </div>
                    <StarRating value={reviewOverall} onChange={setReviewOverall} size="md" />
                  </div>
                  {reviewOverall !== null && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {reviewOverall === 5 ? 'Excellent partner!' : reviewOverall === 4 ? 'Great session' : reviewOverall === 3 ? 'Good practice' : reviewOverall === 2 ? 'Could improve' : 'Not a great experience'}
                    </p>
                  )}
                </div>

                {/* Optional ratings */}
                <div className="px-6 py-5">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Detailed ratings <span className="normal-case font-normal text-muted-foreground/70">— optional</span>
                  </p>
                  <div className="space-y-4">
                    {optionalRatings.map(({ key, label, desc, value, onChange }) => (
                      <div key={key} className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                        <StarRating value={value} onChange={onChange} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Negative flags */}
                <div className="px-6 py-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Report a concern <span className="normal-case font-normal text-muted-foreground/70">— optional</span>
                  </p>
                  <div className="space-y-2">
                    {NEGATIVE_FLAGS.map(({ id, label }) => {
                      const isChecked = reviewFlags.has(id)
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleFlag(id)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded border px-3 py-2.5 text-left text-sm transition-colors',
                            isChecked
                              ? 'border-destructive/40 bg-destructive/5 text-destructive dark:bg-destructive/10'
                              : 'border-black/8 bg-white hover:border-black/15 dark:border-white/8 dark:bg-[#161616] dark:hover:border-white/15',
                          )}
                        >
                          <div className={cn(
                            'flex size-4 shrink-0 items-center justify-center rounded border transition-colors',
                            isChecked
                              ? 'border-destructive bg-destructive'
                              : 'border-black/20 dark:border-white/20',
                          )}>
                            {isChecked && <Check className="size-2.5 text-white" />}
                          </div>
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="border-t border-black/8 px-6 py-4 dark:border-white/8">
                <div className="flex gap-3">
                  <Button
                    onClick={submitReview}
                    disabled={reviewOverall === null}
                    className="flex-1 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48] disabled:opacity-50"
                  >
                    Submit Review
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={skipReview}
                    className="rounded-md text-muted-foreground hover:text-foreground"
                  >
                    Skip
                  </Button>
                </div>
                {reviewOverall === null && (
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    Select an overall rating to submit
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Ended ──────────────────────────────────────────────────────────────────
  if (phase === 'ended' && summary) {
    return (
      <ExamResultsScreen
        module="Speaking Call"
        title="Call Complete"
        subtitle={`You spoke for ${formatCallTime(summary.durationSeconds)}`}
        exitHref={examExitHrefs.call}
        exitLabel="Return to Practice"
      >
        <div className="text-center py-4">
          <p className="font-mono text-4xl font-bold tabular-nums">
            {formatCallTime(summary.durationSeconds)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Total speaking time</p>
        </div>

        {summary.topicsDiscussed.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Topics discussed
            </p>
            <div className="flex flex-wrap gap-2">
              {summary.topicsDiscussed.map((label) => (
                <Badge key={label} variant="secondary">{label}</Badge>
              ))}
            </div>
          </div>
        )}

        {reviewSubmitted && (
          <div className="mt-4 flex items-center gap-2 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CheckCircle className="size-4 shrink-0" />
            Review submitted — thank you for helping improve the community.
          </div>
        )}

        <p className="mt-4 text-sm text-muted-foreground">
          Great practice session! Regular speaking calls build fluency and confidence for the real exam.
        </p>

        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 gap-2 rounded-md"
            onClick={resetToSetup}
          >
            <RotateCcw className="size-4" />
            Call Again
          </Button>
          <Button className="flex-1 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48]" asChild>
            <Link href={examExitHrefs.call}>Return to Practice</Link>
          </Button>
        </div>
      </ExamResultsScreen>
    )
  }

  return null
}
