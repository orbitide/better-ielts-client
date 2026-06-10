import http from '@/lib/api/http'
import type { BlogPost } from '@/lib/types/blog'

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

type ApiResponse<T> = { data: T }

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

export async function fetchBlogPosts(page = 1, pageSize = 50): Promise<BlogPost[]> {
  const { data } = await http.get<ApiResponse<PagedResult<ApiPost>>>('/api/blog', {
    params: { page, pageSize },
  })
  return data.data.items.map(mapPost)
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost> {
  const { data } = await http.get<ApiResponse<ApiPost>>(`/api/blog/${slug}`)
  return mapPost(data.data)
}
