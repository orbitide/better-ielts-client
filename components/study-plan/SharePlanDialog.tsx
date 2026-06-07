'use client'

import { useState } from 'react'
import { Share2, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { formatMinutes } from '@/lib/utils/format'
import type { StudyPlan } from '@/lib/types/study-plan'

function buildShareText(plan: StudyPlan): string {
  const weekOf = new Date(plan.weekStartDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const lines: string[] = [
    `My IELTS Study Plan — Week of ${weekOf}`,
    `Target Band: ${plan.targetBand} | Weekly Goal: ${formatMinutes(plan.weeklyGoalMinutes)}`,
    '',
  ]

  plan.days.forEach((day, i) => {
    const label = new Date(day.date).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    if (day.tasks.length === 0) {
      lines.push(`${label} — Rest day`)
    } else {
      lines.push(label)
      day.tasks.forEach((task) => {
        lines.push(`  • ${task.title} (${task.durationMinutes}m)`)
      })
    }
    lines.push('')
  })

  lines.push('Prepared with Better IELTS')
  return lines.join('\n')
}

interface SharePlanDialogProps {
  plan: StudyPlan
}

export function SharePlanDialog({ plan }: SharePlanDialogProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareText = buildShareText(plan)

  async function handleCopy() {
    await navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" className="gap-2" />}>
        <Share2 className="h-4 w-4" />
        Share
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share Study Plan</DialogTitle>
          <DialogDescription>
            Copy your plan summary to share with a friend or tutor.
          </DialogDescription>
        </DialogHeader>

        <textarea
          readOnly
          value={shareText}
          rows={12}
          className="w-full resize-none rounded-lg border bg-muted/30 p-3 font-mono text-xs text-foreground focus:outline-none"
        />

        <DialogFooter>
          <Button onClick={handleCopy} className="gap-2">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
