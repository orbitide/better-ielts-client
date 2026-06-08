import { getBlogPost } from '@/lib/data/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar, ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils/format'

const CATEGORY_COLORS = [
  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
  'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
]

function getCategoryColor(category: string): string {
  let hash = 0
  for (let i = 0; i < category.length; i++) hash = (hash * 31 + category.charCodeAt(i)) & 0xffffffff
  return CATEGORY_COLORS[Math.abs(hash) % CATEGORY_COLORS.length]
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
  if (!post) return { title: 'Blog' }

  const seoTitle = post.seo?.metaTitle ?? post.title
  const seoDesc  = post.seo?.metaDescription ?? post.excerpt
  const seoImage = post.seo?.ogImage ?? post.coverImageUrl

  return {
    title: seoTitle,
    description: seoDesc,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author.name ? [post.author.name] : undefined,
      images: seoImage ? [{ url: seoImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
      images: seoImage ? [seoImage] : undefined,
    },
  }
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
        <Badge variant="secondary" className={`${getCategoryColor(post.category)} mb-4 capitalize`}>
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

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.seo?.metaTitle ?? post.title,
              description: post.seo?.metaDescription ?? post.excerpt,
              image: post.seo?.ogImage ?? post.coverImageUrl,
              author: { '@type': 'Person', name: post.author.name },
              datePublished: post.publishedAt,
              publisher: { '@type': 'Organization', name: 'Better IELTS', url: 'https://betterielts.com' },
            }),
          }}
        />

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
