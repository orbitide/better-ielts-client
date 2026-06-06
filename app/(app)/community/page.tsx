import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MessageSquare, ThumbsUp, Pin, Users, TrendingUp, BookMarked } from 'lucide-react'

const THREADS = [
  {
    id: '1',
    category: 'Strategy',
    title: 'How I improved my Writing band from 5.5 to 7.0 in 8 weeks',
    excerpt: 'I want to share the exact approach that helped me improve my Writing score significantly. The key was understanding the marking criteria deeply and writing 2 full tasks every day...',
    author: 'Sarah K.', authorInitials: 'SK', targetBand: 7.5, daysAgo: 2,
    likes: 142, replies: 38, isPinned: true,
  },
  {
    id: '2',
    category: 'Reading',
    title: 'TFNG vs. True/False — how to tell the difference quickly',
    excerpt: 'Many test-takers confuse TRUE with NOT GIVEN. Here is a simple decision tree I developed that has helped my students...',
    author: 'Omar F.', authorInitials: 'OF', targetBand: 8.0, daysAgo: 4,
    likes: 89, replies: 22, isPinned: false,
  },
  {
    id: '3',
    category: 'Speaking',
    title: 'Part 2 cue card practice thread — post your recordings!',
    excerpt: 'I thought it would be helpful to start a thread where we can all practise Part 2 together. I\'ll go first with the topic "Describe a time you helped someone"...',
    author: 'Ji-won L.', authorInitials: 'JL', targetBand: 7.0, daysAgo: 1,
    likes: 67, replies: 54, isPinned: false,
  },
  {
    id: '4',
    category: 'Vocabulary',
    title: 'Academic word list — which words actually appear in IELTS?',
    excerpt: 'I analysed 50 past IELTS Academic tests and tracked which AWL words appeared most frequently. Here are the top 100 words you absolutely must know...',
    author: 'Priya M.', authorInitials: 'PM', targetBand: 8.0, daysAgo: 6,
    likes: 203, replies: 41, isPinned: true,
  },
  {
    id: '5',
    category: 'Listening',
    title: 'Section 4 monologue — tips for note-taking under pressure',
    excerpt: 'Section 4 is the hardest because it\'s academic and you can\'t hear it twice. My strategy: predict the answers before the recording starts using the question stems...',
    author: 'Ahmed R.', authorInitials: 'AR', targetBand: 7.5, daysAgo: 3,
    likes: 78, replies: 17, isPinned: false,
  },
  {
    id: '6',
    category: 'Mock Test',
    title: 'Weekly mock test debrief — share your scores and strategies',
    excerpt: 'Every Sunday I\'ll post a debrief thread for people who took the weekly mock test. Share your estimated band, what went well, and what you are working on...',
    author: 'Better IELTS Team', authorInitials: 'BI', targetBand: 9.0, daysAgo: 0,
    likes: 45, replies: 89, isPinned: false,
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  Strategy: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Reading: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  Speaking: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  Vocabulary: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Listening: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Mock Test': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
}

const STATS = [
  { label: 'Members', value: '12,400+', icon: Users },
  { label: 'Posts this week', value: '342', icon: TrendingUp },
  { label: 'Pinned resources', value: '28', icon: BookMarked },
]

export default function CommunityPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
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

      {/* Action row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          {['All', 'Strategy', 'Reading', 'Listening', 'Writing', 'Speaking', 'Vocabulary'].map((cat) => (
            <Badge
              key={cat}
              variant={cat === 'All' ? 'default' : 'secondary'}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {cat}
            </Badge>
          ))}
        </div>
        <Button size="sm" className="gap-2 shrink-0">
          <MessageSquare className="h-3.5 w-3.5" />
          New Post
        </Button>
      </div>

      {/* Thread list */}
      <div className="space-y-4">
        {THREADS.map((thread) => (
          <div
            key={thread.id}
            className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="text-xs font-bold">{thread.authorInitials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {thread.isPinned && (
                    <Pin className="h-3.5 w-3.5 text-primary fill-primary shrink-0" />
                  )}
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[thread.category] ?? 'bg-muted text-muted-foreground'}`}>
                    {thread.category}
                  </span>
                </div>
                <h3 className="font-semibold mb-1 leading-snug">{thread.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{thread.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <span>{thread.author}</span>
                  <span>Target: Band {thread.targetBand}</span>
                  <span>{thread.daysAgo === 0 ? 'Today' : `${thread.daysAgo}d ago`}</span>
                  <span className="flex items-center gap-1 ml-auto">
                    <ThumbsUp className="h-3.5 w-3.5" />{thread.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />{thread.replies}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load more */}
      <div className="mt-6 text-center">
        <Button variant="outline">Load more posts</Button>
      </div>
    </div>
  )
}
