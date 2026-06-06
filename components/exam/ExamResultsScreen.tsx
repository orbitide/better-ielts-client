import { cn } from '@/lib/utils'
import { ExamToolbar } from '@/components/exam/ExamToolbar'

type ExamResultsScreenProps = {
  module: string
  title: string
  subtitle?: string
  exitHref: string
  exitLabel?: string
  wide?: boolean
  children: React.ReactNode
}

export function ExamResultsScreen({
  module,
  title,
  subtitle,
  exitHref,
  exitLabel = 'Exit test',
  wide = false,
  children,
}: ExamResultsScreenProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <ExamToolbar module={module} exitHref={exitHref} exitLabel={exitLabel} />

      <div className="min-h-0 flex-1 overflow-y-auto bg-[#f8f8f8] dark:bg-[#181818]">
        <div className={cn('mx-auto space-y-6 p-6', wide ? 'max-w-3xl' : 'max-w-2xl')}>
          <div className="rounded border border-black/10 bg-white dark:border-white/10 dark:bg-[#1c1c1c]">
            <div className="border-b border-black/8 px-6 py-5 dark:border-white/8">
              <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
              {subtitle && (
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>

            <div className="px-6 py-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
