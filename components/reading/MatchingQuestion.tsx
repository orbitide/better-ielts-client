'use client'

import { useTestStore } from '@/lib/store/test-store'
import type { MatchingQuestion as MatchingQuestionType } from '@/lib/types/reading'
import { cn } from '@/lib/utils'

export function MatchingQuestion({ question }: { question: MatchingQuestionType }) {
  const { answers, setAnswer } = useTestStore()
  const selected = answers[question.id]

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">
        <span className="text-muted-foreground mr-1.5">{question.questionNumber}.</span>
        {question.stem}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {question.options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setAnswer(question.id, opt.key)}
            title={opt.text}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
              selected === opt.key
                ? 'border-primary bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            )}
          >
            {opt.key.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground space-y-0.5">
        {question.options.map((opt) => (
          <div key={opt.key}><span className="font-semibold uppercase">{opt.key}</span> — {opt.text}</div>
        ))}
      </div>
    </div>
  )
}
