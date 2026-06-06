import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { blogPosts } from '@/lib/mock/blog-posts'
import type { BlogPost, BlogCategory } from '@/lib/types/blog'

export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  await delay(200)
  return blogPosts
})

export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  await delay(200)
  return blogPosts.find((p) => p.slug === slug) ?? null
})

export const getBlogPostsByCategory = cache(async (category: BlogCategory): Promise<BlogPost[]> => {
  await delay(200)
  return blogPosts.filter((p) => p.category === category)
})
