import type { Metadata } from 'next'
import { BandCalculatorShell } from '@/components/band-calculator/BandCalculatorShell'

export const metadata: Metadata = {
  title: 'IELTS Band Score Calculator',
  description: 'Calculate your overall IELTS band score from your raw Listening and Reading marks plus your Writing and Speaking band scores.',
}

export default function BandCalculatorPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 space-y-10 min-h-[85vh]">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">IELTS Band Score Calculator</h1>
        <p className="text-muted-foreground max-w-2xl">
          Enter your raw Listening and Reading scores (out of 40) and your examiner-assigned Writing and Speaking band scores to calculate your overall IELTS band score using the official formula.
        </p>
      </div>
      <BandCalculatorShell />
    </div>
  )
}
