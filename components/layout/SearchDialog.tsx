'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { search, type SearchResult } from '@/lib/search'

const CATEGORY_ORDER = [
  'Course',
  'Lesson',
  'Vocabulary',
  'Blog',
  'Reading Test',
  'Writing Task',
  'Mock Test',
] as const

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    setResults(search(query))
  }, [query])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const close = useCallback(() => onOpenChange(false), [onOpenChange])

  const grouped = CATEGORY_ORDER.reduce<Record<string, SearchResult[]>>(
    (acc, cat) => {
      const items = results.filter((r) => r.category === cat)
      if (items.length) acc[cat] = items
      return acc
    },
    {}
  )

  return (
    <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <DialogContent
        showCloseButton={false}
        className="top-[15%] translate-y-0 sm:max-w-lg p-0 gap-0 overflow-hidden"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search lessons, tests, vocabulary..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && close()}
          />
          <kbd className="hidden sm:inline-flex h-5 items-center rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim().length >= 2 && Object.keys(grouped).length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          {query.trim().length < 2 && (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              Start typing to search&hellip;
            </p>
          )}

          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <p className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {category}
              </p>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex flex-col gap-0.5 px-4 py-2.5 hover:bg-accent transition-colors"
                    >
                      <span className="text-sm font-medium leading-snug">{item.label}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {item.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
