export type IeltsVariant = 'academic' | 'general'

export type RawSkill = 'listening' | 'reading'
export type DirectSkill = 'writing' | 'speaking'
export type IeltsSkill = RawSkill | DirectSkill

export type BandConversionEntry = {
  raw: number
  band: number
}

export type BandConversionTable = {
  skill: RawSkill
  variant: IeltsVariant
  entries: BandConversionEntry[]
}

export type CalculatorInputs = {
  variant: IeltsVariant
  listeningRaw: string
  readingRaw: string
  writingBand: string
  speakingBand: string
}

export type SkillResult = {
  skill: IeltsSkill
  band: number | null
  inputValid: boolean
}

export type CalculatorResult = {
  skills: SkillResult[]
  overallBand: number | null
}
