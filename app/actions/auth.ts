'use server'

import { cookies } from 'next/headers'
import http from '@/lib/api/http'
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
    requiresEmailVerification?: boolean
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
    isEmailVerified: u.isEmailVerified,
  }
}

async function setAuthCookie(accessToken: string, expiresIn: number) {
  const cookieStore = await cookies()
  cookieStore.set('auth_access', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: expiresIn,
    path: '/',
  })
}

export async function loginAction(
  email: string,
  password: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const { data } = await http.post<ApiAuthResponse>('/api/auth/login', { email, password })
    if (!data.success || !data.data?.token) {
      return { ok: false, error: data.message ?? 'Invalid email or password.' }
    }
    const { accessToken, expiresIn, user } = data.data.token
    await setAuthCookie(accessToken, expiresIn)
    return { ok: true, user: mapApiUser(user) }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unable to connect to server.' }
  }
}

export async function registerAction(
  name: string,
  email: string,
  password: string
): Promise<
  | { ok: true; user: User }
  | { ok: true; requiresVerification: true; email: string }
  | { ok: false; error: string }
> {
  try {
    const { data } = await http.post<ApiAuthResponse>('/api/auth/register', { name, email, password })
    if (!data.success) {
      return { ok: false, error: data.message ?? 'Registration failed.' }
    }
    if (data.data?.requiresEmailVerification) {
      return { ok: true, requiresVerification: true, email }
    }
    if (!data.data?.token) {
      return { ok: false, error: data.message ?? 'Registration failed.' }
    }
    const { accessToken, expiresIn, user } = data.data.token
    await setAuthCookie(accessToken, expiresIn)
    return { ok: true, user: mapApiUser(user) }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unable to connect to server.' }
  }
}

export async function verifyEmailAction(
  email: string,
  token: string
): Promise<{ ok: boolean; message: string }> {
  try {
    const { data } = await http.post<{ success: boolean; message?: string }>('/api/auth/verify-email', {
      email,
      token,
    })
    return { ok: data.success, message: data.message ?? 'Email verified successfully.' }
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Unable to connect to server.' }
  }
}

export async function resendVerificationAction(email: string): Promise<{ ok: boolean; message: string }> {
  try {
    const { data } = await http.post<{ success: boolean; message?: string }>('/api/auth/resend-verification', {
      email,
    })
    return { ok: true, message: data.message ?? 'If an account exists and is not verified, a verification email has been sent.' }
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Unable to connect to server.' }
  }
}

export async function googleAuthAction(
  idToken: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const { data } = await http.post<ApiAuthResponse>('/api/auth/google', { idToken })
    if (!data.success || !data.data?.token) {
      return { ok: false, error: data.message ?? 'Google sign-in failed.' }
    }
    const { accessToken, expiresIn, user } = data.data.token
    await setAuthCookie(accessToken, expiresIn)
    return { ok: true, user: mapApiUser(user) }
  } catch {
    return { ok: false, error: 'Google sign-in failed.' }
  }
}

export async function meAction(): Promise<{ ok: true; user: User } | { ok: false }> {
  try {
    const { data } = await http.get<{ success: boolean; data?: ApiUser }>('/api/auth/me')
    if (!data.success || !data.data) return { ok: false }
    return { ok: true, user: mapApiUser(data.data) }
  } catch {
    return { ok: false }
  }
}

export async function logoutAction(): Promise<void> {
  try {
    await http.post('/api/auth/logout')
  } catch {
    // Ignore — session will expire naturally
  }
  const cookieStore = await cookies()
  cookieStore.delete('auth_access')
}

export async function refreshAction(): Promise<boolean> {
  try {
    const { data } = await http.post<ApiTokenResponse>('/api/auth/refresh')
    if (!data.success || !data.data) return false
    await setAuthCookie(data.data.accessToken, data.data.expiresIn)
    return true
  } catch {
    return false
  }
}

export async function forgotPasswordAction(email: string): Promise<{ ok: boolean; message: string }> {
  try {
    const { data } = await http.post<{ success: boolean; message?: string }>(
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
    const { data } = await http.post<{ success: boolean; message?: string }>(
      '/api/auth/reset-password',
      { email, token, newPassword, confirmPassword }
    )
    return { ok: true, message: data.message ?? 'Password reset successfully. You can now sign in.' }
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Unable to connect to server.' }
  }
}
