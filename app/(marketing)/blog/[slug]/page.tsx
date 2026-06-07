import { getBlogPost } from '@/lib/data/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar, ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils/format'

const categoryColor: Record<string, string> = {
  tips: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  grammar: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  strategy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  vocabulary: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  news: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function renderMarkdown(content: string) {
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="text-xl font-bold mt-8 mb-3">
          {renderInline(block.slice(3))}
        </h2>
      )
    }
    return (
      <p key={i} className="text-muted-foreground leading-relaxed mb-4">
        {renderInline(block)}
      </p>
    )
  })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  return { title: post?.title ?? 'Blog' }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  return (
    <div className="py-12 min-h-[85vh]">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        {/* Cover image */}
        <div className="aspect-video rounded-2xl overflow-hidden bg-muted mb-8">
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Article header */}
        <Badge variant="secondary" className={`${categoryColor[post.category]} mb-4 capitalize`}>
          {post.category}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight mb-4">{post.title}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">{post.excerpt}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatarUrl}
              alt={post.author.name}
              className="h-8 w-8 rounded-full bg-muted"
            />
            <div>
              <p className="font-medium text-foreground text-xs">{post.author.name}</p>
              <p className="text-xs">{post.author.role}</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readingTimeMinutes} min read
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Body */}
        <article className="text-sm sm:text-base">
          {renderMarkdown(post.content)}
        </article>

        <div className="mt-12 pt-8 border-t">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </div>
      </div>
    </div>
  )
}
