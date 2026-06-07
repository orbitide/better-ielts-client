'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ExamToolbarProps = {
  module: string
  exitHref: string
  exitLabel?: string
  onExit?: () => void
  center?: React.ReactNode
  trailing?: React.ReactNode
  className?: string
}

export function ExamToolbar({
  module,
  exitHref,
  exitLabel = 'Exit test',
  onExit,
  center,
  trailing,
  className,
}: ExamToolbarProps) {
  return (
    <header
      className={cn(
        'flex h-11 shrink-0 items-center gap-3 border-b border-black/20 bg-[#2b2f36] px-3 text-white select-none',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50 sm:inline">
          IELTS
        </span>
        <span className="truncate text-sm font-medium">{module}</span>
      </div>

      {center && <div className="mx-auto flex items-center gap-1">{center}</div>}

      <div className="ml-auto flex items-center gap-3">
        {trailing}
        {onExit ? (
          <button
            onClick={onExit}
            className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-3.5" />
            <span className="hidden sm:inline">{exitLabel}</span>
          </button>
        ) : (
          <Link
            href={exitHref}
            className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-3.5" />
            <span className="hidden sm:inline">{exitLabel}</span>
          </Link>
        )}
      </div>
    </header>
  )
}

export function ExamSectionTab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded px-3 py-1 text-xs font-medium transition-colors',
        active
          ? 'bg-white/15 text-white'
          : 'text-white/60 hover:bg-white/8 hover:text-white/90',
      )}
    >
      {children}
    </button>
  )
}
