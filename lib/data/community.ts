import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { communityThreads, communityReplies } from '@/lib/mock/community-threads'
import type { CommunityThread, CommunityReply } from '@/lib/types/community'

export const getAllCommunityThreads = cache(async (): Promise<CommunityThread[]> => {
  await delay(200)
  return communityThreads
})

export const getCommunityThread = cache(async (id: string): Promise<CommunityThread | null> => {
  await delay(200)
  return communityThreads.find((t) => t.id === id) ?? null
})

export const getRepliesForThread = cache(async (threadId: string): Promise<CommunityReply[]> => {
  await delay(200)
  return communityReplies.filter((r) => r.threadId === threadId)
})
