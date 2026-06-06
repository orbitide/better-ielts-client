import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

const bands = [
  {
    score: 9,
    label: 'Expert User',
    description: 'Full operational command. Appropriate, accurate, fluent.',
    examples: [],
    color: 'bg-violet-500',
    textColor: 'text-violet-700 dark:text-violet-300',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    border: 'border-violet-200 dark:border-violet-800/30',
  },
  {
    score: 8,
    label: 'Very Good User',
    description: 'Fully operational command. Occasional inaccuracies.',
    examples: ['Academic research roles', 'Senior academic entry'],
    color: 'bg-blue-500',
    textColor: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-200 dark:border-blue-800/30',
  },
  {
    score: 7.5,
    label: 'Good User+',
    description: 'Good command in most situations.',
    examples: ['Medical / nursing registration', 'Legal professions'],
    color: 'bg-emerald-500',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-800/30',
  },
  {
    score: 7,
    label: 'Good User',
    description: 'Operational command with occasional inaccuracies.',
    examples: ['Top universities (Oxford, Cambridge, LSE)', 'Australian skilled visa'],
    color: 'bg-teal-500',
    textColor: 'text-teal-700 dark:text-teal-300',
    bg: 'bg-teal-50 dark:bg-teal-950/40',
    border: 'border-teal-200 dark:border-teal-800/30',
  },
  {
    score: 6.5,
    label: 'Competent User+',
    description: 'Generally effective command despite inaccuracies.',
    examples: ['Most UK study visas', 'Canadian Express Entry', 'RCUK universities'],
    color: 'bg-amber-500',
    textColor: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-800/30',
  },
  {
    score: 6,
    label: 'Competent User',
    description: 'Generally effective command with noticeable errors.',
    examples: ['UK Skilled Worker visa', 'New Zealand residence'],
    color: 'bg-orange-500',
    textColor: 'text-orange-700 dark:text-orange-300',
    bg: 'bg-orange-50 dark:bg-orange-950/40',
    border: 'border-orange-200 dark:border-orange-800/30',
  },
  {
    score: 5.5,
    label: 'Modest User',
    description: 'Partial command of the language.',
    examples: [],
    color: 'bg-red-400',
    textColor: 'text-red-700 dark:text-red-300',
    bg: 'bg-red-50 dark:bg-red-950/40',
    border: 'border-red-200 dark:border-red-800/30',
  },
]

export function BandScaleSection() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left — explanation */}
          <div className="lg:col-span-2">
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
          <div className="lg:col-span-3 space-y-2">
            {bands.map((b) => (
              <div key={b.score} className={`flex items-start gap-4 rounded-xl border ${b.border} ${b.bg} px-4 py-3`}>
                <div className="flex flex-col items-center shrink-0">
                  <div className={`h-8 w-8 rounded-full ${b.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {b.score}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className={`font-semibold text-sm ${b.textColor}`}>{b.label}</span>
                    <span className="text-xs text-muted-foreground">{b.description}</span>
                  </div>
                  {b.examples.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {b.examples.map((ex) => (
                        <span key={ex} className="text-xs bg-background/60 border rounded px-2 py-0.5 text-muted-foreground">
                          {ex}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
