'use server'

import { cookies } from 'next/headers'
import axios from 'axios'
import serverApi from '@/lib/api/server'
import type { User } from '@/lib/types/user'

const ACCESS_COOKIE = 'auth_access'
const REFRESH_COOKIE = 'auth_refresh'
const ACCESS_MAX_AGE = 60 * 60            // 1 hour
const REFRESH_MAX_AGE = 30 * 24 * 60 * 60 // 30 days

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

// Shape for login / register / google — backend returns ApiResponse<AuthResultDto>
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

// Shape for refresh — backend returns ApiResponse<TokenDto>
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

async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies()
  cookieStore.set(ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: ACCESS_MAX_AGE,
    path: '/',
  })
  cookieStore.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: REFRESH_MAX_AGE,
    path: '/',
  })
}

function getAuthError(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err) && err.response) {
    const json = err.response.data as { message?: string }
    return json.message ?? fallback
  }
  return 'Unable to connect to server. Please try again.'
}

export async function loginAction(
  email: string,
  password: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const { data: json } = await serverApi.post<ApiAuthResponse>('/api/auth/login', { email, password })
    if (!json.success || !json.data?.token) {
      return { ok: false, error: json.message ?? 'Invalid email or password.' }
    }
    await setAuthCookies(json.data.token.accessToken, json.data.token.refreshToken)
    return { ok: true, user: mapApiUser(json.data.token.user) }
  } catch (err) {
    return { ok: false, error: getAuthError(err, 'Invalid email or password.') }
  }
}

export async function registerAction(
  name: string,
  email: string,
  password: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const { data: json } = await serverApi.post<ApiAuthResponse>('/api/auth/register', { name, email, password })
    if (!json.success || !json.data?.token) {
      return { ok: false, error: json.message ?? 'Registration failed.' }
    }
    await setAuthCookies(json.data.token.accessToken, json.data.token.refreshToken)
    return { ok: true, user: mapApiUser(json.data.token.user) }
  } catch (err) {
    return { ok: false, error: getAuthError(err, 'Registration failed.') }
  }
}

export async function googleAuthAction(
  idToken: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const { data: json } = await serverApi.post<ApiAuthResponse>('/api/auth/google', { idToken })
    if (!json.success || !json.data?.token) {
      return { ok: false, error: json.message ?? 'Google sign-in failed.' }
    }
    await setAuthCookies(json.data.token.accessToken, json.data.token.refreshToken)
    return { ok: true, user: mapApiUser(json.data.token.user) }
  } catch (err) {
    return { ok: false, error: getAuthError(err, 'Google sign-in failed.') }
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value

  if (refreshToken) {
    try {
      await serverApi.post(
        '/api/auth/logout',
        { refreshToken },
        { headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {} }
      )
    } catch {
      // Ignore — clear cookies regardless
    }
  }

  cookieStore.delete(ACCESS_COOKIE)
  cookieStore.delete(REFRESH_COOKIE)
}

export async function refreshAction(): Promise<boolean> {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value
  if (!refreshToken) return false
  try {
    const { data: json } = await serverApi.post<ApiTokenResponse>('/api/auth/refresh', { refreshToken })
    if (!json.success || !json.data) return false
    await setAuthCookies(json.data.accessToken, json.data.refreshToken)
    return true
  } catch {
    return false
  }
}

export async function forgotPasswordAction(email: string): Promise<{ ok: boolean; message: string }> {
  try {
    const { data: json } = await serverApi.post<{ success: boolean; message?: string }>(
      '/api/auth/forgot-password',
      { email }
    )
    return { ok: true, message: json.message ?? 'If this email exists, a reset link has been sent.' }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return { ok: false, message: (err.response.data as { message?: string }).message ?? 'Request failed.' }
    }
    return { ok: false, message: 'Unable to connect to server.' }
  }
}

export async function resetPasswordAction(
  email: string,
  token: string,
  newPassword: string,
  confirmPassword: string
): Promise<{ ok: boolean; message: string }> {
  try {
    const { data: json } = await serverApi.post<{ success: boolean; message?: string }>(
      '/api/auth/reset-password',
      { email, token, newPassword, confirmPassword }
    )
    return { ok: true, message: json.message ?? 'Password reset successfully. You can now sign in.' }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return { ok: false, message: (err.response.data as { message?: string }).message ?? 'Failed to reset password.' }
    }
    return { ok: false, message: 'Unable to connect to server.' }
  }
}
