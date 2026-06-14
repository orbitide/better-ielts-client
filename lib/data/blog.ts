import { fetchBlogPosts, fetchBlogPostBySlug } from '@/lib/api/blog'
import type { BlogPost, BlogCategory } from '@/lib/types/blog'

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    return await fetchBlogPosts(1, 50)
  } catch {
    return []
  }
}

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    return await fetchBlogPostBySlug(slug)
  } catch {
    return null
  }
}

export const getBlogPostsByCategory = async (category: BlogCategory): Promise<BlogPost[]> => {
  const all = await getAllBlogPosts()
  return all.filter((p) => p.category.toLowerCase() === category.toLowerCase())
}
