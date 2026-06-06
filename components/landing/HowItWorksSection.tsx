import { ClipboardList, BookOpen, FlaskConical, Trophy } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Diagnose your weaknesses',
    description: 'Take a 20-minute diagnostic test across all four skills. We pinpoint exactly which question types are costing you bands — before you study anything.',
    detail: 'e.g. "You drop 4+ marks on TFNG questions and Task 2 Task Response"',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    ring: 'ring-violet-200 dark:ring-violet-800/40',
  },
  {
    icon: BookOpen,
    step: '02',
    title: 'Follow a personalised plan',
    description: 'Your daily study plan targets weak areas first and schedules band-appropriate practice — not generic exercises. Each session is 30–60 minutes.',
    detail: '7-day rolling plan, adjusts as you improve',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    ring: 'ring-blue-200 dark:ring-blue-800/40',
  },
  {
    icon: FlaskConical,
    step: '03',
    title: 'Practice with real exam format',
    description: 'Every exercise mirrors the actual IELTS format — same question types, same word limits, same timing. Writing submissions get AI feedback scored against all four marking criteria.',
    detail: '40+ Reading tests · 20+ Listening tests · AI Writing feedback',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    ring: 'ring-emerald-200 dark:ring-emerald-800/40',
  },
  {
    icon: Trophy,
    step: '04',
    title: 'Sit a full mock test',
    description: 'When you\'re ready, run a 165-minute timed mock test. See your predicted band per skill, review every answer, and understand exactly where you stand before the real exam.',
    detail: 'Listening · Reading · Writing · Speaking — all in one session',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    ring: 'ring-amber-200 dark:ring-amber-800/40',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How Better IELTS works
          </h2>
          <p className="text-muted-foreground text-lg">
            Most people fail IELTS not because they lack English — but because they practise the wrong things. Our structured system fixes that.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (hidden on mobile) */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1px)] right-[calc(12.5%+1px)] h-0.5 bg-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.step} className="relative flex flex-col">
                  {/* Step icon */}
                  <div className="flex justify-center mb-5 relative z-10">
                    <div className={`h-20 w-20 rounded-2xl ${s.bg} ring-1 ${s.ring} flex items-center justify-center`}>
                      <Icon className={`h-8 w-8 ${s.color}`} />
                    </div>
                  </div>

                  <div className="text-center flex flex-col flex-1">
                    <div className={`text-xs font-bold tracking-widest ${s.color} mb-2 uppercase`}>
                      Step {s.step}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                      {s.description}
                    </p>
                    <p className={`text-xs font-medium ${s.color} bg-current/5 rounded-lg px-3 py-2`}>
                      {s.detail}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
