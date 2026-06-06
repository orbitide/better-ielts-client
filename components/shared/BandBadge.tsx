import { cn } from '@/lib/utils'
import { bandBg, formatBand } from '@/lib/utils/format'

export function BandBadge({ score, className }: { score: number; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        bandBg(score),
        className
      )}
    >
      Band {formatBand(score)}
    </span>
  )
}
