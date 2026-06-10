'use client'

import type { McqGroupNode } from '@/lib/types/listening'
import { useTestStore } from '@/lib/store/test-store'
import { cn } from '@/lib/utils'

export function MCQGroupNodeView({ node }: { node: McqGroupNode }) {
  const { answers, setAnswer } = useTestStore()

  return (
    <div className="space-y-3">
      {node.title && <p className="text-sm font-semibold">{node.title}</p>}
      {node.instructions && <p className="text-xs text-muted-foreground">{node.instructions}</p>}
      {node.questions.map((q) => (
        <div key={q.id} className="space-y-2">
          <p className="text-sm font-medium">
            <span className="text-muted-foreground mr-1.5">{q.questionNumber}.</span>
            {q.text}
          </p>
          <div className="space-y-1.5">
            {q.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setAnswer(q.inputId, opt.label)}
                className={cn(
                  'w-full text-left flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors',
                  answers[q.inputId] === opt.label ? 'border-primary bg-primary/10 font-medium' : 'hover:bg-accent'
                )}
              >
                <span className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
                  answers[q.inputId] === opt.label ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
                )}>{opt.label}</span>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
