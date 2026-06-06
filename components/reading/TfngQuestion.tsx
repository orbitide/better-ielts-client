'use client'

import { useTestStore } from '@/lib/store/test-store'
import type { TfngQuestion as TfngQuestionType } from '@/lib/types/reading'
import { cn } from '@/lib/utils'

const options = ['TRUE', 'FALSE', 'NOT GIVEN'] as const

export function TfngQuestion({ question }: { question: TfngQuestionType }) {
  const { answers, setAnswer } = useTestStore()
  const selected = answers[question.id]

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">
        <span className="text-muted-foreground mr-1.5">{question.questionNumber}.</span>
        {question.statement}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setAnswer(question.id, opt)}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
              selected === opt
                ? 'border-primary bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
