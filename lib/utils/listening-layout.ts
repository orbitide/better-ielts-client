import type { ListeningLayoutNode } from '@/lib/types/listening'

export type LayoutAnswerKey = {
  inputId: string
  questionNumber: number
  correctAnswer: string
}

export function getLayoutAnswerKeys(nodes: ListeningLayoutNode[] | undefined): LayoutAnswerKey[] {
  if (!nodes) return []
  const keys: LayoutAnswerKey[] = []

  for (const node of nodes) {
    if (node.type === 'table') {
      for (const row of node.rows) {
        for (const cell of row.cells) {
          if (cell.type === 'input') keys.push(cell)
        }
      }
    } else if (node.type === 'mcq_group') {
      for (const q of node.questions) {
        keys.push({ inputId: q.inputId, questionNumber: q.questionNumber, correctAnswer: q.correctAnswer })
      }
    } else if (node.type === 'gap_fill') {
      for (const block of node.blocks) {
        if (block.type === 'input') keys.push(block)
      }
    } else if (node.type === 'image_label') {
      for (const point of node.points) keys.push(point)
    }
  }

  return keys.sort((a, b) => a.questionNumber - b.questionNumber)
}
