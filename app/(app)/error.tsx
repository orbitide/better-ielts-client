'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { useEffect } from 'react'

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-full items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 mb-4">
          <AlertCircle className="h-7 w-7 text-destructive" />
        </div>
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground text-sm mb-6">
          An unexpected error occurred. You can try again or go back to the dashboard.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={reset}>Try again</Button>
          <Button asChild><a href="/dashboard">Dashboard</a></Button>
        </div>
      </div>
    </div>
  )
}
