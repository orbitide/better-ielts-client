'use client'

import { cn } from '@/lib/utils'
import { bandBg, formatBand } from '@/lib/utils/format'
import type { RawSkill, IeltsVariant } from '@/lib/types/band-calculator'

interface RawScoreInputProps {
  skill: RawSkill
  variant: IeltsVariant
  value: string
  onChange: (value: string) => void
  bandResult: number | null
}

const labels: Record<RawSkill, string> = {
  listening: 'Listening',
  reading: 'Reading',
}

const descriptions: Record<RawSkill, string> = {
  listening: 'Number of correct answers out of 40',
  reading: 'Number of correct answers out of 40',
}

export function RawScoreInput({ skill, value, onChange, bandResult }: RawScoreInputProps) {
  const isInvalid = value !== '' && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 40 || !Number.isInteger(Number(value)))

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{labels[skill]}</label>
      <p className="text-xs text-muted-foreground">{descriptions[skill]}</p>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="number"
            min={0}
            max={40}
            step={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="0"
            className={cn(
              'h-9 w-24 rounded-lg border bg-background px-3 pr-10 text-sm outline-none transition-colors',
              'focus:border-ring focus:ring-2 focus:ring-ring/30',
              isInvalid ? 'border-rose-500' : 'border-border'
            )}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            /40
          </span>
        </div>
        {bandResult !== null ? (
          <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', bandBg(bandResult))}>
            Band {formatBand(bandResult)}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">Enter score</span>
        )}
      </div>
      {isInvalid && (
        <p className="text-xs text-rose-500">Enter a whole number between 0 and 40</p>
      )}
    </div>
  )
}
