'use client'

import { useEffect, useRef } from 'react'
import { formatSeconds } from '@/lib/utils/format'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  seconds: number
  onExpire?: () => void
  className?: string
  warningThreshold?: number
}

export function CountdownTimer({
  seconds,
  onExpire,
  className,
  warningThreshold = 300,
}: CountdownTimerProps) {
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    if (seconds === 0) {
      onExpireRef.current?.()
    }
  }, [seconds])

  return (
    <span
      className={cn(
        'font-mono tabular-nums font-semibold',
        seconds <= warningThreshold && seconds > 60 && 'text-amber-500',
        seconds <= 60 && 'text-destructive animate-pulse',
        className
      )}
    >
      {formatSeconds(seconds)}
    </span>
  )
}
