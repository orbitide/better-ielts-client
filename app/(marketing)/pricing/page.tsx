import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Check, Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Pricing' }

const plans = [
  {
    name: 'Free',
    price: '£0',
    period: 'forever',
    description: 'Get started with essential IELTS practice tools at no cost.',
    badge: null,
    features: [
      '3 reading practice tests',
      '1 listening practice test',
      '1 writing task prompt',
      'Vocabulary (2 topics)',
      'Basic study plan',
      'Community access',
    ],
    cta: 'Get Started Free',
    href: '/dashboard',
    variant: 'outline' as const,
  },
  {
    name: 'Pro',
    price: '£12',
    period: 'per month',
    description: 'Everything you need for serious IELTS preparation.',
    badge: 'Most Popular',
    features: [
      'Unlimited reading & listening tests',
      'All writing tasks (Task 1 & 2)',
      'AI writing feedback',
      'Speaking practice (all sessions)',
      'Full vocabulary library (6 topics)',
      'Personalised study plan',
      'Progress analytics',
      '2 full mock tests per month',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    href: '/dashboard',
    variant: 'default' as const,
  },
  {
    name: 'Elite',
    price: '£29',
    period: 'per month',
    description: 'Maximum support for candidates with a fast-approaching test date.',
    badge: null,
    features: [
      'Everything in Pro',
      'Unlimited mock tests',
      'Detailed band score predictions',
      'Live group coaching sessions (2/week)',
      'Written feedback from IELTS examiner',
      'Exam day strategy guide',
      'Score guarantee support',
    ],
    cta: 'Start Elite Trial',
    href: '/dashboard',
    variant: 'outline' as const,
  },
]

const comparison = [
  { feature: 'Practice Tests (Reading)', free: '3', pro: 'Unlimited', elite: 'Unlimited' },
  { feature: 'Practice Tests (Listening)', free: '1', pro: 'Unlimited', elite: 'Unlimited' },
  { feature: 'Writing Feedback', free: '—', pro: 'AI feedback', elite: 'AI + Examiner' },
  { feature: 'Mock Tests', free: '—', pro: '2/month', elite: 'Unlimited' },
  { feature: 'Study Plan', free: 'Basic', pro: 'Personalised', elite: 'Personalised' },
  { feature: 'Vocabulary Topics', free: '2', pro: '6', elite: '6+' },
  { feature: 'Live Coaching', free: '—', pro: '—', elite: '✓' },
]

export default function PricingPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-muted-foreground text-lg">
            Start for free and upgrade when you are ready. All paid plans include a 7-day free trial.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 flex flex-col relative ${
                plan.badge ? 'border-primary shadow-lg ring-1 ring-primary' : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="gap-1 px-3 py-1">
                    <Zap className="h-3 w-3" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground mb-1">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className={cn(buttonVariants({ variant: plan.variant, size: 'lg' }), 'w-full')}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div>
          <h2 className="text-xl font-bold mb-6 text-center">Full feature comparison</h2>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Free</th>
                  <th className="text-center p-4 font-semibold text-primary">Pro</th>
                  <th className="text-center p-4 font-semibold">Elite</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                    <td className="p-4 text-muted-foreground">{row.feature}</td>
                    <td className="p-4 text-center">{row.free}</td>
                    <td className="p-4 text-center font-medium text-primary">{row.pro}</td>
                    <td className="p-4 text-center">{row.elite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
