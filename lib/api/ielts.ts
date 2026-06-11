import http from '@/lib/api/http'

// ─── Listening ───────────────────────────────────────────────────────────────

export async function fetchListeningTests(page = 1, pageSize = 50) {
  const { data } = await http.get('/api/ielts/listening', { params: { page, pageSize } })
  return (data.data?.items ?? []) as unknown[]
}

export async function fetchListeningTest(id: string) {
  const { data } = await http.get(`/api/ielts/listening/${id}`)
  return data.data as unknown
}

// ─── Reading ─────────────────────────────────────────────────────────────────

export async function fetchReadingTests(page = 1, pageSize = 50) {
  const { data } = await http.get('/api/ielts/reading', { params: { page, pageSize } })
  return (data.data?.items ?? []) as unknown[]
}

const READING_SECTIONS_PAGE_SIZE = 10 // ~3 sections per test, generous headroom
const READING_QUESTIONS_PAGE_SIZE = 50 // ~13-14 questions per section, generous headroom

export async function fetchReadingTest(id: string) {
  const { data: testData } = await http.get(`/api/ielts/reading/${id}`)
  const test = testData.data as Record<string, unknown>

  const { data: sectionsData } = await http.get(`/api/ielts/reading/${id}/sections`, {
    params: { page: 1, pageSize: READING_SECTIONS_PAGE_SIZE },
  })
  const sections = (sectionsData.data?.items ?? []) as Record<string, unknown>[]

  const sectionsWithQuestions = await Promise.all(
    sections.map(async (section) => {
      const { data: questionsData } = await http.get(`/api/ielts/reading/sections/${section.id}/questions`, {
        params: { page: 1, pageSize: READING_QUESTIONS_PAGE_SIZE },
      })
      return { ...section, questions: questionsData.data?.items ?? [] }
    })
  )

  return { ...test, sections: sectionsWithQuestions } as unknown
}

// ─── Writing ─────────────────────────────────────────────────────────────────

export async function fetchWritingTasks(page = 1, pageSize = 50, type?: string) {
  const params: Record<string, string | number> = { page, pageSize }
  if (type) params.type = type
  const { data } = await http.get('/api/ielts/writing', { params })
  return (data.data?.items ?? []) as unknown[]
}

export async function fetchWritingTask(id: string) {
  const { data } = await http.get(`/api/ielts/writing/${id}`)
  return data.data as unknown
}

// ─── Speaking ────────────────────────────────────────────────────────────────

export async function fetchSpeakingSessions(page = 1, pageSize = 50) {
  const { data } = await http.get('/api/ielts/speaking', { params: { page, pageSize } })
  return (data.data?.items ?? []) as unknown[]
}

export async function fetchSpeakingSession(id: string) {
  const { data } = await http.get(`/api/ielts/speaking/${id}`)
  return data.data as unknown
}

// ─── Vocabulary ───────────────────────────────────────────────────────────────

export async function fetchVocabTopics(page = 1, pageSize = 50, difficulty?: string) {
  const params: Record<string, string | number> = { page, pageSize }
  if (difficulty) params.difficulty = difficulty
  const { data } = await http.get('/api/ielts/vocabulary', { params })
  return (data.data?.items ?? []) as unknown[]
}

export async function fetchVocabTopic(slug: string) {
  const { data } = await http.get(`/api/ielts/vocabulary/${slug}`)
  return data.data as unknown
}

// ─── Mock Tests ───────────────────────────────────────────────────────────────

export async function fetchMockTests(page = 1, pageSize = 50) {
  const { data } = await http.get('/api/ielts/mock-tests', { params: { page, pageSize } })
  return (data.data?.items ?? []) as unknown[]
}

export async function fetchMockTest(id: string) {
  const { data } = await http.get(`/api/ielts/mock-tests/${id}`)
  return data.data as unknown
}

// ─── Exam Guide ───────────────────────────────────────────────────────────────

export async function fetchExamGuide() {
  const { data } = await http.get('/api/exam-guide')
  return data.data
}

// ─── Study Plans ─────────────────────────────────────────────────────────────

export async function fetchCurrentStudyPlan() {
  const { data } = await http.get('/api/ielts/study-plans/current')
  return data.data
}

export async function createStudyPlan(targetBand: number, weeklyGoalMinutes = 300) {
  const { data } = await http.post('/api/ielts/study-plans', { targetBand, weeklyGoalMinutes })
  return data.data
}

export async function updateStudyTaskStatus(taskId: string, status: string) {
  const { data } = await http.patch(`/api/ielts/study-plans/tasks/${taskId}`, { status })
  return data.data
}
