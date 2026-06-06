import { Suspense } from 'react'
import { AuthRedirect } from '@/components/auth/AuthRedirect'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata = { title: 'Sign In' }

export default function LoginPage() {
  return (
    <>
      <AuthRedirect />
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  )
}
