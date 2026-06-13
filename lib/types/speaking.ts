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

export type SpeakingFeedback = {
  id: string
  overallBand: number
  fluencyCoherence: number
  lexicalResource: number
  grammaticalRange: number
  pronunciation: number
  comments: string
  createdAt: string
}

export type SpeakingSubmission = {
  id: string
  speakingSessionId: string
  sessionTitle: string
  audioUrl: string | null
  notes: string | null
  status: string
  createdAt: string
  feedback: SpeakingFeedback | null
}
