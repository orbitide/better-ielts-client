import { Suspense } from 'react'
import { VerifyEmailView } from '@/components/auth/VerifyEmailView'

export const metadata = { title: 'Verify Email' }

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailView />
    </Suspense>
  )
}
