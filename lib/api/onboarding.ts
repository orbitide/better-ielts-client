import http from '@/lib/api/http'
import type { OnboardingData } from '@/lib/types/onboarding'

type ApiOnboardingProfile = {
  exam: string
  targetBand: string
  englishLevel: string
  experience: string
  testDate: string
  purpose: string
  country: string
  focusSkills: string[]
} | null

type ApiOnboardingResponse = {
  success: boolean
  data?: ApiOnboardingProfile
  message?: string
}

export async function saveOnboarding(
  data: OnboardingData
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await http.post('/api/onboarding', data)
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unable to connect to server.' }
  }
}

export async function fetchOnboardingProfile(): Promise<Partial<OnboardingData> | null> {
  try {
    const { data } = await http.get<ApiOnboardingResponse>('/api/onboarding')
    return (data.data as Partial<OnboardingData> | null | undefined) ?? null
  } catch {
    return null
  }
}
