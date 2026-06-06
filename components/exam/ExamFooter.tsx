import { cn } from '@/lib/utils'

export function ExamFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <footer
      className={cn(
        'flex shrink-0 items-center justify-between gap-3 border-t border-black/10 bg-[#f0f0f0] px-4 py-2.5 dark:border-white/10 dark:bg-[#1a1a1a]',
        className,
      )}
    >
      {children}
    </footer>
  )
}
