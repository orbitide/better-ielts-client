const EXAM_ROUTE_PREFIXES = ['/reading/', '/listening/', '/writing/', '/speaking/', '/mock-test/'] as const

export function isExamRoute(pathname: string) {
  return EXAM_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

export const examExitHrefs = {
  reading: '/practice/reading',
  listening: '/practice/listening',
  writing: '/practice/writing',
  speaking: '/practice/speaking',
  mockTest: '/mock-tests',
} as const
