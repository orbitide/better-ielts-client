import clientApi from '@/lib/api/client'
import type { CallTopic, CallReviewRequest, CallReviewDto } from '@/lib/types/call'

type ApiResponse<T> = { data: T }

export async function fetchCallTopics(): Promise<CallTopic[]> {
  const { data } = await clientApi.get<ApiResponse<CallTopic[]>>('/api/calls/topics')
  return data.data
}

export async function submitCallReview(sessionId: string, payload: CallReviewRequest): Promise<CallReviewDto> {
  const { data } = await clientApi.post<ApiResponse<CallReviewDto>>(`/api/calls/${sessionId}/review`, payload)
  return data.data
}
