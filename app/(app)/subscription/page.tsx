import { getCurrentUser } from '@/lib/data/users'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { Check } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Subscription' }

const planDetails = {
  free: { name: 'Free', price: '£0', period: 'forever' },
  pro: { name: 'Pro', price: '£12', period: 'per month' },
  elite: { name: 'Elite', price: '£29', period: 'per month' },
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
  ],
} as const

export default async function SubscriptionPage() {
  const user = await getCurrentUser()
  const plan = planDetails[user.plan as keyof typeof planDetails] ?? planDetails.free
  const features = planFeatures[user.plan as keyof typeof planFeatures] ?? planFeatures.free
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
                  <> · Next billing {nextBilling}</>
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
        <Card id="billing">
          <CardHeader>
            <CardTitle>Billing history</CardTitle>
            <CardDescription>Your past invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No billing history available.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
