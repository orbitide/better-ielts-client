import { fetchVocabTopics, fetchVocabTopic } from '@/lib/api/ielts'
import type { VocabTopic } from '@/lib/types/vocabulary'

export const getAllVocabTopics = async (): Promise<VocabTopic[]> => {
  try {
    return (await fetchVocabTopics()) as VocabTopic[]
  } catch {
    return []
  }
}

export const getVocabTopic = async (slug: string): Promise<VocabTopic | null> => {
  try {
    return (await fetchVocabTopic(slug)) as VocabTopic
  } catch {
    return null
  }
}
