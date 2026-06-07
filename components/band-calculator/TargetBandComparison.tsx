'use client'

import { cn } from '@/lib/utils'
import { bandColor, formatBand } from '@/lib/utils/format'

interface TargetBandComparisonProps {
  computedBand: number | null
  targetBand: number
}

export function TargetBandComparison({ computedBand, targetBand }: TargetBandComparisonProps) {
  const delta = computedBand !== null ? computedBand - targetBand : null
  const percent = computedBand !== null ? Math.min((computedBand / 9) * 100, 100) : 0
  const targetPercent = Math.min((targetBand / 9) * 100, 100)

  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">vs Your Target</p>
        <span className="text-xs text-muted-foreground">Target: Band {formatBand(targetBand)}</span>
      </div>

      <div className="relative h-3 rounded-full bg-muted overflow-hidden">
        {computedBand !== null && (
          <div
            className={cn('h-full rounded-full transition-all duration-500', bandColor(computedBand).includes('emerald') ? 'bg-emerald-500' : bandColor(computedBand).includes('amber') ? 'bg-amber-500' : 'bg-rose-500')}
            style={{ width: `${percent}%` }}
          />
        )}
        {/* Target marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-foreground/40"
          style={{ left: `${targetPercent}%` }}
        />
      </div>

      {delta !== null ? (
        <p className={cn('text-sm font-semibold', delta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
          {delta >= 0
            ? `+${formatBand(delta)} above target`
            : `${formatBand(Math.abs(delta))} below target`}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">Enter all four skill scores to compare with your target band</p>
      )}
    </div>
  )
}
