'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BandBadge } from '@/components/shared/BandBadge'
import type { VocabWord } from '@/lib/types/vocabulary'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

type Question = {
  word: VocabWord
  options: string[]
  correctIdx: number
}

function buildQuestions(words: VocabWord[]): Question[] {
  return shuffle(words).map((word) => {
    const distractors = shuffle(words.filter((w) => w.id !== word.id))
      .slice(0, 3)
      .map((w) => w.definitions[0]?.meaning ?? w.word)
    const correct = word.definitions[0]?.meaning ?? ''
    const options = shuffle([correct, ...distractors])
    return { word, options, correctIdx: options.indexOf(correct) }
  })
}

export function VocabQuiz({ words }: { words: VocabWord[] }) {
  const [questions] = useState<Question[]>(() => buildQuestions(words.slice(0, 10)))
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState<{ correct: boolean }[]>([])

  const current = questions[qIdx]

  if (!current) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-sm text-muted-foreground">
        No words available for a quiz with this filter.
      </div>
    )
  }

  const handleSelect = (optIdx: number) => {
    if (selected !== null) return
    setSelected(optIdx)
    const correct = optIdx === current.correctIdx
    if (correct) setScore((s) => s + 1)
    setAnswers((a) => [...a, { correct }])
  }

  const handleNext = () => {
    if (qIdx < questions.length - 1) {
      setQIdx((i) => i + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  const reset = () => {
    setQIdx(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setAnswers([])
  }

  const getBand = () => {
    const pct = score / questions.length
    if (pct === 1) return 9.0
    if (pct >= 0.9) return 8.0
    if (pct >= 0.8) return 7.5
    if (pct >= 0.7) return 7.0
    if (pct >= 0.6) return 6.5
    if (pct >= 0.5) return 6.0
    return 5.5
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="max-w-sm w-full">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <span className="text-2xl font-extrabold text-primary">{score}/{questions.length}</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <div className="flex justify-center mb-6">
            <BandBadge score={getBand()} className="text-base px-4 py-1.5" />
          </div>
          <div className="flex gap-2 mb-8 justify-center">
            {answers.map((a, i) => (
              a.correct
                ? <CheckCircle key={i} className="h-5 w-5 text-emerald-500" />
                : <XCircle key={i} className="h-5 w-5 text-red-500" />
            ))}
          </div>
          <Button onClick={reset} className="gap-2 w-full">
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const progress = ((qIdx) / questions.length) * 100

  return (
    <div className="flex flex-col h-full p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Question {qIdx + 1} of {questions.length}</span>
          <span>{score} correct</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full">
        <div className="rounded-2xl border bg-card p-6 mb-6 text-center">
          <p className="text-xs text-muted-foreground mb-2">What does this word mean?</p>
          <p className="text-3xl font-bold">{current.word.word}</p>
          <p className="text-muted-foreground text-sm mt-1">{current.word.phonetic}</p>
        </div>

        <div className="space-y-3">
          {current.options.map((opt, i) => {
            const isSelected = selected === i
            const isCorrect = i === current.correctIdx
            const showResult = selected !== null

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={cn(
                  'w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors',
                  !showResult && 'hover:bg-accent cursor-pointer',
                  showResult && isCorrect && 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300',
                  showResult && isSelected && !isCorrect && 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300',
                  !showResult && 'cursor-pointer',
                  showResult && !isCorrect && !isSelected && 'opacity-50'
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
                    showResult && isCorrect && 'border-emerald-500 bg-emerald-500 text-white',
                    showResult && isSelected && !isCorrect && 'border-red-500 bg-red-500 text-white',
                  )}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </span>
              </button>
            )
          })}
        </div>

        {selected !== null && (
          <Button onClick={handleNext} className="mt-6 w-full">
            {qIdx < questions.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        )}
      </div>
    </div>
  )
}
