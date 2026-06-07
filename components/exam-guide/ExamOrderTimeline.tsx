import { Headphones, BookMarked, PenLine, Mic } from 'lucide-react'
import { cn } from '@/lib/utils'
import { skillColor } from '@/lib/utils/format'

const steps = [
  { skill: 'listening', label: 'Listening', duration: '30 + 10 min', Icon: Headphones },
  { skill: 'reading',   label: 'Reading',   duration: '60 min',       Icon: BookMarked },
  { skill: 'writing',   label: 'Writing',   duration: '60 min',       Icon: PenLine },
  { skill: 'speaking',  label: 'Speaking',  duration: '11–14 min',    Icon: Mic },
]

export function ExamOrderTimeline() {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">Exam Order</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0">
        {steps.map((step, i) => (
          <div key={step.skill} className="flex sm:flex-col items-center gap-0 flex-1">
            <div className="flex sm:flex-row flex-col items-center w-full">
              {/* Connector line before */}
              {i > 0 && (
                <div className="hidden sm:block h-0.5 bg-border flex-1 -mx-px" />
              )}
              <div className={cn('flex items-center gap-2 rounded-xl p-3 shrink-0', skillColor(step.skill))}>
                <step.Icon className="size-4 shrink-0" />
                <div>
                  <p className="text-xs font-semibold leading-none">{step.label}</p>
                  <p className="text-[10px] opacity-80 mt-0.5">{step.duration}</p>
                </div>
              </div>
              {/* Connector line after */}
              {i < steps.length - 1 && (
                <div className="hidden sm:block h-0.5 bg-border flex-1 -mx-px" />
              )}
            </div>
            {/* Mobile vertical connector */}
            {i < steps.length - 1 && (
              <div className="sm:hidden w-0.5 h-4 bg-border mx-auto" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
