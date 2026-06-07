export type CommunityCategory =
  | 'Strategy'
  | 'Reading'
  | 'Speaking'
  | 'Vocabulary'
  | 'Listening'
  | 'Mock Test'

export type CommunityThread = {
  id: string
  category: CommunityCategory
  title: string
  excerpt: string
  author: string
  authorInitials: string
  targetBand: number
  daysAgo: number
  likes: number
  replies: number
  isPinned: boolean
}

export type CommunityReply = {
  id: string
  threadId: string
  author: string
  authorInitials: string
  targetBand: number
  content: string
  daysAgo: number
  likes: number
}
