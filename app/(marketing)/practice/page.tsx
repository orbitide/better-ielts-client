import Link from 'next/link'
import { BookMarked, Headphones, PenLine, Mic, ArrowRight, Clock } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export const metadata = { title: 'Practice Tests' }

const practiceTypes = [
  {
    skill: 'Reading',
    icon: BookMarked,
    href: '/reading/test-1',
    description: 'Academic and General Training reading passages with all question types.',
    tests: 3,
    questions: 120,
    duration: '60 min',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    features: ['True/False/Not Given', 'Matching headings', 'Multiple choice', 'Fill in the blanks'],
  },
  {
    skill: 'Listening',
    icon: Headphones,
    href: '/listening/test-1',
    description: 'Four-section listening tests with audio transcripts and detailed answer keys.',
    tests: 2,
    questions: 80,
    duration: '40 min',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    features: ['Note completion', 'Multiple choice', 'Map labelling', 'Short answer'],
  },
  {
    skill: 'Writing',
    icon: PenLine,
    href: '/writing/task2-1',
    description: 'Task 1 (charts & diagrams) and Task 2 (essays) with sample Band 9 answers.',
    tests: 8,
    questions: 8,
    duration: '60 min',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    features: ['Bar/line/pie charts', 'Process diagrams', 'Opinion essays', 'Discussion essays'],
  },
  {
    skill: 'Speaking',
    icon: Mic,
    href: '/speaking/session-1',
    description: 'Part 1, 2, and 3 speaking sessions with cue cards, model answers and band estimates.',
    tests: 3,
    questions: 45,
    duration: '15 min',
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    badge: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300',
    features: ['Part 1: Personal questions', 'Part 2: Long turn cue card', 'Part 3: Abstract discussion', 'Band 9 model answers'],
  },
]

export default function PracticePage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-3">Practice Tests</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Targeted skill practice for every section of the IELTS exam. Pick a skill to practise individually, or try a full mock test.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {practiceTypes.map((pt) => {
            const Icon = pt.icon
            return (
              <div key={pt.skill} className={`rounded-2xl border ${pt.bg} p-8`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`rounded-xl p-3 bg-white dark:bg-zinc-900 shadow-sm`}>
                    <Icon className={`h-6 w-6 ${pt.color}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-1">{pt.skill}</h2>
                    <p className="text-sm text-muted-foreground">{pt.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {pt.features.map((f) => (
                    <Badge key={f} variant="secondary" className={pt.badge}>
                      {f}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <span>{pt.tests} test{pt.tests !== 1 ? 's' : ''}</span>
                  <span>{pt.questions} questions</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{pt.duration}</span>
                </div>

                <Link href={pt.href} className={cn(buttonVariants(), 'gap-2 w-full sm:w-auto')}>
                  Start {pt.skill} Practice
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
