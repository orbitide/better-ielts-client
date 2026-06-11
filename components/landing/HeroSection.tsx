import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OnlineUsersBadge } from './OnlineUsersBadge'

const useCases = [
  'UK / Canada / Australia visa',
  'University admission',
  'Professional registration',
  'Permanent residency',
]

const bandGoals = [
  { band: '6.5', label: 'Most UK visas', color: 'bg-amber-400' },
  { band: '7.0', label: 'Top universities', color: 'bg-emerald-400' },
  { band: '7.5', label: 'Medical & legal', color: 'bg-blue-400' },
  { band: '8.0', label: 'Academic research', color: 'bg-violet-400' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 pt-14 pb-20 lg:pt-20 lg:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/4 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                IELTS Academic & General Training
              </div>
              <OnlineUsersBadge />
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-[1.1] mb-5">
              Go from Band 5 to{' '}
              <span className="text-primary">Band 7+</span>{' '}
              in 8 weeks
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
              Better IELTS gives you real exam practice and AI writing feedback for all four skills — Reading, Listening, Writing, and Speaking.
            </p>

            {/* Use case list */}
            <ul className="space-y-2 mb-8">
              {useCases.map((uc) => (
                <li key={uc} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  {uc}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard" className={cn(buttonVariants({ size: 'lg' }), 'gap-2 text-base')}>
                Start for Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/mock-tests" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'text-base')}>
                Try a Mock Test
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-4">No credit card required · Cancel anytime</p>
          </div>

          {/* Right — interactive band score visual */}
          <div className="rounded-2xl border bg-card shadow-xl overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/40">
              <div className="h-3 w-3 rounded-full bg-rose-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">betterielts.com/dashboard</span>
            </div>

            <div className="p-5 space-y-5">
              {/* Band score progress */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold">Your Band Score Journey</p>
                  <span className="text-xs text-muted-foreground">Last 3 months</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { skill: 'Listening', start: 5.5, current: 7.0, color: 'bg-blue-500' },
                    { skill: 'Reading', start: 5.5, current: 6.5, color: 'bg-violet-500' },
                    { skill: 'Writing', start: 5.0, current: 6.5, color: 'bg-orange-500' },
                    { skill: 'Speaking', start: 5.5, current: 7.0, color: 'bg-pink-500' },
                  ].map((row) => (
                    <div key={row.skill}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground w-20">{row.skill}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground line-through">{row.start}</span>
                          <span className="font-bold text-foreground">{row.current}</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            +{(row.current - row.start).toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${row.color}`}
                          style={{ width: `${((row.current - 1) / 8) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target band badges */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Common band targets</p>
                <div className="grid grid-cols-2 gap-2">
                  {bandGoals.map((bg) => (
                    <div key={bg.band} className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5">
                      <div className={`h-2 w-2 rounded-full shrink-0 ${bg.color}`} />
                      <div>
                        <p className="text-sm font-bold leading-none">Band {bg.band}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{bg.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's task preview */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                <p className="text-xs font-semibold text-primary mb-1">Today&apos;s recommended task</p>
                <p className="text-sm font-medium">Writing Task 2 — Argument Essay</p>
                <p className="text-xs text-muted-foreground">40 min · AI feedback included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
