export type WordDefinition = {
  partOfSpeech: string
  meaning: string
  exampleSentence: string
}

export type VocabWord = {
  id: string
  word: string
  phonetic: string
  definitions: WordDefinition[]
  synonyms: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  isLearned: boolean
}

export type VocabTopic = {
  id: string
  slug: string
  title: string
  description: string
  wordCount: number
  words: VocabWord[]
  iconName: string
}
