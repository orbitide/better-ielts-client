import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Clock, FileText } from 'lucide-react'

type ExamIntroScreenProps = {
  module: string
  title: string
  meta: string
  instructions: string[]
  onStart: () => void
  startLabel?: string
  exitHref: string
}

export function ExamIntroScreen({
  module,
  title,
  meta,
  instructions,
  onStart,
  startLabel = 'Begin test',
  exitHref,
}: ExamIntroScreenProps) {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded border border-black/10 bg-[#f8f8f8] shadow-sm dark:border-white/10 dark:bg-[#1c1c1c]">
          <div className="border-b border-black/8 bg-[#2b2f36] px-6 py-3 dark:border-white/8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
              IELTS Computer-Delivered Practice
            </p>
            <p className="mt-0.5 text-sm font-medium text-white">{module}</p>
          </div>

          <div className="px-6 py-6">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
            <p className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" />
                {meta}
              </span>
            </p>

            <div className="mt-6 rounded border border-black/8 bg-white p-4 dark:border-white/8 dark:bg-[#161616]">
              <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <FileText className="size-3.5" />
                Instructions
              </p>
              <ul className="space-y-2 text-sm leading-relaxed text-foreground/85">
                {instructions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-muted-foreground">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Once you begin, the timer will start. Find a quiet place and avoid switching tabs.
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button
                size="lg"
                className="flex-1 rounded-md bg-[#2b2f36] text-white hover:bg-[#3a3f48] dark:bg-[#2b2f36]"
                onClick={onStart}
              >
                {startLabel}
              </Button>
              <Button size="lg" variant="outline" className="flex-1 rounded-md" asChild>
                <Link href={exitHref}>Return to practice</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
