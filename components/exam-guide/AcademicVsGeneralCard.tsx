import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ExamGuideData } from '@/lib/types/exam-guide'

interface AcademicVsGeneralCardProps {
  data: ExamGuideData['academicVsGeneral']
}

export function AcademicVsGeneralCard({ data }: AcademicVsGeneralCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic vs General Training</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">Identical in both</p>
            <div className="flex flex-wrap gap-2">
              {data.sharedSkills.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Differs between versions</p>
            <div className="flex flex-wrap gap-2">
              {data.differingSkills.map((s) => (
                <Badge key={s} variant="outline">{s}</Badge>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{data.notes}</p>
      </CardContent>
    </Card>
  )
}
