export type BlogCategory = 'tips' | 'grammar' | 'strategy' | 'vocabulary' | 'news'

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImageUrl: string
  author: {
    name: string
    avatarUrl: string
    role: string
  }
  publishedAt: string
  readingTimeMinutes: number
  tags: string[]
  category: BlogCategory
}
