import { getAllVocabTopics } from '@/lib/data/vocabulary'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

export const metadata = { title: 'Vocabulary' }

export default async function VocabularyPage() {
  const topics = await getAllVocabTopics()

  return (
    <div className="py-12 min-h-[85vh]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-3">Vocabulary Builder</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Topic-based vocabulary for the most common IELTS themes. Learn words in context, practise with flashcards, and quiz yourself.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/vocabulary/${topic.slug}`}
              className="group rounded-xl border bg-card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {topic.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{topic.wordCount} words</Badge>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
