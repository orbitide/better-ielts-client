export type SubscriptionStatus = 'paid' | 'pending' | 'failed' | 'refunded'

export type BillingRecord = {
  id: string
  date: string
  plan: string
  amount: string
  status: SubscriptionStatus
  invoiceUrl?: string
}

export const billingHistory: BillingRecord[] = [
  { id: 'inv-006', date: '2026-06-01', plan: 'Pro', amount: '£12.00', status: 'paid' },
  { id: 'inv-005', date: '2026-05-01', plan: 'Pro', amount: '£12.00', status: 'paid' },
  { id: 'inv-004', date: '2026-04-01', plan: 'Pro', amount: '£12.00', status: 'paid' },
  { id: 'inv-003', date: '2026-03-01', plan: 'Pro', amount: '£12.00', status: 'paid' },
  { id: 'inv-002', date: '2026-02-01', plan: 'Pro', amount: '£12.00', status: 'paid' },
  { id: 'inv-001', date: '2026-01-15', plan: 'Free → Pro', amount: '£12.00', status: 'paid' },
]

export const planDetails = {
  free: { name: 'Free', price: '£0', period: 'forever' },
  pro: { name: 'Pro', price: '£12', period: 'per month' },
  elite: { name: 'Elite', price: '£29', period: 'per month' },
} as const
