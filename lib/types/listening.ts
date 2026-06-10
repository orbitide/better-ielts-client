export type ListeningQuestionType = 'mcq' | 'fill-blank' | 'matching'

export type ListeningQuestion = {
  id: string
  type: ListeningQuestionType
  questionNumber: number
  stem: string
  options?: { label: string; text: string }[]
  correctAnswer: string
}

export type ListeningSection = {
  id: string
  sectionNumber: 1 | 2 | 3 | 4
  audioUrl: string
  audioDurationSeconds: number
  transcript: string
  questions: ListeningQuestion[]
  layout?: ListeningLayout
}

export type ListeningTest = {
  id: string
  title: string
  durationMinutes: number
  sections: ListeningSection[]
}

// ─── Listening structured layout types (Beta, additive) ──────────────────────
// A section may have BOTH `questions` and `layout`; both are graded.
// `inputId` is globally unique across the test, conventionally `q${questionNumber}`.

export type McqOption = { label: string; text: string }

export type TableCell =
  | { type: 'text'; value: string }
  | { type: 'input'; inputId: string; questionNumber: number; correctAnswer: string }

export type TableRow = {
  id: string
  cells: TableCell[]
}

export type TableNode = {
  type: 'table'
  id: string
  title?: string
  headers: string[]
  rows: TableRow[]
}

export type McqGroupQuestion = {
  id: string
  inputId: string
  questionNumber: number
  text: string
  options: McqOption[]
  correctAnswer: string
}

export type McqGroupNode = {
  type: 'mcq_group'
  id: string
  title?: string
  instructions?: string
  questions: McqGroupQuestion[]
}

export type GapFillBlock =
  | { type: 'text'; value: string }
  | { type: 'input'; inputId: string; questionNumber: number; correctAnswer: string }

export type GapFillNode = {
  type: 'gap_fill'
  id: string
  title?: string
  blocks: GapFillBlock[]
}

export type ImageLabelPoint = {
  label: string
  inputId: string
  questionNumber: number
  correctAnswer: string
  x: number // 0-100, % from left
  y: number // 0-100, % from top
}

export type ImageLabelNode = {
  type: 'image_label'
  id: string
  title?: string
  imageUrl: string
  points: ImageLabelPoint[]
}

export type ListeningLayoutNode = TableNode | McqGroupNode | GapFillNode | ImageLabelNode

export type ListeningLayout = {
  nodes: ListeningLayoutNode[]
}
