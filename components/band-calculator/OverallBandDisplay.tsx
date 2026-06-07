'use client'

import { cn } from '@/lib/utils'
import { bandBg, bandColor, formatBand } from '@/lib/utils/format'
import type { CalculatorResult } from '@/lib/types/band-calculator'

interface OverallBandDisplayProps {
  result: CalculatorResult
}

const skillLabels: Record<string, string> = {
  listening: 'Listening',
  reading: 'Reading',
  writing: 'Writing',
  speaking: 'Speaking',
}

export function OverallBandDisplay({ result }: OverallBandDisplayProps) {
  const { skills, overallBand } = result

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {skills.map(({ skill, band }) => (
          <div key={skill} className="rounded-lg border bg-card p-3">
            <p className="text-xs text-muted-foreground mb-1">{skillLabels[skill]}</p>
            {band !== null ? (
              <p className={cn('text-lg font-bold', bandColor(band))}>
                {formatBand(band)}
              </p>
            ) : (
              <p className="text-lg font-bold text-muted-foreground/40">—</p>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border-2 bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">Overall Band Score</p>
        {overallBand !== null ? (
          <>
            <p className={cn('text-5xl font-bold tabular-nums', bandColor(overallBand))}>
              {formatBand(overallBand)}
            </p>
            <span className={cn('mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', bandBg(overallBand))}>
              {overallBand >= 7 ? 'Good / Very Good' : overallBand >= 5.5 ? 'Competent / Modest' : 'Limited / Extremely Limited'}
            </span>
          </>
        ) : (
          <p className="text-4xl font-bold text-muted-foreground/30">?</p>
        )}
        {overallBand === null && (
          <p className="mt-2 text-xs text-muted-foreground">Enter all four skill scores to see your overall band</p>
        )}
      </div>
    </div>
  )
}
