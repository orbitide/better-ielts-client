'use client'

import { useEffect, useRef } from 'react'
import { useTestStore } from '@/lib/store/test-store'

export function useTestTimer() {
  const { isRunning, tickTimer, timeRemainingSeconds } = useTestStore()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tickTimer, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, tickTimer])

  return timeRemainingSeconds
}
