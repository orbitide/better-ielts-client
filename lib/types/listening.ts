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
}

export type ListeningTest = {
  id: string
  title: string
  durationMinutes: number
  sections: ListeningSection[]
}
