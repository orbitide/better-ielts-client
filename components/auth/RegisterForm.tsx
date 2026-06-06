'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BrandMark } from '@/components/layout/BrandMark'
import { BrandName } from '@/components/layout/BrandName'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DUMMY_CREDENTIALS } from '@/lib/auth/dummy-credentials'
import { useAuthStore } from '@/lib/store/auth-store'
import { AuthDivider } from './AuthDivider'
import { GoogleButton } from './GoogleButton'

export function RegisterForm() {
  const router = useRouter()
  const register = useAuthStore((s) => s.register)
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle)

  const [name, setName] = useState<string>(DUMMY_CREDENTIALS.name)
  const [email, setEmail] = useState<string>(DUMMY_CREDENTIALS.email)
  const [password, setPassword] = useState<string>(DUMMY_CREDENTIALS.password)
  const [loading, setLoading] = useState(false)

  function handleGoogleSignup() {
    loginWithGoogle()
    router.push('/dashboard')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    register(name, email, password)
    router.push('/dashboard')
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
          <GoogleButton onClick={handleGoogleSignup} label="Sign up with Google" />

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
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Demo mode</span> — fields are pre-filled. Just click Create account.
            </div>

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
