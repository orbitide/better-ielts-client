import { cache } from 'react'
import { delay } from '@/lib/utils/delay'
import { vocabTopics } from '@/lib/mock/vocabulary'
import type { VocabTopic } from '@/lib/types/vocabulary'

export const getAllVocabTopics = cache(async (): Promise<VocabTopic[]> => {
  await delay(200)
  return vocabTopics.map(({ words: _, ...t }) => ({ ...t, words: [] })) as VocabTopic[]
})

export const getVocabTopic = cache(async (slug: string): Promise<VocabTopic | null> => {
  await delay(250)
  return vocabTopics.find((t) => t.slug === slug) ?? null
})
