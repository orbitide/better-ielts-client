'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ensurePresenceConnection, onOnlineCountChanged } from '@/lib/realtime/presence-connection'

export function OnlineUsersCard() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const unsubscribe = onOnlineCountChanged(setCount)
    ensurePresenceConnection().catch(() => {})
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-1">Online Now</p>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <p className="text-3xl font-extrabold">{count ?? '—'}</p>
        </div>
        <p className="text-xs text-muted-foreground mt-1">studying with you</p>
      </CardContent>
    </Card>
  )
}
