export type OnboardingData = {
  exam: 'ielts' | 'toefl'
  targetBand: '5.5-6' | '6-6.5' | '6.5-7' | '7-7.5' | '7.5-8' | '8+'
  englishLevel: 'beginner' | 'intermediate' | 'advanced' | 'fluent'
  experience: 'brand-new' | 'know-basics' | 'taken-before' | 'retaking'
  testDate: '1-month' | '1-3-months' | '3-6-months' | '1-year' | 'no-date'
  purpose: 'study-abroad' | 'work-abroad' | 'immigration' | 'personal'
  country: string
  focusSkills: Array<'listening' | 'reading' | 'writing' | 'speaking'>
}
