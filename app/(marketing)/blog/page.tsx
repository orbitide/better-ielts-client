import { getAllBlogPosts, getBlogPostsByCategory } from '@/lib/data/blog'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils/format'
import type { BlogCategory } from '@/lib/types/blog'

const BLOG_CATEGORIES: BlogCategory[] = ['tips', 'grammar', 'strategy', 'vocabulary', 'news']

const categoryColor: Record<string, string> = {
  tips: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  grammar: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  strategy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  vocabulary: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  news: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  return { title: category ? `Blog — ${category}` : 'Blog' }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  const activeCategory: BlogCategory | undefined = BLOG_CATEGORIES.includes(category as BlogCategory)
    ? (category as BlogCategory)
    : undefined

  const posts = activeCategory
    ? await getBlogPostsByCategory(activeCategory)
    : await getAllBlogPosts()

  const featured = !activeCategory ? posts[0] : null
  const rest = !activeCategory ? posts.slice(1) : posts

  return (
    <div className="py-12 min-h-[85vh]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-3">IELTS Blog</h1>
          <p className="text-muted-foreground text-lg">
            Expert tips, strategies, and guides to help you prepare effectively for the IELTS exam.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          <Link href="/blog">
            <Badge
              variant={!activeCategory ? 'default' : 'secondary'}
              className="cursor-pointer capitalize"
            >
              All
            </Badge>
          </Link>
          {BLOG_CATEGORIES.map((cat) => (
            <Link key={cat} href={`/blog?category=${cat}`}>
              <Badge
                variant={activeCategory === cat ? 'default' : 'secondary'}
                className={`cursor-pointer capitalize ${activeCategory !== cat ? categoryColor[cat] : ''}`}
              >
                {cat}
              </Badge>
            </Link>
          ))}
        </div>

        {/* Featured post — only shown when no category filter is active */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block rounded-2xl overflow-hidden border bg-card mb-8 hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-video md:aspect-auto overflow-hidden bg-muted">
                <img
                  src={featured.coverImageUrl}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge variant="secondary" className={`${categoryColor[featured.category]} mb-3 w-fit capitalize`}>
                  {featured.category}
                </Badge>
                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <img src={featured.author.avatarUrl} alt={featured.author.name} className="h-6 w-6 rounded-full bg-muted" />
                    <span>{featured.author.name}</span>
                  </div>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(featured.publishedAt)}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readingTimeMinutes} min read</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <Badge variant="secondary" className={`${categoryColor[post.category]} mb-3 text-xs capitalize`}>
                  {post.category}
                </Badge>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTimeMinutes} min</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {rest.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">
            No posts in this category yet.
          </div>
        )}
      </div>
    </div>
  )
}
