export type SpeakingPart = {
  part: 1 | 2 | 3
  topic: string
  questions: string[]
  cueCardPrompt?: string
  preparationSeconds?: number
  speakingMinutes: number
}

export type SpeakingSession = {
  id: string
  title: string
  parts: SpeakingPart[]
}

export type SpeakingSessionSummary = {
  id: string
  title: string
  topic: string
  partCount: number
}
