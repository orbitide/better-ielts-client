export type CallPhase = 'setup' | 'matching' | 'connecting' | 'active' | 'review' | 'ended'

export type CallTopic = {
  id: string
  label: string
  icon: string
  description: string
}

export type CallPromptCard = {
  topicId: string
  topicLabel: string
  prompts: [string, string, string]
}

export type CallSummary = {
  durationSeconds: number
  topicsDiscussed: string[]
}

export type CallReview = {
  overall: number
  fluency: number | null
  engagement: number | null
  vocabulary: number | null
  flags: string[]
}
