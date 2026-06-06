import { cn } from '@/lib/utils'

const sizeClasses = {
  sm: 'h-7 w-7 rounded-md text-sm',
  md: 'h-8 w-8 rounded-lg text-base',
} as const

export function BrandMark({
  size = 'md',
  className,
}: {
  size?: keyof typeof sizeClasses
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'flex shrink-0 items-center justify-center bg-brand-gradient font-bold leading-none tracking-tight text-white select-none',
        sizeClasses[size],
        className,
      )}
    >
      B
    </div>
  )
}
