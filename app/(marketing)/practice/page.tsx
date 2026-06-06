import Link from 'next/link'
import { getPracticeCatalog, getPracticeRecommendation } from '@/lib/data/practice'
import { RecommendedPracticeCard } from '@/components/practice/RecommendedPracticeCard'
import { SkillPracticeCard } from '@/components/practice/SkillPracticeCard'
import { PracticeGreeting } from '@/components/practice/PracticeGreeting'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import { ClipboardList } from 'lucide-react'

export const metadata = { title: 'Practice Tests' }

export default async function PracticePage() {
  const [recommendation, catalog] = await Promise.all([
    getPracticeRecommendation(),
    getPracticeCatalog(),
  ])

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-10">
          <PracticeGreeting />
          <h1 className="text-3xl font-bold tracking-tight mb-3 mt-2">Practice Tests</h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Targeted skill practice for every section of the IELTS exam. Start with your recommended test, or browse by skill.
          </p>
        </div>

        <div className="mb-10">
          <RecommendedPracticeCard recommendation={recommendation} />
        </div>

        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Browse by skill</h2>
          <Link
            href="/mock-tests"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-1.5 text-muted-foreground')}
          >
            <ClipboardList className="size-3.5" />
            Full mock tests
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {catalog.map((group) => (
            <SkillPracticeCard key={group.skill} group={group} />
          ))}
        </div>
      </div>
    </div>
  )
}
