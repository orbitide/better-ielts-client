export type CallPhase = 'setup' | 'matching' | 'connecting' | 'active' | 'ended'

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
