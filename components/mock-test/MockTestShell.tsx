'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BandBadge } from '@/components/shared/BandBadge'
import type { MockTest } from '@/lib/types/mock-test'
import { Headphones, BookMarked, PenLine, Mic, Clock, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const skillIcon: Record<string, React.ElementType> = {
  listening: Headphones,
  reading: BookMarked,
  writing: PenLine,
  speaking: Mic,
}

const skillHref: Record<string, string> = {
  listening: '/listening/test-1',
  reading: '/reading/test-1',
  writing: '/writing/task2-1',
  speaking: '/speaking/session-1',
}

const MOCK_RESULTS = {
  listening: 7.0,
  reading: 6.5,
  writing: 6.0,
  speaking: 6.5,
  overall: 6.5,
}

export function MockTestShell({ test }: { test: MockTest }) {
  const [started, setStarted] = useState(false)
  const [sectionIdx, setSectionIdx] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())
  const [finished, setFinished] = useState(false)

  const currentSection = test.sections[sectionIdx]
  const progress = (completedSections.size / test.sections.length) * 100

  const markComplete = () => {
    const next = new Set(completedSections).add(sectionIdx)
    setCompletedSections(next)
    if (sectionIdx < test.sections.length - 1) {
      setSectionIdx((i) => i + 1)
    } else {
      setFinished(true)
    }
  }

  if (!started) {
    return (
      <div className="flex items-center justify-center min-h-full p-6">
        <div className="max-w-lg w-full">
          <div className="rounded-2xl border bg-card p-8">
            <Badge variant="secondary" className="mb-4 capitalize">{test.type} IELTS</Badge>
            <h1 className="text-2xl font-bold mb-2">{test.title}</h1>
            <p className="text-muted-foreground text-sm mb-6">{test.description}</p>

            <div className="space-y-3 mb-8">
              {test.sections.map((section) => {
                const Icon = skillIcon[section.skill] ?? BookMarked
                return (
                  <div key={section.id} className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                    <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="capitalize font-medium">{section.skill}</span>
                    <span className="ml-auto text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {section.durationMinutes} min
                    </span>
                  </div>
                )
              })}
              <div className="flex items-center justify-between rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm font-semibold">
                <span>Total time</span>
                <span>{test.durationMinutes} minutes</span>
              </div>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg text-xs text-amber-700 dark:text-amber-300 mb-6">
              <p className="font-semibold mb-1">Before you begin:</p>
              <p>Find a quiet place, ensure you have 3+ hours free, and treat this like the real exam. Avoid pausing between sections.</p>
            </div>

            <Button size="lg" className="w-full" onClick={() => setStarted(true)}>
              Begin Mock Test
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="flex items-center justify-center min-h-full p-6">
        <div className="max-w-lg w-full space-y-6">
          <div className="text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
              <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Mock Test Complete!</h2>
            <p className="text-muted-foreground">Here are your estimated band scores.</p>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Overall Estimated Band</p>
              <BandBadge score={MOCK_RESULTS.overall} className="text-2xl px-6 py-2.5" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(['listening', 'reading', 'writing', 'speaking'] as const).map((skill) => {
                const Icon = skillIcon[skill]
                return (
                  <div key={skill} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2.5">
                    <div className="flex items-center gap-2 text-sm capitalize">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {skill}
                    </div>
                    <BandBadge score={MOCK_RESULTS[skill]} />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => { setStarted(false); setFinished(false); setCompletedSections(new Set()); setSectionIdx(0) }}>
              Retake
            </Button>
            <Button className="flex-1" asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const Icon = skillIcon[currentSection.skill] ?? BookMarked

  return (
    <div className="flex flex-col h-full">
      {/* Progress bar */}
      <div className="px-4 py-3 border-b shrink-0">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Section {sectionIdx + 1} of {test.sections.length}</span>
          <span>{completedSections.size} completed</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {test.sections.map((s, i) => {
            const SIcon = skillIcon[s.skill] ?? BookMarked
            return (
              <div
                key={s.id}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs border whitespace-nowrap ${
                  i === sectionIdx ? 'bg-primary text-primary-foreground border-primary'
                  : completedSections.has(i) ? 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800'
                  : ''
                }`}
              >
                {completedSections.has(i) && <CheckCircle className="h-3 w-3" />}
                <SIcon className="h-3 w-3" />
                <span className="capitalize">{s.skill}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Current section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          <div className="rounded-2xl border bg-card p-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-1 capitalize">{currentSection.skill}</h2>
            <p className="text-muted-foreground text-sm mb-6">
              {currentSection.durationMinutes} minutes · Complete this section in your dedicated tab
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2" asChild>
                <Link href={skillHref[currentSection.skill] ?? '/dashboard'} target="_blank">
                  Open {currentSection.skill} test
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button className="flex-1 gap-2" onClick={markComplete}>
                Mark as Done
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
