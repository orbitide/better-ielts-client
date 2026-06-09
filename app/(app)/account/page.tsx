import { getCurrentUser } from '@/lib/data/users'
import { PageHeader } from '@/components/shared/PageHeader'
import { BandBadge } from '@/components/shared/BandBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { formatBand, formatDate } from '@/lib/utils/format'
import { Clock, Target, Mail, Calendar, Crown, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'My Account' }

const planDetails = {
  free: { name: 'Free', price: '£0', period: 'forever' },
  pro: { name: 'Pro', price: '£12', period: 'per month' },
  elite: { name: 'Elite', price: '£29', period: 'per month' },
} as const

export default async function AccountPage() {
  const user = await getCurrentUser()
  const plan = planDetails[user.plan as keyof typeof planDetails] ?? planDetails.free

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto min-h-full">
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

      <div className="grid grid-cols-2 gap-4">
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
        <CardHeader className="flex-row items-center justify-between pb-4">
          <div>
            <CardTitle>Subscription</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">Your current plan and billing</p>
          </div>
          <Link href="/subscription" className={buttonVariants({ variant: 'default', size: 'sm' })}>
            Manage <ArrowUpRight className="size-3.5 ml-1" />
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Crown className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{plan.name} Plan</p>
                <p className="text-sm text-muted-foreground">{plan.price} {plan.period}</p>
              </div>
            </div>
            <Badge className="bg-green-500/10 text-green-600 border border-green-200 hover:bg-green-500/10">Active</Badge>
          </div>
          <div className="flex items-center justify-between border-t pt-3">
            <Link href="/subscription#billing" className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground ml-auto">
              View billing history
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
