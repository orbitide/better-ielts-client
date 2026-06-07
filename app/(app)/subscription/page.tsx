import { getCurrentUser } from '@/lib/data/users'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { billingHistory, planDetails } from '@/lib/mock/subscriptions'
import { formatDate } from '@/lib/utils/format'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const metadata = { title: 'Subscription' }

const statusStyles = {
  paid: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  refunded: 'bg-muted text-muted-foreground',
} as const

const planFeatures = {
  pro: [
    'Unlimited reading & listening tests',
    'AI writing feedback',
    'Personalised study plan',
    '2 mock tests per month',
    'Priority support',
  ],
  elite: [
    'Everything in Pro',
    'Unlimited mock tests',
    'Live group coaching',
    'Examiner-written feedback',
  ],
  free: [
    '3 reading practice tests',
    '1 listening practice test',
    'Basic study plan',
    'Community access',
  ],
} as const

export default async function SubscriptionPage() {
  const user = await getCurrentUser()
  const plan = planDetails[user.plan]
  const features = planFeatures[user.plan]
  const nextBilling = '2026-07-01'

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto min-h-full">
      <PageHeader
        title="Subscription"
        description="Manage your plan and view billing history."
      >
        <Link href="/pricing" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
          Change plan
        </Link>
      </PageHeader>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                {plan.name}
                <Badge variant="secondary" className="capitalize font-normal">{user.plan}</Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                {plan.price} {plan.period}
                {user.plan !== 'free' && (
                  <> · Next billing {formatDate(nextBilling)}</>
                )}
              </CardDescription>
            </div>
            {user.plan !== 'free' && (
              <Badge className="bg-primary/10 text-primary border-0">Active</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-primary shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {user.plan !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle>Billing history</CardTitle>
            <CardDescription>Your past invoices and payments</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Plan</th>
                    <th className="px-6 py-3 font-medium">Amount</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((record) => (
                    <tr key={record.id} className="border-b last:border-0">
                      <td className="px-6 py-3">{formatDate(record.date)}</td>
                      <td className="px-6 py-3">{record.plan}</td>
                      <td className="px-6 py-3 font-medium">{record.amount}</td>
                      <td className="px-6 py-3">
                        <Badge
                          variant="secondary"
                          className={cn('capitalize font-normal', statusStyles[record.status])}
                        >
                          {record.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
