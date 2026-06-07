'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageSquare, ThumbsUp, Pin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { EmptyState } from '@/components/shared/EmptyState'
import { NewPostDialog } from '@/components/community/NewPostDialog'
import type { CommunityThread, CommunityCategory } from '@/lib/types/community'

const CATEGORY_COLORS: Record<string, string> = {
  Strategy: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Reading: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  Speaking: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  Vocabulary: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Listening: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Mock Test': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
}

const FILTER_CATEGORIES = ['All', 'Strategy', 'Reading', 'Listening', 'Writing', 'Speaking', 'Vocabulary'] as const
type FilterCategory = (typeof FILTER_CATEGORIES)[number]

const PAGE_SIZE = 4

interface CommunityFeedProps {
  threads: CommunityThread[]
}

export function CommunityFeed({ threads }: CommunityFeedProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  function handleCategoryChange(cat: FilterCategory) {
    setActiveCategory(cat)
    setVisibleCount(PAGE_SIZE)
  }

  const filtered = activeCategory === 'All'
    ? threads
    : threads.filter((t) => t.category === (activeCategory as CommunityCategory))

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <div>
      {/* Action row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          {FILTER_CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={cat === activeCategory ? 'default' : 'secondary'}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
        <NewPostDialog />
      </div>

      {/* Thread list */}
      {visible.length === 0 ? (
        <EmptyState
          title="No posts in this category yet"
          description="Be the first to start a discussion here."
        />
      ) : (
        <div className="space-y-4">
          {visible.map((thread) => (
            <Link
              key={thread.id}
              href={`/community/${thread.id}`}
              className="block rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors cursor-pointer"
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
            </Link>
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}>
            Load more posts
          </Button>
        </div>
      )}
    </div>
  )
}
