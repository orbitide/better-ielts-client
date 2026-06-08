'use server'

import { cookies } from 'next/headers'
import type { User } from '@/lib/types/user'

const ACCESS_COOKIE = 'auth_access'
const REFRESH_COOKIE = 'auth_refresh'
const ACCESS_MAX_AGE = 60 * 60        // 1 hour
const REFRESH_MAX_AGE = 30 * 24 * 60 * 60 // 30 days

const API_URL = process.env.API_URL ?? 'http://localhost:5000'

type ApiTokenResponse = {
  success: boolean
  data?: {
    accessToken: string
    refreshToken: string
    user: {
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
  }
  message?: string
}

function mapApiUser(u: NonNullable<ApiTokenResponse['data']>['user']): User {
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

export async function loginAction(
  email: string,
  password: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const json: ApiTokenResponse = await res.json()
    if (!res.ok || !json.success || !json.data) {
      return { ok: false, error: json.message ?? 'Invalid email or password.' }
    }
    await setAuthCookies(json.data.accessToken, json.data.refreshToken)
    return { ok: true, user: mapApiUser(json.data.user) }
  } catch {
    return { ok: false, error: 'Unable to connect to server. Please try again.' }
  }
}

export async function registerAction(
  name: string,
  email: string,
  password: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const json: ApiTokenResponse = await res.json()
    if (!res.ok || !json.success || !json.data) {
      return { ok: false, error: json.message ?? 'Registration failed.' }
    }
    await setAuthCookies(json.data.accessToken, json.data.refreshToken)
    return { ok: true, user: mapApiUser(json.data.user) }
  } catch {
    return { ok: false, error: 'Unable to connect to server. Please try again.' }
  }
}

export async function googleAuthAction(
  idToken: string
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${API_URL}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })
    const json: ApiTokenResponse = await res.json()
    if (!res.ok || !json.success || !json.data) {
      return { ok: false, error: json.message ?? 'Google sign-in failed.' }
    }
    await setAuthCookies(json.data.accessToken, json.data.refreshToken)
    return { ok: true, user: mapApiUser(json.data.user) }
  } catch {
    return { ok: false, error: 'Unable to connect to server. Please try again.' }
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value

  if (refreshToken) {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ refreshToken }),
      })
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
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    const json: ApiTokenResponse = await res.json()
    if (!res.ok || !json.success || !json.data) return false
    await setAuthCookies(json.data.accessToken, json.data.refreshToken)
    return true
  } catch {
    return false
  }
}

export async function forgotPasswordAction(email: string): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const json = await res.json()
    return { ok: true, message: json.message ?? 'If this email exists, a reset link has been sent.' }
  } catch {
    return { ok: false, message: 'Unable to connect to server.' }
  }
}

export async function resetPasswordAction(
  token: string,
  newPassword: string,
  confirmPassword: string
): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword, confirmPassword }),
    })
    const json = await res.json()
    if (!res.ok) return { ok: false, message: json.message ?? 'Failed to reset password.' }
    return { ok: true, message: 'Password reset successfully. You can now sign in.' }
  } catch {
    return { ok: false, message: 'Unable to connect to server.' }
  }
}
