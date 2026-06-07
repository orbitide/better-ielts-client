import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { AcademicVsGeneralCard } from './AcademicVsGeneralCard'
import { ExamOrderTimeline } from './ExamOrderTimeline'
import { SkillSectionCard } from './SkillSectionCard'
import type { ExamGuideData, SkillSection } from '@/lib/types/exam-guide'

const practiceHrefs: Record<string, string> = {
  listening: '/practice/listening',
  reading: '/practice/reading',
  writing: '/practice/writing',
  speaking: '/practice/speaking',
}

interface ExamGuideShellProps {
  data: ExamGuideData
  showPracticeLinks: boolean
}

export function ExamGuideShell({ data, showPracticeLinks }: ExamGuideShellProps) {
  const skills: SkillSection[] = data.skills.map(s =>
    showPracticeLinks ? { ...s, practiceHref: practiceHrefs[s.skill] } : s
  )

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed max-w-3xl">{data.overview}</p>

      <AcademicVsGeneralCard data={data.academicVsGeneral} />

      <ExamOrderTimeline />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">The Four Skills</h2>
        <Tabs defaultValue="listening">
          <TabsList className="flex-wrap h-auto gap-1">
            {skills.map(s => (
              <TabsTrigger key={s.skill} value={s.skill}>
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {skills.map(s => (
            <TabsContent key={s.skill} value={s.skill} className="mt-6">
              <SkillSectionCard section={s} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
