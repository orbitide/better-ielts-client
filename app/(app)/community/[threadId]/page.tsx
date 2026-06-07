import { getCommunityThread, getRepliesForThread } from '@/lib/data/community'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ThumbsUp, MessageSquare, Pin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

const CATEGORY_COLORS: Record<string, string> = {
  Strategy: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Reading: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  Speaking: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  Vocabulary: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Listening: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Mock Test': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
}

export async function generateMetadata({ params }: { params: Promise<{ threadId: string }> }) {
  const { threadId } = await params
  const thread = await getCommunityThread(threadId)
  return { title: thread?.title ?? 'Community' }
}

export default async function CommunityThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>
}) {
  const { threadId } = await params
  const [thread, replies] = await Promise.all([
    getCommunityThread(threadId),
    getRepliesForThread(threadId),
  ])
  if (!thread) notFound()

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-full">
      <Link
        href="/community"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to community
      </Link>

      {/* Thread header */}
      <div className="rounded-xl border bg-card p-6 mb-6">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {thread.isPinned && (
            <Pin className="h-3.5 w-3.5 text-primary fill-primary shrink-0" />
          )}
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[thread.category] ?? 'bg-muted text-muted-foreground'}`}>
            {thread.category}
          </span>
        </div>

        <h1 className="text-xl font-bold leading-snug mb-4">{thread.title}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{thread.excerpt}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs font-bold">{thread.authorInitials}</AvatarFallback>
            </Avatar>
            <span>{thread.author}</span>
          </div>
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

      {/* Replies */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-sm font-semibold">Replies ({replies.length})</h2>
          <Separator className="flex-1" />
        </div>

        <div className="space-y-4">
          {replies.map((reply) => (
            <div key={reply.id} className="rounded-xl border bg-card p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="text-xs font-bold">{reply.authorInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-sm font-medium">{reply.author}</span>
                    <Badge variant="secondary" className="text-xs">Band {reply.targetBand}</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {reply.daysAgo === 0 ? 'Today' : `${reply.daysAgo}d ago`}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">{reply.content}</p>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ThumbsUp className="h-3 w-3" />{reply.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t">
        <Link
          href="/community"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to community
        </Link>
      </div>
    </div>
  )
}
