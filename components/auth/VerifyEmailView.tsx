'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { BrandMark } from '@/components/layout/BrandMark'
import { BrandName } from '@/components/layout/BrandName'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { resendVerificationAction, verifyEmailAction } from '@/app/actions/auth'

type Status = 'pending' | 'verifying' | 'success' | 'error'

export function VerifyEmailView() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const token = searchParams.get('token')

  const [status, setStatus] = useState<Status>(token ? 'verifying' : 'pending')
  const [message, setMessage] = useState<string | null>(null)
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  useEffect(() => {
    if (!token) return
    let cancelled = false
    verifyEmailAction(email, token).then((result) => {
      if (cancelled) return
      setStatus(result.ok ? 'success' : 'error')
      setMessage(result.message)
    })
    return () => {
      cancelled = true
    }
  }, [email, token])

  async function handleResend() {
    setResending(true)
    await resendVerificationAction(email)
    setResending(false)
    setResent(true)
  }

  return (
    <div className="mx-auto w-full max-w-sm py-16 px-4">
      <div className="flex flex-col items-center gap-2 mb-8">
        <BrandMark />
        <BrandName />
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {status === 'success'
              ? 'Email verified'
              : status === 'verifying'
                ? 'Verifying your email…'
                : status === 'error'
                  ? 'Verification failed'
                  : 'Check your email'}
          </CardTitle>
          {status === 'pending' && (
            <CardDescription>
              {email ? (
                <>
                  We&apos;ve sent a verification link to{' '}
                  <span className="font-medium">{email}</span>. Click the link to activate your
                  account.
                </>
              ) : (
                "We've sent you a verification link. Click the link to activate your account."
              )}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          {status === 'verifying' && (
            <p className="text-sm text-muted-foreground">Please wait while we verify your email…</p>
          )}

          {status === 'success' && (
            <>
              <p className="text-sm text-muted-foreground">{message}</p>
              <Button asChild className="w-full" size="lg">
                <Link href="/login">Continue to sign in</Link>
              </Button>
            </>
          )}

          {(status === 'pending' || status === 'error') && (
            <>
              {status === 'error' && <p className="text-sm text-destructive">{message}</p>}
              {email && (
                <Button
                  onClick={handleResend}
                  className="w-full"
                  size="lg"
                  variant={status === 'error' ? 'default' : 'outline'}
                  disabled={resending || resent}
                >
                  {resent
                    ? 'Verification email sent'
                    : resending
                      ? 'Sending…'
                      : 'Resend verification email'}
                </Button>
              )}
              <Link href="/login" className="block text-sm text-primary hover:underline">
                Back to sign in
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
