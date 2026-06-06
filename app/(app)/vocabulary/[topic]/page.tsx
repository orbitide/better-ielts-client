import { getVocabTopic } from '@/lib/data/vocabulary'
import { notFound } from 'next/navigation'
import { FlashcardDeck } from '@/components/vocabulary/FlashcardDeck'

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const vocabTopic = await getVocabTopic(topic)
  return { title: vocabTopic ? `${vocabTopic.title} Vocabulary` : 'Vocabulary' }
}

export default async function VocabTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const vocabTopic = await getVocabTopic(topic)
  if (!vocabTopic) notFound()
  return <FlashcardDeck topic={vocabTopic} />
}
