export type CallPhase = 'setup' | 'matching' | 'connecting' | 'active' | 'review' | 'ended'

// GET /api/calls/topics — id is a server GUID, questions replaces prompts
export type CallTopic = {
  id: string
  label: string
  icon: string
  description: string
  questions: string[]
  status: 'draft' | 'published' | 'archived'
  sortOrder: number
  createdAt: string
}

// Shared shape used in MatchFound.topics
export type CallSessionTopicEntry = {
  topicId: string
  label: string
  icon: string
  questions: string[]
}

// ─── SignalR: server → client payloads ──────────────────────────────────────
export type PartnerInfoDto = {
  userId: string
  name: string
  avatarUrl: string
}

export type MatchFoundPayload = {
  sessionId: string
  partner: PartnerInfoDto
  topics: CallSessionTopicEntry[]
  currentTopicIndex: number
  isInitiator: boolean
}

export type TopicChangedPayload = {
  sessionId: string
  currentTopicIndex: number
}

export type PartnerLeftPayload = {
  sessionId: string
  reason: string
}

export type CallEndedPayload = {
  sessionId: string
  durationSeconds: number
  topicsDiscussed: string[]
  endedBy: 'self' | 'partner'
}

export type QueueCountChangedPayload = {
  count: number
}

// ─── SignalR: WebRTC signaling relay ────────────────────────────────────────
export type CallSignalPayload = {
  sessionId: string
  type: 'offer' | 'answer' | 'ice-candidate'
  data: string
}

export type CallSummary = {
  durationSeconds: number
  topicsDiscussed: string[]
}

// ─── REST: POST /api/calls/{sessionId}/review ───────────────────────────────
export type CallReviewRequest = {
  overallRating: number
  fluencyRating?: number
  engagementRating?: number
  vocabularyRating?: number
  flags: string[]
}

export type CallReviewDto = {
  id: string
  callSessionId: string
  overallRating: number
  fluencyRating: number | null
  engagementRating: number | null
  vocabularyRating: number | null
  flags: string[]
  createdAt: string
}
