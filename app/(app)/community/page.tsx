import { getAllCommunityThreads } from '@/lib/data/community'
import { CommunityFeed } from '@/components/community/CommunityFeed'
import { Users, TrendingUp, BookMarked } from 'lucide-react'

export const metadata = { title: 'Community' }

const STATS = [
  { label: 'Members', value: '12,400+', icon: Users },
  { label: 'Posts this week', value: '342', icon: TrendingUp },
  { label: 'Pinned resources', value: '28', icon: BookMarked },
]

export default async function CommunityPage() {
  const threads = await getAllCommunityThreads()

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community</h1>
        <p className="text-muted-foreground">
          Join thousands of IELTS learners sharing strategies, asking questions, and supporting each other.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 shrink-0">
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <CommunityFeed threads={threads} />
    </div>
  )
}
