import { bandConversionTables } from '@/lib/mock/band-conversion'
import type { IeltsVariant, RawSkill } from '@/lib/types/band-calculator'

export function lookupBand(skill: RawSkill, variant: IeltsVariant, raw: number): number | null {
  const table = bandConversionTables.find(t => t.skill === skill && t.variant === variant)
  if (!table) return null
  const entry = table.entries.find(e => e.raw === raw)
  return entry?.band ?? null
}

export function parseDirectBand(value: string): number | null {
  if (value === '' || value === undefined) return null
  const n = parseFloat(value)
  if (isNaN(n) || n < 0 || n > 9) return null
  // Must be a multiple of 0.5
  if ((n * 2) % 1 !== 0) return null
  return n
}

export function computeOverallBand(bands: (number | null)[]): number | null {
  if (bands.some(b => b === null)) return null
  const sum = (bands as number[]).reduce((a, b) => a + b, 0)
  // Official IELTS formula: round to nearest 0.5 (0.25+ rounds up)
  return Math.floor((sum / bands.length) * 2 + 0.5) / 2
}
