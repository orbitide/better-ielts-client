'use client'

import type { GapFillNode } from '@/lib/types/listening'
import { Input } from '@/components/ui/input'
import { useTestStore } from '@/lib/store/test-store'

export function GapFillNodeView({ node }: { node: GapFillNode }) {
  const { answers, setAnswer } = useTestStore()

  return (
    <div className="space-y-2">
      {node.title && <p className="text-sm font-semibold">{node.title}</p>}
      <div className="rounded-lg border bg-muted/20 p-4 text-sm leading-loose">
        {node.blocks.map((block, i) =>
          block.type === 'text' ? (
            <span key={i} className="whitespace-pre-wrap">{block.value}</span>
          ) : (
            <span key={i} className="mx-1 inline-flex items-center gap-1 align-middle">
              <span className="text-xs text-muted-foreground">{block.questionNumber}</span>
              <Input
                value={answers[block.inputId] ?? ''}
                onChange={(e) => setAnswer(block.inputId, e.target.value)}
                placeholder="…"
                className="inline-flex h-7 w-32 text-sm"
              />
            </span>
          )
        )}
      </div>
    </div>
  )
}
