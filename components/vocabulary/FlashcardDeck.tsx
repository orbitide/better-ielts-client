'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { VocabTopic, VocabWord } from '@/lib/types/vocabulary'
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, Layers, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VocabQuiz } from './VocabQuiz'

export function FlashcardDeck({ topic }: { topic: VocabTopic }) {
  const [tab, setTab] = useState<'flashcards' | 'quiz' | 'wordlist'>('flashcards')
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [learned, setLearned] = useState<Set<string>>(new Set())
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')

  const filteredWords = difficultyFilter === 'all'
    ? topic.words
    : topic.words.filter((w) => w.difficulty === difficultyFilter)

  const cards = filteredWords
  const current = cards[cardIdx]
  const progress = cards.length > 0 ? (learned.size / cards.length) * 100 : 0

  const goNext = () => {
    setFlipped(false)
    setTimeout(() => setCardIdx((i) => Math.min(cards.length - 1, i + 1)), 150)
  }

  const goPrev = () => {
    setFlipped(false)
    setTimeout(() => setCardIdx((i) => Math.max(0, i - 1)), 150)
  }

  const markLearned = () => {
    setLearned((prev) => {
      const next = new Set(prev)
      if (next.has(current.id)) next.delete(current.id)
      else next.add(current.id)
      return next
    })
  }

  const difficultyColor = {
    easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold">{topic.title}</h1>
            <p className="text-sm text-muted-foreground">{topic.description}</p>
          </div>
          <Badge variant="secondary">{topic.wordCount} words</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Progress value={progress} className="flex-1 h-2" />
          <span className="text-xs text-muted-foreground shrink-0">{learned.size}/{cards.length} learned</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          {(['all', 'easy', 'medium', 'hard'] as const).map((d) => (
            <button
              key={d}
              onClick={() => { setDifficultyFilter(d); setCardIdx(0); setFlipped(false) }}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors',
                difficultyFilter === d
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border/60 bg-card text-muted-foreground hover:border-border hover:text-foreground',
              )}
            >
              {d === 'all' ? 'All' : d}
            </button>
          ))}
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="flex flex-col flex-1 overflow-hidden">
        <TabsList className="mx-6 mt-4 shrink-0 w-fit">
          <TabsTrigger value="flashcards" className="gap-2"><Layers className="h-3.5 w-3.5" />Flashcards</TabsTrigger>
          <TabsTrigger value="quiz" className="gap-2"><Brain className="h-3.5 w-3.5" />Quiz</TabsTrigger>
          <TabsTrigger value="wordlist">Word List</TabsTrigger>
        </TabsList>

        <TabsContent value="flashcards" className="flex-1 flex flex-col overflow-hidden mt-0 p-6">
          <div className="flex-1 flex flex-col items-center justify-center">
            {cards.length === 0 ? (
              <p className="text-sm text-muted-foreground">No words match this filter.</p>
            ) : (
            <>{/* Card */}
            <div
              className="w-full max-w-lg cursor-pointer select-none"
              style={{ perspective: '1200px' }}
              onClick={() => setFlipped((f) => !f)}
            >
              <div
                className="relative h-64 w-full transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 bg-card shadow-md flex flex-col items-center justify-center p-8 text-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className={cn('text-xs font-semibold px-2.5 py-0.5 rounded-full mb-4', difficultyColor[current.difficulty])}>
                    {current.difficulty}
                  </span>
                  <p className="text-3xl font-bold mb-2">{current.word}</p>
                  <p className="text-muted-foreground text-sm">{current.phonetic}</p>
                  <p className="text-xs text-muted-foreground mt-6">Tap to reveal definition</p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-primary/30 bg-primary/5 shadow-md flex flex-col items-start justify-center p-8 overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <p className="text-lg font-bold mb-1">{current.word}</p>
                  {current.definitions.slice(0, 2).map((def, i) => (
                    <div key={i} className="mb-3">
                      <span className="text-xs font-semibold text-muted-foreground italic">{def.partOfSpeech}</span>
                      <p className="text-sm mt-0.5">{def.meaning}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">"{def.exampleSentence}"</p>
                    </div>
                  ))}
                  {current.synonyms.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {current.synonyms.slice(0, 3).map((s) => (
                        <span key={s} className="text-xs bg-secondary rounded px-1.5 py-0.5">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={goPrev} disabled={cardIdx === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground w-20 text-center">
                {cardIdx + 1} / {cards.length}
              </span>
              <Button variant="outline" size="icon" onClick={goNext} disabled={cardIdx === cards.length - 1}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                variant={learned.has(current.id) ? 'default' : 'outline'}
                size="sm"
                onClick={markLearned}
                className={cn('gap-2', learned.has(current.id) && 'bg-emerald-600 hover:bg-emerald-700')}
              >
                <CheckCircle className="h-4 w-4" />
                {learned.has(current.id) ? 'Learned!' : 'Mark as learned'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setCardIdx(0); setFlipped(false); setLearned(new Set()) }}
                className="gap-2"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </Button>
            </div>
            </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="flex-1 overflow-hidden mt-0">
          <VocabQuiz words={filteredWords} />
        </TabsContent>

        <TabsContent value="wordlist" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="p-6 grid gap-3">
              {filteredWords.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-6">No words match this filter.</p>
              ) : filteredWords.map((word) => (
                <WordListItem key={word.id} word={word} isLearned={learned.has(word.id)} onToggle={() => setLearned((prev) => {
                  const next = new Set(prev)
                  if (next.has(word.id)) next.delete(word.id)
                  else next.add(word.id)
                  return next
                })} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function WordListItem({ word, isLearned, onToggle }: { word: VocabWord; isLearned: boolean; onToggle: () => void }) {
  return (
    <div className={cn('rounded-xl border p-4 transition-colors', isLearned && 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/10')}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold">{word.word}</span>
            <span className="text-muted-foreground text-sm">{word.phonetic}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{word.definitions[0]?.meaning}</p>
        </div>
        <button
          onClick={onToggle}
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
            isLearned ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-muted-foreground/30 hover:border-emerald-400'
          )}
        >
          {isLearned && <CheckCircle className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
