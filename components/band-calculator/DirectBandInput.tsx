'use client'

import { cn } from '@/lib/utils'
import { bandBg, formatBand } from '@/lib/utils/format'
import type { DirectSkill } from '@/lib/types/band-calculator'

interface DirectBandInputProps {
  skill: DirectSkill
  value: string
  onChange: (value: string) => void
  bandResult: number | null
}

const labels: Record<DirectSkill, string> = {
  writing: 'Writing',
  speaking: 'Speaking',
}

const descriptions: Record<DirectSkill, string> = {
  writing: 'Examiner-assigned band score',
  speaking: 'Examiner-assigned band score',
}

const bandOptions = Array.from({ length: 19 }, (_, i) => i * 0.5)

export function DirectBandInput({ skill, value, onChange, bandResult }: DirectBandInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{labels[skill]}</label>
      <p className="text-xs text-muted-foreground">{descriptions[skill]}</p>
      <div className="flex items-center gap-3">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'h-9 w-28 rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors',
            'focus:border-ring focus:ring-2 focus:ring-ring/30'
          )}
        >
          <option value="">Select</option>
          {bandOptions.map((b) => (
            <option key={b} value={String(b)}>
              {formatBand(b)}
            </option>
          ))}
        </select>
        {bandResult !== null ? (
          <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', bandBg(bandResult))}>
            Band {formatBand(bandResult)}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">Select band</span>
        )}
      </div>
    </div>
  )
}
