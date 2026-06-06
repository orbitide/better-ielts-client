export function formatBand(score: number): string {
  return score % 1 === 0 ? `${score}.0` : `${score}`
}

export function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function bandColor(score: number): string {
  if (score >= 7) return 'text-emerald-600 dark:text-emerald-400'
  if (score >= 5.5) return 'text-amber-600 dark:text-amber-400'
  return 'text-rose-600 dark:text-rose-400'
}

export function bandBg(score: number): string {
  if (score >= 7) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
  if (score >= 5.5) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
  return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'
}

export function skillColor(skill: string): string {
  const colors: Record<string, string> = {
    listening: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    reading: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    writing: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    speaking: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    vocabulary: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    'mock-test': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    general: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
  }
  return colors[skill] ?? colors.general
}
