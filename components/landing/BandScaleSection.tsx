import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import { GraduationCap, Sparkles } from 'lucide-react'

const bands = [
  {
    score: 9,
    label: 'Expert User',
    description: 'Full operational command. Appropriate, accurate, fluent.',
    examples: [] as string[],
    accent: 'bg-violet-500',
    accentSoft: 'from-violet-500/8',
    scoreText: 'text-violet-600 dark:text-violet-400',
  },
  {
    score: 8,
    label: 'Very Good User',
    description: 'Fully operational command. Occasional inaccuracies.',
    examples: ['Academic research roles', 'Senior academic entry'],
    accent: 'bg-blue-500',
    accentSoft: 'from-blue-500/8',
    scoreText: 'text-blue-600 dark:text-blue-400',
  },
  {
    score: 7.5,
    label: 'Good User+',
    description: 'Good command in most situations.',
    examples: ['Medical / nursing registration', 'Legal professions'],
    accent: 'bg-primary',
    accentSoft: 'from-primary/10',
    scoreText: 'text-primary',
    premium: true,
  },
  {
    score: 7,
    label: 'Good User',
    description: 'Operational command with occasional inaccuracies.',
    examples: ['Top universities (Oxford, Cambridge, LSE)', 'Australian skilled visa'],
    accent: 'bg-emerald-600',
    accentSoft: 'from-emerald-600/8',
    scoreText: 'text-emerald-600 dark:text-emerald-400',
    premium: true,
  },
  {
    score: 6.5,
    label: 'Competent User+',
    description: 'Generally effective command despite inaccuracies.',
    examples: ['Most UK study visas', 'Canadian Express Entry', 'RCUK universities'],
    accent: 'bg-amber-500',
    accentSoft: 'from-amber-500/8',
    scoreText: 'text-amber-600 dark:text-amber-400',
  },
  {
    score: 6,
    label: 'Competent User',
    description: 'Generally effective command with noticeable errors.',
    examples: ['UK Skilled Worker visa', 'New Zealand residence'],
    accent: 'bg-orange-500',
    accentSoft: 'from-orange-500/8',
    scoreText: 'text-orange-600 dark:text-orange-400',
  },
  {
    score: 5.5,
    label: 'Modest User',
    description: 'Partial command of the language.',
    examples: [] as string[],
    accent: 'bg-red-400',
    accentSoft: 'from-red-400/8',
    scoreText: 'text-red-600 dark:text-red-400',
  },
]

export function BandScaleSection() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left — explanation */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What does your band score mean?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              IELTS is scored from 1 to 9 in half-band increments. Your overall score is the average of all four skills, rounded to the nearest 0.5.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Different institutions set different requirements. A UK study visa typically needs 6.0–6.5, while a top medical school may require 7.5 in every skill.
            </p>
            <Link href="/dashboard" className={cn(buttonVariants(), 'gap-2')}>
              Find your target band
            </Link>
          </div>

          {/* Right — band scale */}
          <div className="lg:col-span-3 space-y-3">
            {bands.map((b) => (
              <div
                key={b.score}
                className={cn(
                  'group relative overflow-hidden rounded-2xl border bg-card transition-all duration-200',
                  'hover:shadow-md hover:border-border/80',
                  b.premium
                    ? 'border-primary/20 shadow-sm ring-1 ring-primary/10'
                    : 'border-border/60 shadow-sm',
                )}
              >
                {/* Accent wash */}
                <div
                  className={cn(
                    'pointer-events-none absolute inset-0 bg-gradient-to-r to-transparent opacity-60',
                    b.accentSoft,
                  )}
                />

                {/* Left accent bar */}
                <div className={cn('absolute left-0 top-0 bottom-0 w-1', b.accent)} />

                <div className="relative flex items-start gap-5 p-5 pl-6">
                  {/* Score */}
                  <div className="flex shrink-0 flex-col items-center pt-0.5">
                    <span
                      className={cn(
                        'text-3xl font-extrabold tabular-nums leading-none tracking-tight',
                        b.scoreText,
                      )}
                    >
                      {b.score}
                    </span>
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                      Band
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="hidden sm:block w-px self-stretch bg-border/60 shrink-0" />

                  {/* Content */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-foreground tracking-tight">{b.label}</h3>
                      {b.premium && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          <Sparkles className="size-2.5" />
                          Target tier
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{b.description}</p>

                    {b.examples.length > 0 && (
                      <ul className="flex flex-col gap-1.5 pt-1">
                        {b.examples.map((ex) => (
                          <li
                            key={ex}
                            className="flex items-start gap-2 text-xs text-foreground/80"
                          >
                            <GraduationCap
                              className={cn('mt-0.5 size-3.5 shrink-0', b.scoreText)}
                            />
                            <span className="leading-snug">{ex}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
