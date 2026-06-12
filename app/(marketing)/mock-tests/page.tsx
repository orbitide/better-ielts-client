import { getAllMockTests, getMockTestSections } from '@/lib/data/mock-tests'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Clock, ArrowRight, BookMarked, Headphones, PenLine, Mic } from 'lucide-react'

export const metadata = {
  title: 'Mock Tests',
  description:
    'Take a full IELTS mock test under timed exam conditions. Includes all four skills: Listening (30 min), Reading (60 min), Writing (60 min), and Speaking (15 min).',
}

const difficultyBadge: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  intermediate: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  advanced: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
}

const skillIcon: Record<string, React.ElementType> = {
  listening: Headphones,
  reading: BookMarked,
  writing: PenLine,
  speaking: Mic,
}

export default async function MockTestsPage() {
  const tests = await getAllMockTests()
  const sectionsByTestId = new Map(
    await Promise.all(
      tests.map(async (test) => [test.id, (await getMockTestSections(test.id)).items] as const),
    ),
  )

  return (
    <div className="py-12 min-h-[85vh]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-3">Mock Tests</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Full-length IELTS simulations under real exam conditions. Complete all four skills in one session and receive an estimated band score.
          </p>
        </div>

        {/* Info banner */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 mb-10 flex flex-wrap gap-6 text-sm">
          {[
            { label: 'Listening', detail: '40 questions · 40 min' },
            { label: 'Reading', detail: '40 questions · 60 min' },
            { label: 'Writing', detail: 'Task 1 + Task 2 · 60 min' },
            { label: 'Speaking', detail: 'Parts 1–3 · ~15 min' },
          ].map((s) => (
            <div key={s.label}>
              <span className="font-semibold">{s.label}</span>
              <span className="text-muted-foreground ml-2">{s.detail}</span>
            </div>
          ))}
          <div className="ml-auto font-semibold text-primary">Total: ~2h 45min</div>
        </div>

        {/* Test cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tests.map((test) => (
            <div key={test.id} className="rounded-xl border bg-card p-6 flex flex-col gap-5">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="font-bold text-lg">{test.title}</h2>
                  <Badge variant="secondary" className={difficultyBadge[test.difficulty]}>
                    {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{test.description}</p>
              </div>

              {/* Section breakdown */}
              <div className="grid grid-cols-2 gap-2">
                {(sectionsByTestId.get(test.id) ?? []).map((section) => {
                  const Icon = skillIcon[section.skill] ?? BookMarked
                  return (
                    <div key={section.contentId} className="flex items-center gap-2 text-sm text-muted-foreground rounded-lg bg-muted/50 px-3 py-2">
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="capitalize">{section.skill}</span>
                      <span className="ml-auto tabular-nums">{section.durationMinutes}m</span>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{test.durationMinutes} minutes total</span>
                  <Badge variant="outline" className="ml-2">{test.type}</Badge>
                </div>
                <Link href={`/mock-test/${test.id}`} className={cn(buttonVariants(), 'gap-2')}>
                  Start Test
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
