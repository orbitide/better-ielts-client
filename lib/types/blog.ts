export type BlogCategory = string

export type BlogSeo = {
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  ogImage?: string
}

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
  seo?: BlogSeo
}
