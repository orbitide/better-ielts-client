import clientApi from '@/lib/api/client'
import type { User } from '@/lib/types/user'

type ApiUser = {
  id: string
  name: string
  email: string
  role: string
  avatarUrl: string | null
  plan: string
  targetBand: number | null
  isEmailVerified: boolean
  createdAt: string
}

type ApiAuthResponse = {
  success: boolean
  data?: {
    mfaRequired: boolean
    mfaChallengeToken: string | null
    token: {
      accessToken: string
      refreshToken: string
      expiresIn: number
      user: ApiUser
    } | null
  }
  message?: string
}

type ApiTokenResponse = {
  success: boolean
  data?: {
    accessToken: string
    refreshToken: string
    expiresIn: number
    user: ApiUser
  }
  message?: string
}

function mapApiUser(u: ApiUser): User {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    avatarUrl: u.avatarUrl ?? '',
    targetBand: u.targetBand ?? 7,
    currentBand: { overall: 0, listening: 0, reading: 0, writing: 0, speaking: 0 },
    totalStudyHours: 0,
    joinedAt: u.createdAt,
    plan: (u.plan as User['plan']) ?? 'free',
  }
}

export async function loginAction(
  email: string,
  password: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const { data } = await clientApi.post<ApiAuthResponse>('/api/auth/login', { email, password })
    if (!data.success || !data.data?.token) {
      return { ok: false, error: data.message ?? 'Invalid email or password.' }
    }
    return { ok: true, user: mapApiUser(data.data.token.user) }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unable to connect to server.' }
  }
}

export async function registerAction(
  name: string,
  email: string,
  password: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const { data } = await clientApi.post<ApiAuthResponse>('/api/auth/register', { name, email, password })
    if (!data.success || !data.data?.token) {
      return { ok: false, error: data.message ?? 'Registration failed.' }
    }
    return { ok: true, user: mapApiUser(data.data.token.user) }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unable to connect to server.' }
  }
}

export async function googleAuthAction(
  idToken: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const { data } = await clientApi.post<ApiAuthResponse>('/api/auth/google', { idToken })
    if (!data.success || !data.data?.token) {
      return { ok: false, error: data.message ?? 'Google sign-in failed.' }
    }
    return { ok: true, user: mapApiUser(data.data.token.user) }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unable to connect to server.' }
  }
}

export async function logoutAction(): Promise<void> {
  try {
    await clientApi.post('/api/auth/logout')
  } catch {
    // Ignore — session will expire naturally
  }
}

export async function refreshAction(): Promise<boolean> {
  try {
    const { data } = await clientApi.post<ApiTokenResponse>('/api/auth/refresh')
    return data.success ?? false
  } catch {
    return false
  }
}

export async function forgotPasswordAction(email: string): Promise<{ ok: boolean; message: string }> {
  try {
    const { data } = await clientApi.post<{ success: boolean; message?: string }>(
      '/api/auth/forgot-password',
      { email }
    )
    return { ok: true, message: data.message ?? 'If this email exists, a reset link has been sent.' }
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Unable to connect to server.' }
  }
}

export async function resetPasswordAction(
  email: string,
  token: string,
  newPassword: string,
  confirmPassword: string
): Promise<{ ok: boolean; message: string }> {
  try {
    const { data } = await clientApi.post<{ success: boolean; message?: string }>(
      '/api/auth/reset-password',
      { email, token, newPassword, confirmPassword }
    )
    return { ok: true, message: data.message ?? 'Password reset successfully. You can now sign in.' }
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Unable to connect to server.' }
  }
}
