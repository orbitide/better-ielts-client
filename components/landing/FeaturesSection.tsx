import { BookMarked, Headphones, PenLine, Mic, Clock, Lightbulb, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const skills = [
  {
    icon: BookMarked,
    skill: 'Reading',
    time: '60 min · 40 questions',
    accent: 'bg-violet-500',
    accentSoft: 'from-violet-500/8',
    iconBg: 'bg-violet-500/10',
    color: 'text-violet-600 dark:text-violet-400',
    questionTypes: [
      'True / False / Not Given',
      'Matching headings & features',
      'Multiple choice (MCQ)',
      'Fill in the blanks',
      'Short answer questions',
    ],
    tip: 'Learn to skim for gist and scan for detail — most candidates run out of time because they read every word.',
    highlight: 'Passage 3 is always the hardest — practise it first.',
  },
  {
    icon: Headphones,
    skill: 'Listening',
    time: '40 min · 40 questions',
    accent: 'bg-blue-500',
    accentSoft: 'from-blue-500/8',
    iconBg: 'bg-blue-500/10',
    color: 'text-blue-600 dark:text-blue-400',
    questionTypes: [
      'Section 1: Social conversation',
      'Section 2: Monologue (non-academic)',
      'Section 3: Academic discussion',
      'Section 4: Academic lecture',
      'Note & form completion',
    ],
    tip: 'Read the questions before each section starts — you get 30–45 seconds to preview them.',
    highlight: 'Section 4 has no break. It\'s the hardest.',
  },
  {
    icon: PenLine,
    skill: 'Writing',
    time: '60 min · 2 tasks',
    accent: 'bg-primary',
    accentSoft: 'from-primary/10',
    iconBg: 'bg-primary/10',
    color: 'text-primary',
    featured: true,
    questionTypes: [
      'Task 1 (20 min, 150 words min): Describe a chart, graph, process, or map',
      'Task 2 (40 min, 250 words min): Opinion, discussion, or problem-solution essay',
      'Marked on: Task Achievement',
      'Marked on: Coherence & Cohesion',
      'Marked on: Lexical Resource + Grammar',
    ],
    tip: 'Task 2 is worth twice as much as Task 1 — always start with Task 2 to protect your time.',
    highlight: 'AI feedback on all 4 marking criteria included.',
  },
  {
    icon: Mic,
    skill: 'Speaking',
    time: '11–14 min · 3 parts',
    accent: 'bg-pink-500',
    accentSoft: 'from-pink-500/8',
    iconBg: 'bg-pink-500/10',
    color: 'text-pink-600 dark:text-pink-400',
    questionTypes: [
      'Part 1 (4–5 min): Familiar topics — family, work, hobbies',
      'Part 2 (3–4 min): Cue card — 1 min prep, 2 min long turn',
      'Part 3 (4–5 min): Abstract discussion, opinions, speculation',
      'Marked on: Fluency & Coherence',
      'Marked on: Pronunciation + Lexical Range + Grammar',
    ],
    tip: 'The examiner is not testing your opinions — they\'re testing your English. Disagree confidently.',
    highlight: 'Record yourself on every practice session.',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Master all four IELTS skills
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            IELTS tests Reading, Listening, Writing, and Speaking separately. Each skill has its own format, timing, and scoring rules. Here&apos;s exactly what you&apos;ll face.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {skills.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.skill}
                className={cn(
                  'group relative overflow-hidden rounded-2xl border bg-card transition-all duration-200',
                  'hover:shadow-md hover:border-border/80',
                  s.featured
                    ? 'border-primary/20 shadow-sm ring-1 ring-primary/10'
                    : 'border-border/60 shadow-sm',
                )}
              >
                {/* Accent wash */}
                <div
                  className={cn(
                    'pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-70',
                    s.accentSoft,
                  )}
                />

                {/* Top accent bar */}
                <div className={cn('absolute left-0 right-0 top-0 h-1', s.accent)} />

                <div className="relative p-6 pt-7">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'flex size-12 shrink-0 items-center justify-center rounded-xl ring-1 ring-foreground/5',
                          s.iconBg,
                        )}
                      >
                        <Icon className={cn('size-5', s.color)} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-foreground">{s.skill}</h3>
                        <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                          <Clock className="size-3" />
                          {s.time}
                        </div>
                      </div>
                    </div>
                    {s.featured && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        <Zap className="size-2.5" />
                        AI feedback
                      </span>
                    )}
                  </div>

                  {/* Question types */}
                  <ul className="mb-5 space-y-2">
                    {s.questionTypes.map((qt) => (
                      <li
                        key={qt}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground leading-snug"
                      >
                        <span
                          className={cn('mt-2 size-1 shrink-0 rounded-full', s.accent)}
                        />
                        {qt}
                      </li>
                    ))}
                  </ul>

                  {/* Tip + highlight */}
                  <div className="space-y-2.5 border-t border-border/50 pt-5">
                    <div className="rounded-xl border border-border/50 bg-background/60 px-4 py-3.5 backdrop-blur-sm">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <Lightbulb className="size-3.5 text-muted-foreground" />
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          Exam tip
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/80">{s.tip}</p>
                    </div>
                    <p className={cn('px-1 text-xs font-semibold leading-snug', s.color)}>
                      {s.highlight}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
