import { getCurrentUser } from '@/lib/data/users'
import { PageHeader } from '@/components/shared/PageHeader'
import { BandBadge } from '@/components/shared/BandBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { formatBand, formatDate } from '@/lib/utils/format'
import { planDetails } from '@/lib/mock/subscriptions'
import { Flame, Clock, Target, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'My Account' }

export default async function AccountPage() {
  const user = await getCurrentUser()
  const plan = planDetails[user.plan]

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="My Account"
        description="Your profile and learning overview."
      />

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                <Mail className="size-3.5" />
                {user.email}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                <Calendar className="size-3.5" />
                Member since {formatDate(user.joinedAt)}
              </p>
            </div>
            <Badge variant="secondary" className="capitalize">{user.plan}</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <Target className="size-4" />
              <span className="text-sm font-medium">Target Band</span>
            </div>
            <BandBadge score={user.targetBand} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <Flame className="size-4" />
              <span className="text-sm font-medium">Study Streak</span>
            </div>
            <p className="text-2xl font-bold">{user.studyStreak} days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <Clock className="size-4" />
              <span className="text-sm font-medium">Total Study</span>
            </div>
            <p className="text-2xl font-bold">{user.totalStudyHours}h</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Band Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            {(['overall', 'listening', 'reading', 'writing', 'speaking'] as const).map((skill) => (
              <div key={skill} className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground capitalize mb-1">{skill}</p>
                <p className="text-xl font-bold text-primary">{formatBand(user.currentBand[skill])}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Subscription</CardTitle>
          <Link href="/subscription" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            Manage
          </Link>
        </CardHeader>
        <CardContent>
          <p className="font-medium">{plan.name} plan</p>
          <p className="text-sm text-muted-foreground">{plan.price} {plan.period}</p>
        </CardContent>
      </Card>
    </div>
  )
}
