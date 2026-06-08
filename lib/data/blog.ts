import { cache } from 'react'
import type { BlogPost, BlogCategory } from '@/lib/types/blog'

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000').replace(/\/$/, '')

type ApiPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImageUrl: string
  authorName: string
  categoryName: string
  isPublished: boolean
  publishedAt: string
  readingTimeMinutes: number
  tags: string[]
}

type PagedResult<T> = {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

function mapPost(p: ApiPost): BlogPost {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? '',
    content: p.content ?? '',
    coverImageUrl: p.coverImageUrl ?? '',
    author: {
      name: p.authorName ?? '',
      avatarUrl: '',
      role: '',
    },
    publishedAt: p.publishedAt ?? '',
    readingTimeMinutes: p.readingTimeMinutes ?? 1,
    tags: p.tags ?? [],
    category: p.categoryName ?? '',
  }
}

export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const res = await fetch(`${API_URL}/api/blog/posts?page=1&pageSize=50`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const json = await res.json()
    const result = json.data as PagedResult<ApiPost>
    return result.items.map(mapPost)
  } catch {
    return []
  }
})

export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const res = await fetch(`${API_URL}/api/blog/posts/${slug}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const json = await res.json()
    return mapPost(json.data as ApiPost)
  } catch {
    return null
  }
})

export const getBlogPostsByCategory = cache(async (category: BlogCategory): Promise<BlogPost[]> => {
  const all = await getAllBlogPosts()
  return all.filter((p) => p.category.toLowerCase() === category.toLowerCase())
})
