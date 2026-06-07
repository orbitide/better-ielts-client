'use client'

import { cn } from '@/lib/utils'
import type { IeltsVariant } from '@/lib/types/band-calculator'

interface VariantSelectorProps {
  value: IeltsVariant
  onChange: (value: IeltsVariant) => void
}

export function VariantSelector({ value, onChange }: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1 w-fit">
      {(['academic', 'general'] as IeltsVariant[]).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            'rounded-md px-4 py-1.5 text-sm font-medium transition-all',
            value === v
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {v === 'academic' ? 'Academic' : 'General Training'}
        </button>
      ))}
    </div>
  )
}
