'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { BrandMark } from '@/components/layout/BrandMark'
import { BrandName } from '@/components/layout/BrandName'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store/auth-store'
import { AuthDivider } from './AuthDivider'
import { GoogleAuthButton } from './GoogleAuthButton'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/dashboard'

  const loginWithEmail = useAuthStore((s) => s.loginWithEmail)
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle)
  const authHydrated = useAuthStore((s) => s._hasHydrated)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const [email, setEmail] = useState('shuvo@betterielts.com')
  const [password, setPassword] = useState('123456a')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (!authHydrated || isAuthenticated) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { ok, error: loginError } = await loginWithEmail(email, password)
      if (ok) {
        router.push(redirect)
      } else {
        setError(loginError ?? 'Invalid email or password.')
        setLoading(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  async function handleGoogleSuccess(idToken: string) {
    setError(null)
    setLoading(true)

    const { ok, error: loginError } = await loginWithGoogle(idToken)
    if (ok) {
      router.push(redirect)
    } else {
      setError(loginError ?? 'Google sign-in failed.')
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm py-16 px-4">
      <div className="flex flex-col items-center gap-2 mb-8">
        <BrandMark />
        <BrandName />
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Sign in to continue your IELTS preparation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <GoogleAuthButton
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google sign-in failed.')}
            text="signin_with"
          />

          <AuthDivider />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5" suppressHydrationWarning>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5" suppressHydrationWarning>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
                {error === 'Email address is not verified.' && (
                  <>
                    {' '}
                    <Link
                      href={`/verify-email?email=${encodeURIComponent(email)}`}
                      className="underline"
                    >
                      Resend verification email
                    </Link>
                  </>
                )}
              </p>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
