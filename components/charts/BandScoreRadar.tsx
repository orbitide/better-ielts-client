'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import type { BandScore } from '@/lib/types/user'
import { formatBand } from '@/lib/utils/format'

interface BandScoreRadarProps {
  current: BandScore
  target?: number
}

export function BandScoreRadar({ current, target }: BandScoreRadarProps) {
  const data = [
    { skill: 'Listening', score: current.listening },
    { skill: 'Reading', score: current.reading },
    { skill: 'Writing', score: current.writing },
    { skill: 'Speaking', score: current.speaking },
  ]

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <RadarChart data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <Radar
            name="Band Score"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Tooltip
            formatter={(value) => [formatBand(Number(value)), 'Band']}
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--popover-foreground))',
              fontSize: '12px',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
