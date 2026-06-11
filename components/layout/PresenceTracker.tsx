'use client'

import { useEffect } from 'react'
import { ensurePresenceConnection } from '@/lib/realtime/presence-connection'

export function PresenceTracker() {
  useEffect(() => {
    ensurePresenceConnection().catch(() => {})
  }, [])

  return null
}
