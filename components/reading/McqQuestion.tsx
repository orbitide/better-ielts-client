'use client'

import { useTestStore } from '@/lib/store/test-store'
import type { McqQuestion as McqQuestionType } from '@/lib/types/reading'
import { cn } from '@/lib/utils'

export function McqQuestion({ question }: { question: McqQuestionType }) {
  const { answers, setAnswer } = useTestStore()
  const selected = answers[question.id]

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">
        <span className="text-muted-foreground mr-1.5">{question.questionNumber}.</span>
        {question.stem}
      </p>
      <div className="space-y-1.5">
        {question.options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => setAnswer(question.id, opt.label)}
            className={cn(
              'w-full text-left flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors',
              selected === opt.label
                ? 'border-primary bg-primary/10 font-medium'
                : 'hover:bg-accent'
            )}
          >
            <span className={cn(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold mt-0.5',
              selected === opt.label ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
            )}>
              {opt.label}
            </span>
            <span>{opt.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
