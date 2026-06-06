'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type ResizableSplitPaneProps = {
  left: React.ReactNode
  right: React.ReactNode
  defaultLeftPercent?: number
  minLeftPercent?: number
  maxLeftPercent?: number
  className?: string
  storageKey?: string
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function ResizableSplitPane({
  left,
  right,
  defaultLeftPercent = 58,
  minLeftPercent = 30,
  maxLeftPercent = 75,
  className,
  storageKey,
}: ResizableSplitPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const [leftPercent, setLeftPercent] = useState(defaultLeftPercent)

  useEffect(() => {
    if (!storageKey) return
    const stored = localStorage.getItem(storageKey)
    if (!stored) return
    const parsed = Number(stored)
    if (!Number.isNaN(parsed)) {
      setLeftPercent(clamp(parsed, minLeftPercent, maxLeftPercent))
    }
  }, [storageKey, defaultLeftPercent, minLeftPercent, maxLeftPercent])

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const percent = ((clientX - rect.left) / rect.width) * 100
      const next = clamp(percent, minLeftPercent, maxLeftPercent)
      setLeftPercent(next)
      if (storageKey) localStorage.setItem(storageKey, String(next))
    },
    [minLeftPercent, maxLeftPercent, storageKey],
  )

  const stopDragging = useCallback(() => {
    dragging.current = false
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [])

  const startDragging = useCallback(() => {
    dragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      updateFromClientX(e.clientX)
    }

    const onMouseUp = () => {
      if (dragging.current) stopDragging()
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current || !e.touches[0]) return
      updateFromClientX(e.touches[0].clientX)
    }

    const onTouchEnd = () => {
      if (dragging.current) stopDragging()
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      stopDragging()
    }
  }, [updateFromClientX, stopDragging])

  return (
    <div ref={containerRef} className={cn('flex flex-1 overflow-hidden', className)}>
      <div
        className="flex h-full min-w-0 flex-col overflow-hidden"
        style={{ width: `${leftPercent}%` }}
      >
        {left}
      </div>

      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize panels"
        tabIndex={0}
        onMouseDown={startDragging}
        onTouchStart={startDragging}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            setLeftPercent((p) => clamp(p - 2, minLeftPercent, maxLeftPercent))
          } else if (e.key === 'ArrowRight') {
            setLeftPercent((p) => clamp(p + 2, minLeftPercent, maxLeftPercent))
          }
        }}
        className={cn(
          'group relative z-10 flex w-2 shrink-0 cursor-col-resize items-center justify-center',
          'bg-border/60 transition-colors hover:bg-primary/20 active:bg-primary/30',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        )}
      >
        <div className="h-10 w-1 rounded-full bg-muted-foreground/30 transition-colors group-hover:bg-primary/60" />
      </div>

      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        {right}
      </div>
    </div>
  )
}
