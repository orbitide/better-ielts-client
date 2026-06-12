'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BandBadge } from '@/components/shared/BandBadge'
import type { MockTestDetail, MockTestSection } from '@/lib/types/mock-test'
import { Headphones, BookMarked, PenLine, Mic, Clock, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ExamIntroScreen } from '@/components/exam/ExamIntroScreen'
import { ExamToolbar, ExamSectionTab } from '@/components/exam/ExamToolbar'
import { ExamResultsScreen } from '@/components/exam/ExamResultsScreen'
import { examExitHrefs } from '@/lib/utils/exam-routes'

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

export function MockTestShell({ test, sections }: { test: MockTestDetail; sections: MockTestSection[] }) {
  const [started, setStarted] = useState(false)
  const [sectionIdx, setSectionIdx] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())
  const [finished, setFinished] = useState(false)

  const currentSection = sections[sectionIdx]
  const progress = (completedSections.size / sections.length) * 100

  const markComplete = () => {
    const next = new Set(completedSections).add(sectionIdx)
    setCompletedSections(next)
    if (sectionIdx < sections.length - 1) {
      setSectionIdx((i) => i + 1)
    } else {
      setFinished(true)
    }
  }

  const resetTest = () => {
    setStarted(false)
    setFinished(false)
    setCompletedSections(new Set())
    setSectionIdx(0)
  }

  if (!started) {
    return (
      <ExamIntroScreen
        module={`${test.type} IELTS Mock Test`}
        title={test.title}
        meta={`${sections.length} sections · ${test.durationMinutes} minutes total`}
        instructions={[
          test.description,
          ...sections.map(
            (s) =>
              `${s.skill.charAt(0).toUpperCase() + s.skill.slice(1)}: ${s.durationMinutes} minutes`,
          ),
          'Find a quiet place and treat this like the real exam. Avoid pausing between sections.',
        ]}
        onStart={() => setStarted(true)}
        startLabel="Begin mock test"
        exitHref={examExitHrefs.mockTest}
      />
    )
  }

  if (finished) {
    return (
      <ExamResultsScreen
        module="Full Mock Test"
        title="Mock test complete"
        subtitle="Estimated band scores based on your performance"
        exitHref={examExitHrefs.mockTest}
        exitLabel="Return to mock tests"
      >
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">Overall estimated band</p>
          <BandBadge score={MOCK_RESULTS.overall} className="text-2xl px-6 py-2.5" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {(['listening', 'reading', 'writing', 'speaking'] as const).map((skill) => {
            const Icon = skillIcon[skill]
            return (
              <div
                key={skill}
                className="flex items-center justify-between rounded border border-black/8 bg-[#f8f8f8] px-3 py-2.5 dark:border-white/8 dark:bg-[#161616]"
              >
                <div className="flex items-center gap-2 text-sm capitalize">
                  <Icon className="size-4 text-muted-foreground" />
                  {skill}
                </div>
                <BandBadge score={MOCK_RESULTS[skill]} />
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1 rounded-md" onClick={resetTest}>
            Retake
          </Button>
          <Button
            className="flex-1 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48]"
            asChild
          >
            <Link href={examExitHrefs.mockTest}>Return to mock tests</Link>
          </Button>
        </div>
      </ExamResultsScreen>
    )
  }

  const Icon = skillIcon[currentSection.skill] ?? BookMarked

  return (
    <div className="flex h-full flex-col">
      <ExamToolbar
        module="Full Mock Test"
        exitHref={examExitHrefs.mockTest}
        center={
          <>
            {sections.map((s, i) => {
              const SIcon = skillIcon[s.skill] ?? BookMarked
              return (
                <ExamSectionTab
                  key={s.id}
                  active={i === sectionIdx}
                  onClick={() => !completedSections.has(i) && i <= sectionIdx && setSectionIdx(i)}
                >
                  <span className="inline-flex items-center gap-1 capitalize">
                    {completedSections.has(i) && <CheckCircle className="size-3" />}
                    <SIcon className="size-3" />
                    {s.skill}
                  </span>
                </ExamSectionTab>
              )
            })}
          </>
        }
        trailing={
          <span className="text-xs text-white/60">
            {completedSections.size}/{sections.length} done
          </span>
        }
      />

      <div className="border-b border-black/10 bg-white px-4 py-2 dark:border-white/10 dark:bg-[#1c1c1c]">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
          <span>
            Section {sectionIdx + 1} of {sections.length}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {currentSection.durationMinutes} min
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div className="flex flex-1 items-center justify-center bg-[#f8f8f8] p-6 dark:bg-[#181818]">
        <div className="w-full max-w-lg text-center">
          <div className="overflow-hidden rounded border border-black/10 bg-white dark:border-white/10 dark:bg-[#1c1c1c]">
            <div className="px-8 py-10">
              <div className="mx-auto mb-4 inline-flex size-14 items-center justify-center rounded-full bg-[#2b2f36]/10">
                <Icon className="size-7 text-[#2b2f36] dark:text-white/80" />
              </div>
              <h2 className="mb-1 text-xl font-semibold capitalize">{currentSection.skill}</h2>
              <p className="mb-8 text-sm text-muted-foreground">
                {currentSection.durationMinutes} minutes — complete this section, then return here
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2 rounded-md" asChild>
                  <Link href={skillHref[currentSection.skill] ?? '/dashboard'} target="_blank">
                    Open {currentSection.skill}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  className="flex-1 gap-2 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48]"
                  onClick={markComplete}
                >
                  Mark complete
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
