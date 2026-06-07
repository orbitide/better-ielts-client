'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  Headphones,
  BookOpenText,
  PenLine,
  Mic,
  LayoutGrid,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useOnboardingStore } from '@/lib/store/onboarding-store'
import type { OnboardingData } from '@/lib/types/onboarding'

const COUNTRIES = [
  'Australia', 'Canada', 'Denmark', 'France', 'Germany', 'Ireland',
  'Japan', 'Malaysia', 'Netherlands', 'New Zealand', 'Norway',
  'Singapore', 'South Korea', 'Sweden', 'Switzerland', 'UAE', 'UK', 'USA',
]

const BAND_LABELS: Record<string, string> = {
  '5.5-6': '5.5 – 6',
  '6-6.5': '6 – 6.5',
  '6.5-7': '6.5 – 7',
  '7-7.5': '7 – 7.5',
  '7.5-8': '7.5 – 8',
  '8+': '8 +',
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  fluent: 'Fluent',
}

const LEVEL_DESC: Record<string, string> = {
  beginner: 'Still building basics',
  intermediate: 'Comfortable but not confident',
  advanced: 'Strong, some gaps',
  fluent: 'Near-native ability',
}

const EXP_LABELS: Record<string, string> = {
  'brand-new': 'Brand new to me',
  'know-basics': 'I know the basics',
  'taken-before': "I've taken it before",
  retaking: 'Retaking to improve',
}

const DATE_LABELS: Record<string, string> = {
  '1-month': 'Within 1 month',
  '1-3-months': '1 – 3 months',
  '3-6-months': '3 – 6 months',
  '1-year': 'About 1 year',
  'no-date': 'No set date yet',
}

const PURPOSE_LABELS: Record<string, string> = {
  'study-abroad': 'Study abroad',
  'work-abroad': 'Work abroad',
  immigration: 'Immigration',
  personal: 'Personal goal',
}

const PURPOSE_DESC: Record<string, string> = {
  'study-abroad': 'University or college',
  'work-abroad': 'Career opportunity',
  immigration: 'Residency or citizenship',
  personal: 'Self-improvement',
}

const SKILLS = [
  { id: 'listening' as const, label: 'Listening', Icon: Headphones },
  { id: 'reading' as const, label: 'Reading', Icon: BookOpenText },
  { id: 'writing' as const, label: 'Writing', Icon: PenLine },
  { id: 'speaking' as const, label: 'Speaking', Icon: Mic },
  { id: 'overall' as const, label: 'Overall / Mix', Icon: LayoutGrid },
]

const TOTAL_STEPS = 8

// Reusable single-select card
function OptionCard({
  selected,
  disabled,
  badge,
  onClick,
  children,
}: {
  selected: boolean
  disabled?: boolean
  badge?: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      {badge && (
        <span className="absolute -right-2 -top-2 z-10 rounded-full border bg-muted px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground">
          {badge}
        </span>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'w-full rounded-xl border-2 p-4 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          selected
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-border hover:border-primary/40 hover:bg-muted/40',
          disabled && 'cursor-not-allowed opacity-40',
        )}
      >
        {children}
      </button>
    </div>
  )
}

export function OnboardingFlow() {
  const router = useRouter()
  const { completed, data, setField, complete } = useOnboardingStore()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (completed) router.replace('/dashboard')
  }, [completed, router])

  if (completed) return null

  // Progress bar: steps 1-8 are survey steps
  const progressPct = step >= 1 ? Math.min((step / TOTAL_STEPS) * 100, 100) : 0
  const showProgress = step >= 1

  function advance() {
    setStep((s) => s + 1)
  }

  // Auto-advance after selecting a single-select option
  function pick<K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) {
    setField(key, value)
    setTimeout(() => {
      if (key === 'purpose') {
        // Skip country step if personal goal
        setStep((value as string) === 'personal' ? 8 : 7)
      } else {
        setStep((s) => s + 1)
      }
    }, 180)
  }

  function goBack() {
    // Skills step: skip country backwards if purpose was personal
    if (step === 8 && data.purpose === 'personal') {
      setStep(6)
    } else {
      setStep((s) => s - 1)
    }
  }

  function handleFinish() {
    complete()
    router.push('/dashboard')
  }

  const canContinue =
    step === 7 ? !!data.country
    : step === 8 ? (data.focusSkills?.length ?? 0) > 0
    : true

  // Effective step display number (country is step 7 but counts as 7 of 8)
  const displayStep = step

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Progress bar */}
      {showProgress && (
        <div className="h-1 w-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        {/* Brand */}
        <div className="mb-10 flex items-center gap-2 text-lg font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-4 w-4 text-primary-foreground" />
          </div>
          Better IELTS
        </div>

        <div className="w-full max-w-md">

          {/* ── Step 0: Welcome ─────────────────────────────────────── */}
          {step === 0 && (
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" /> Just a few quick questions
              </div>
              <h1 className="mb-3 text-3xl font-bold tracking-tight">
                Welcome to Better IELTS
              </h1>
              <p className="mb-8 text-muted-foreground">
                Let's personalise your study plan so every session counts toward your target band.
              </p>
              <Button size="lg" onClick={advance} className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* ── Step 1: Exam ─────────────────────────────────────────── */}
          {step === 1 && (
            <div>
              <StepLabel step={1} total={TOTAL_STEPS} />
              <h2 className="mb-6 text-2xl font-bold">Which exam are you preparing for?</h2>
              <div className="grid grid-cols-2 gap-3">
                <OptionCard
                  selected={data.exam === 'ielts'}
                  onClick={() => pick('exam', 'ielts')}
                >
                  <div className="font-bold">IELTS</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Academic & General</div>
                </OptionCard>
                <OptionCard
                  selected={false}
                  disabled
                  badge="Soon"
                  onClick={() => {}}
                >
                  <div className="font-bold">TOEFL</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">iBT</div>
                </OptionCard>
              </div>
              <BackButton step={step} onBack={goBack} />
            </div>
          )}

          {/* ── Step 2: Target band ──────────────────────────────────── */}
          {step === 2 && (
            <div>
              <StepLabel step={2} total={TOTAL_STEPS} />
              <h2 className="mb-6 text-2xl font-bold">What's your target band score?</h2>
              <div className="grid grid-cols-3 gap-3">
                {(Object.keys(BAND_LABELS) as OnboardingData['targetBand'][]).map((band) => (
                  <OptionCard
                    key={band}
                    selected={data.targetBand === band}
                    onClick={() => pick('targetBand', band)}
                  >
                    <div className="text-center text-lg font-bold">{BAND_LABELS[band]}</div>
                  </OptionCard>
                ))}
              </div>
              <BackButton step={step} onBack={goBack} />
            </div>
          )}

          {/* ── Step 3: English level ────────────────────────────────── */}
          {step === 3 && (
            <div>
              <StepLabel step={3} total={TOTAL_STEPS} />
              <h2 className="mb-6 text-2xl font-bold">How would you describe your English?</h2>
              <div className="grid grid-cols-1 gap-3">
                {(['beginner', 'intermediate', 'advanced', 'fluent'] as const).map((lvl) => (
                  <OptionCard
                    key={lvl}
                    selected={data.englishLevel === lvl}
                    onClick={() => pick('englishLevel', lvl)}
                  >
                    <div className="font-semibold">{LEVEL_LABELS[lvl]}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{LEVEL_DESC[lvl]}</div>
                  </OptionCard>
                ))}
              </div>
              <BackButton step={step} onBack={goBack} />
            </div>
          )}

          {/* ── Step 4: Experience ───────────────────────────────────── */}
          {step === 4 && (
            <div>
              <StepLabel step={4} total={TOTAL_STEPS} />
              <h2 className="mb-6 text-2xl font-bold">Have you taken IELTS before?</h2>
              <div className="grid grid-cols-1 gap-3">
                {(['brand-new', 'know-basics', 'taken-before', 'retaking'] as const).map((exp) => (
                  <OptionCard
                    key={exp}
                    selected={data.experience === exp}
                    onClick={() => pick('experience', exp)}
                  >
                    <div className="font-medium">{EXP_LABELS[exp]}</div>
                  </OptionCard>
                ))}
              </div>
              <BackButton step={step} onBack={goBack} />
            </div>
          )}

          {/* ── Step 5: Test date ────────────────────────────────────── */}
          {step === 5 && (
            <div>
              <StepLabel step={5} total={TOTAL_STEPS} />
              <h2 className="mb-6 text-2xl font-bold">When is your test?</h2>
              <div className="grid grid-cols-1 gap-3">
                {(['1-month', '1-3-months', '3-6-months', '1-year', 'no-date'] as const).map((d) => (
                  <OptionCard
                    key={d}
                    selected={data.testDate === d}
                    onClick={() => pick('testDate', d)}
                  >
                    <div className="font-medium">{DATE_LABELS[d]}</div>
                  </OptionCard>
                ))}
              </div>
              <BackButton step={step} onBack={goBack} />
            </div>
          )}

          {/* ── Step 6: Purpose ──────────────────────────────────────── */}
          {step === 6 && (
            <div>
              <StepLabel step={6} total={TOTAL_STEPS} />
              <h2 className="mb-6 text-2xl font-bold">What's your main purpose?</h2>
              <div className="grid grid-cols-2 gap-3">
                {(['study-abroad', 'work-abroad', 'immigration', 'personal'] as const).map((p) => (
                  <OptionCard
                    key={p}
                    selected={data.purpose === p}
                    onClick={() => pick('purpose', p)}
                  >
                    <div className="font-semibold">{PURPOSE_LABELS[p]}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{PURPOSE_DESC[p]}</div>
                  </OptionCard>
                ))}
              </div>
              <BackButton step={step} onBack={goBack} />
            </div>
          )}

          {/* ── Step 7: Country ──────────────────────────────────────── */}
          {step === 7 && (
            <div>
              <StepLabel step={7} total={TOTAL_STEPS} />
              <h2 className="mb-2 text-2xl font-bold">Where are you dreaming of going?</h2>
              <p className="mb-6 text-sm text-muted-foreground">Pick your destination country.</p>
              <Select
                value={data.country ?? ''}
                onValueChange={(val) => { if (val) setField('country', val) }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country…" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={goBack} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  disabled={!canContinue}
                  onClick={advance}
                  className="flex-1 gap-1.5"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 8: Skills focus ─────────────────────────────────── */}
          {step === 8 && (
            <div>
              <StepLabel step={displayStep} total={TOTAL_STEPS} />
              <h2 className="mb-2 text-2xl font-bold">Which skills need the most focus?</h2>
              <p className="mb-6 text-sm text-muted-foreground">Select all that apply.</p>
              <div className="grid grid-cols-2 gap-3">
                {SKILLS.map(({ id, label, Icon }) => {
                  const selected = (data.focusSkills ?? []).includes(id)
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        const curr = data.focusSkills ?? []
                        setField(
                          'focusSkills',
                          selected ? curr.filter((s) => s !== id) : [...curr, id],
                        )
                      }}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-xl border-2 p-5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        selected
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/40 hover:bg-muted/40',
                      )}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="font-medium">{label}</span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={goBack} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  disabled={!canContinue}
                  onClick={advance}
                  className="flex-1 gap-1.5"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 9: Summary ──────────────────────────────────────── */}
          {step === 9 && (
            <div>
              <div className="mb-6 flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 shrink-0 text-primary" />
                <div>
                  <h2 className="text-2xl font-bold">You're all set!</h2>
                  <p className="text-sm text-muted-foreground">Here's your profile before we begin.</p>
                </div>
              </div>

              <div className="divide-y rounded-xl border bg-muted/20">
                {buildSummaryRows(data).map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={goBack} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={handleFinish} className="flex-1 gap-1.5">
                  Go to Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function StepLabel({ step, total }: { step: number; total: number }) {
  return (
    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      Step {step} of {total}
    </p>
  )
}

function BackButton({ step, onBack }: { step: number; onBack: () => void }) {
  return (
    <div className="mt-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="gap-1.5 text-muted-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </Button>
    </div>
  )
}

function buildSummaryRows(data: Partial<OnboardingData>): { label: string; value: string }[] {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  const rows: { label: string; value: string }[] = [
    { label: 'Exam', value: data.exam?.toUpperCase() ?? '—' },
    { label: 'Target Band', value: data.targetBand ? BAND_LABELS[data.targetBand] : '—' },
    { label: 'English Level', value: data.englishLevel ? LEVEL_LABELS[data.englishLevel] : '—' },
    { label: 'Experience', value: data.experience ? EXP_LABELS[data.experience] : '—' },
    { label: 'Test Date', value: data.testDate ? DATE_LABELS[data.testDate] : '—' },
    { label: 'Purpose', value: data.purpose ? PURPOSE_LABELS[data.purpose] : '—' },
  ]

  if (data.purpose !== 'personal' && data.country) {
    rows.push({ label: 'Country', value: data.country })
  }

  rows.push({
    label: 'Focus Skills',
    value: (data.focusSkills ?? []).map(capitalize).join(', ') || '—',
  })

  return rows
}
