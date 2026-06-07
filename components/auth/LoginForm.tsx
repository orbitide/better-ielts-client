'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { BrandMark } from '@/components/layout/BrandMark'
import { BrandName } from '@/components/layout/BrandName'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DUMMY_CREDENTIALS } from '@/lib/auth/dummy-credentials'
import { useAuthStore } from '@/lib/store/auth-store'
import { AuthDivider } from './AuthDivider'
import { GoogleButton } from './GoogleButton'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/dashboard'

  const loginWithEmail = useAuthStore((s) => s.loginWithEmail)
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle)
  const authHydrated = useAuthStore((s) => s._hasHydrated)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const [email, setEmail] = useState<string>(DUMMY_CREDENTIALS.email)
  const [password, setPassword] = useState<string>(DUMMY_CREDENTIALS.password)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (!authHydrated || isAuthenticated) return null

  function handleGoogleLogin() {
    loginWithGoogle()
    router.push(redirect)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const ok = loginWithEmail(email, password)
    if (ok) {
      router.push(redirect)
    } else {
      setError('Invalid email or password. Use the demo credentials shown below.')
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
          <GoogleButton onClick={handleGoogleLogin} label="Sign in with Google" />

          <AuthDivider />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
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

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Demo credentials</span>
              <br />
              {DUMMY_CREDENTIALS.email} / {DUMMY_CREDENTIALS.password}
            </div>

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
