export type McqQuestion = {
  id: string
  type: 'mcq'
  questionNumber: number
  stem: string
  options: { label: string; text: string }[]
  correctAnswer: string
}

export type TfngQuestion = {
  id: string
  type: 'tfng'
  questionNumber: number
  statement: string
  correctAnswer: 'TRUE' | 'FALSE' | 'NOT GIVEN'
}

export type MatchingQuestion = {
  id: string
  type: 'matching'
  questionNumber: number
  stem: string
  correctAnswer: string
  options: { key: string; text: string }[]
}

export type FillBlankQuestion = {
  id: string
  type: 'fill-blank'
  questionNumber: number
  stem: string
  correctAnswer: string
  wordLimit?: number
}

export type ReadingQuestion =
  | McqQuestion
  | TfngQuestion
  | MatchingQuestion
  | FillBlankQuestion

export type ReadingPassage = {
  id: string
  title: string
  body: string
  wordCount: number
}

export type ReadingSection = {
  id: string
  passageIndex: number
  passage: ReadingPassage
  questions: ReadingQuestion[]
}

export type ReadingTest = {
  id: string
  title: string
  type: 'academic' | 'general'
  durationMinutes: number
  sections: ReadingSection[]
}
