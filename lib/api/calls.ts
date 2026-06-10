import http from '@/lib/api/http'
import type { CallTopic, CallReviewRequest, CallReviewDto } from '@/lib/types/call'

type ApiResponse<T> = { data: T }

export async function fetchCallTopics(): Promise<CallTopic[]> {
  const { data } = await http.get<ApiResponse<CallTopic[]>>('/api/calls/topics')
  return data.data
}

export async function submitCallReview(sessionId: string, payload: CallReviewRequest): Promise<CallReviewDto> {
  const { data } = await http.post<ApiResponse<CallReviewDto>>(`/api/calls/${sessionId}/review`, payload)
  return data.data
}
