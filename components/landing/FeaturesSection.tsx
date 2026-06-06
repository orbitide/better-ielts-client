import { BookMarked, Headphones, PenLine, Mic } from 'lucide-react'

const skills = [
  {
    icon: BookMarked,
    skill: 'Reading',
    time: '60 min · 40 questions',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-200 dark:border-violet-800/40',
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
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800/40',
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
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-800/40',
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
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    border: 'border-pink-200 dark:border-pink-800/40',
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
          <p className="text-muted-foreground text-lg">
            IELTS tests Reading, Listening, Writing, and Speaking separately. Each skill has its own format, timing, and scoring rules. Here&apos;s exactly what you&apos;ll face.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {skills.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.skill} className={`rounded-2xl border ${s.border} ${s.bg} p-7`}>
                <div className="flex items-start gap-4 mb-5">
                  <div className="rounded-xl bg-white dark:bg-zinc-900 shadow-sm p-3 shrink-0">
                    <Icon className={`h-6 w-6 ${s.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-0.5">{s.skill}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{s.time}</p>
                  </div>
                </div>

                <ul className="space-y-1.5 mb-5">
                  {s.questionTypes.map((qt) => (
                    <li key={qt} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-current shrink-0 opacity-60" />
                      {qt}
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <div className="rounded-lg bg-white/60 dark:bg-zinc-900/40 border border-current/10 px-4 py-3">
                    <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-1">Exam tip</p>
                    <p className="text-sm text-muted-foreground">{s.tip}</p>
                  </div>
                  <div className={`rounded-lg px-4 py-2.5 bg-white/40 dark:bg-zinc-900/20`}>
                    <p className={`text-xs font-semibold ${s.color}`}>{s.highlight}</p>
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
