'use client'

import type { ImageLabelNode } from '@/lib/types/listening'
import { Input } from '@/components/ui/input'
import { useTestStore } from '@/lib/store/test-store'

export function ImageLabelNodeView({ node }: { node: ImageLabelNode }) {
  const { answers, setAnswer } = useTestStore()

  return (
    <div className="space-y-3">
      {node.title && <p className="text-sm font-semibold">{node.title}</p>}
      <div className="relative overflow-hidden rounded-lg border">
        <img src={node.imageUrl} alt={node.title ?? 'Diagram'} className="block h-auto w-full" />
        {node.points.map((p) => (
          <div
            key={p.inputId}
            className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {p.questionNumber}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {node.points.map((p) => (
          <div key={p.inputId} className="flex items-center gap-2">
            <span className="w-32 shrink-0 text-sm font-medium">
              <span className="text-muted-foreground mr-1.5">{p.questionNumber}.</span>
              {p.label}
            </span>
            <Input
              value={answers[p.inputId] ?? ''}
              onChange={(e) => setAnswer(p.inputId, e.target.value)}
              placeholder="Answer"
              className="text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
