'use client'

import { useTestStore } from '@/lib/store/test-store'
import type { FillBlankQuestion as FillBlankQuestionType } from '@/lib/types/reading'
import { Input } from '@/components/ui/input'

export function FillBlankQuestion({ question }: { question: FillBlankQuestionType }) {
  const { answers, setAnswer } = useTestStore()
  const value = answers[question.id] ?? ''

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">
        <span className="text-muted-foreground mr-1.5">{question.questionNumber}.</span>
        {question.stem}
      </p>
      <Input
        value={value}
        onChange={(e) => setAnswer(question.id, e.target.value)}
        placeholder={question.wordLimit ? `Max ${question.wordLimit} word${question.wordLimit > 1 ? 's' : ''}` : 'Type your answer'}
        className="text-sm"
      />
    </div>
  )
}
