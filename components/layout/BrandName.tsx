import { cn } from '@/lib/utils'

const sizeClasses = {
  sm: {
    wrapper: 'text-sm',
    better: 'text-xs font-medium',
    ielts: 'text-sm font-extrabold tracking-wide',
  },
  md: {
    wrapper: 'text-lg',
    better: 'text-sm font-medium',
    ielts: 'text-lg font-extrabold tracking-wide',
  },
} as const

export function BrandName({
  size = 'md',
  className,
}: {
  size?: keyof typeof sizeClasses
  className?: string
}) {
  const styles = sizeClasses[size]

  return (
    <span className={cn('inline-flex items-baseline gap-0.5 leading-none', styles.wrapper, className)}>
      <span className={cn('text-muted-foreground', styles.better)}>better</span>
      <span className={cn('text-primary', styles.ielts)}>IELTS</span>
    </span>
  )
}
