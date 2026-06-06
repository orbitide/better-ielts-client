'use client'

import { usePathname } from 'next/navigation'
import { isExamRoute } from '@/lib/utils/exam-routes'
import { AppShell } from './AppShell'
import { ExamShell } from './ExamShell'

export function AppLayoutRouter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (isExamRoute(pathname)) {
    return <ExamShell>{children}</ExamShell>
  }

  return <AppShell>{children}</AppShell>
}
