export type WritingTask1 = {
  id: string
  type: 'task1'
  title: string
  prompt: string
  imageUrl: string
  imageAlt: string
  wordMinimum: number
  timeMinutes: number
  sampleAnswer?: string
}

export type WritingTask2 = {
  id: string
  type: 'task2'
  title: string
  prompt: string
  wordMinimum: number
  timeMinutes: number
  sampleAnswer?: string
}

export type WritingTask = WritingTask1 | WritingTask2

export type WritingTaskSummary = {
  id: string
  title: string
  type: 'task1' | 'task2'
  wordMinimum: number
  timeMinutes: number
}

export type WritingFeedback = {
  id: string
  overallBand: number
  taskAchievement: number
  coherenceCohesion: number
  lexicalResource: number
  grammaticalRange: number
  comments: string
  createdAt: string
}

export type WritingSubmission = {
  id: string
  writingTaskId: string
  taskTitle: string
  taskType: 'task1' | 'task2'
  response: string
  wordCount: number
  status: string
  createdAt: string
  feedback: WritingFeedback | null
}
