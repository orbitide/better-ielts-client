'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BrandMark } from '@/components/layout/BrandMark'
import { BrandName } from '@/components/layout/BrandName'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store/auth-store'
import { AuthDivider } from './AuthDivider'
import { GoogleAuthButton } from './GoogleAuthButton'

export function RegisterForm() {
  const router = useRouter()
  const register = useAuthStore((s) => s.register)
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    const result = await register(name, email, password)
    if (result.ok && result.requiresVerification) {
      router.push(`/verify-email?email=${encodeURIComponent(result.email ?? email)}`)
    } else if (result.ok) {
      router.push('/dashboard')
    } else {
      setError(result.error ?? 'Registration failed. Please try again.')
      setLoading(false)
    }
  }

  async function handleGoogleSuccess(idToken: string) {
    setError(null)
    setLoading(true)

    const { ok, error: loginError } = await loginWithGoogle(idToken)
    if (ok) {
      router.push('/dashboard')
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
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Start preparing for your target band score</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <GoogleAuthButton
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google sign-in failed.')}
            text="signup_with"
          />

          <AuthDivider />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Full name
              </label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              <PasswordInput
                id="password"
                autoComplete="new-password"
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

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Creating account…' : 'Create account'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
