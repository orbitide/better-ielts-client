'use client'

import type { TableNode } from '@/lib/types/listening'
import { Input } from '@/components/ui/input'
import { useTestStore } from '@/lib/store/test-store'

export function TableNodeView({ node }: { node: TableNode }) {
  const { answers, setAnswer } = useTestStore()

  return (
    <div className="space-y-2">
      {node.title && <p className="text-sm font-semibold">{node.title}</p>}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40">
              {node.headers.map((header, i) => (
                <th key={i} className="border-b px-3 py-2 text-left font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {node.rows.map((row) => (
              <tr key={row.id} className="border-b last:border-b-0">
                {row.cells.map((cell, i) => (
                  <td key={i} className="px-3 py-2 align-middle">
                    {cell.type === 'text' ? (
                      cell.value
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="shrink-0 text-xs text-muted-foreground">{cell.questionNumber}.</span>
                        <Input
                          value={answers[cell.inputId] ?? ''}
                          onChange={(e) => setAnswer(cell.inputId, e.target.value)}
                          placeholder="Answer"
                          className="text-sm"
                        />
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
