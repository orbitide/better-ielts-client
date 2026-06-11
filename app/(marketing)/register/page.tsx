import { Suspense } from 'react'
import { AuthRedirect } from '@/components/auth/AuthRedirect'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata = { title: 'Create Account' }

export default function RegisterPage() {
  return (
    <Suspense>
      <AuthRedirect />
      <RegisterForm />
    </Suspense>
  )
}
