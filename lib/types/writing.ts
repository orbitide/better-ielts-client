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
