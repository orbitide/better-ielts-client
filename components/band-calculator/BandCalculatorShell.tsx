'use client'

import { useState } from 'react'
import { useAuthStore } from '@/lib/store/auth-store'
import { lookupBand, parseDirectBand, computeOverallBand } from '@/lib/utils/band-calculator'
import type { CalculatorInputs, CalculatorResult } from '@/lib/types/band-calculator'
import { VariantSelector } from './VariantSelector'
import { RawScoreInput } from './RawScoreInput'
import { DirectBandInput } from './DirectBandInput'
import { OverallBandDisplay } from './OverallBandDisplay'
import { TargetBandComparison } from './TargetBandComparison'

const initialInputs: CalculatorInputs = {
  variant: 'academic',
  listeningRaw: '',
  readingRaw: '',
  writingBand: '',
  speakingBand: '',
}

export function BandCalculatorShell() {
  const user = useAuthStore(s => s.user)
  const [inputs, setInputs] = useState<CalculatorInputs>(initialInputs)

  const listeningRawNum = inputs.listeningRaw !== '' && Number.isInteger(Number(inputs.listeningRaw)) ? Number(inputs.listeningRaw) : null
  const readingRawNum = inputs.readingRaw !== '' && Number.isInteger(Number(inputs.readingRaw)) ? Number(inputs.readingRaw) : null

  const listeningBand = listeningRawNum !== null && listeningRawNum >= 0 && listeningRawNum <= 40
    ? lookupBand('listening', inputs.variant, listeningRawNum)
    : null
  const readingBand = readingRawNum !== null && readingRawNum >= 0 && readingRawNum <= 40
    ? lookupBand('reading', inputs.variant, readingRawNum)
    : null
  const writingBand = parseDirectBand(inputs.writingBand)
  const speakingBand = parseDirectBand(inputs.speakingBand)

  const result: CalculatorResult = {
    skills: [
      { skill: 'listening', band: listeningBand, inputValid: listeningRawNum !== null },
      { skill: 'reading', band: readingBand, inputValid: readingRawNum !== null },
      { skill: 'writing', band: writingBand, inputValid: inputs.writingBand !== '' },
      { skill: 'speaking', band: speakingBand, inputValid: inputs.speakingBand !== '' },
    ],
    overallBand: computeOverallBand([listeningBand, readingBand, writingBand, speakingBand]),
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium">Exam Type</p>
          <VariantSelector
            value={inputs.variant}
            onChange={(variant) => setInputs(prev => ({ ...prev, variant }))}
          />
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Raw Score → Band</p>
          <div className="space-y-5">
            <RawScoreInput
              skill="listening"
              variant={inputs.variant}
              value={inputs.listeningRaw}
              onChange={(v) => setInputs(prev => ({ ...prev, listeningRaw: v }))}
              bandResult={listeningBand}
            />
            <RawScoreInput
              skill="reading"
              variant={inputs.variant}
              value={inputs.readingRaw}
              onChange={(v) => setInputs(prev => ({ ...prev, readingRaw: v }))}
              bandResult={readingBand}
            />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Direct Band Score</p>
          <div className="space-y-5">
            <DirectBandInput
              skill="writing"
              value={inputs.writingBand}
              onChange={(v) => setInputs(prev => ({ ...prev, writingBand: v }))}
              bandResult={writingBand}
            />
            <DirectBandInput
              skill="speaking"
              value={inputs.speakingBand}
              onChange={(v) => setInputs(prev => ({ ...prev, speakingBand: v }))}
              bandResult={speakingBand}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setInputs(initialInputs)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Reset all
        </button>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <OverallBandDisplay result={result} />
        {user?.targetBand !== undefined && (
          <TargetBandComparison
            computedBand={result.overallBand}
            targetBand={user.targetBand}
          />
        )}
      </div>
    </div>
  )
}
