import Image from 'next/image'
import { cn } from '@/lib/utils'

const sizeMap = {
  sm: 28,
  md: 32,
} as const

export function BrandMark({
  size = 'md',
  className,
}: {
  size?: keyof typeof sizeMap
  className?: string
}) {
  const px = sizeMap[size]
  return (
    <Image
      src="/logo.svg"
      alt="better IELTS logo"
      width={px}
      height={px}
      className={cn('shrink-0', className)}
    />
  )
}
