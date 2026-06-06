'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

interface DataPoint {
  month: string
  overall: number
  listening: number
  reading: number
  writing: number
  speaking: number
}

interface ProgressOverTimeProps {
  data: DataPoint[]
  targetBand?: number
}

export function ProgressOverTime({ data, targetBand }: ProgressOverTimeProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
          <YAxis domain={[4, 9]} ticks={[4, 5, 6, 7, 8, 9]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
          {targetBand && (
            <ReferenceLine y={targetBand} stroke="hsl(var(--primary))" strokeDasharray="5 5" label={{ value: `Target ${targetBand}`, fill: 'hsl(var(--primary))', fontSize: 11, position: 'insideTopRight' }} />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--popover-foreground))',
              fontSize: '12px',
            }}
          />
          <Line type="monotone" dataKey="overall" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} name="Overall" />
          <Line type="monotone" dataKey="listening" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="Listening" />
          <Line type="monotone" dataKey="reading" stroke="#a855f7" strokeWidth={1.5} dot={false} name="Reading" />
          <Line type="monotone" dataKey="writing" stroke="#f97316" strokeWidth={1.5} dot={false} name="Writing" />
          <Line type="monotone" dataKey="speaking" stroke="#ec4899" strokeWidth={1.5} dot={false} name="Speaking" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
