import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button-variants'
import { BookOpen, Mail, MessageCircle, FileQuestion } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Support' }

const helpTopics = [
  {
    icon: FileQuestion,
    title: 'Help Centre',
    description: 'Browse guides on study plans, practice tests, and band scoring.',
    href: '/blog?category=tips',
  },
  {
    icon: BookOpen,
    title: 'IELTS Resources',
    description: 'Strategy articles, grammar tips, and examiner advice.',
    href: '/blog',
  },
  {
    icon: MessageCircle,
    title: 'Community',
    description: 'Ask questions and learn from other candidates.',
    href: '/community',
  },
]

export default function SupportPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Support"
        description="Get help with your account, study plan, or subscription."
      />

      <Card>
        <CardHeader>
          <CardTitle>Contact us</CardTitle>
          <CardDescription>Our team typically responds within one business day</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">support@betterielts.com</p>
              <p className="text-xs text-muted-foreground">Mon–Fri, 9am–6pm GMT</p>
            </div>
          </div>
          <a
            href="mailto:support@betterielts.com"
            className={buttonVariants({ size: 'sm' })}
          >
            Send email
          </a>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {helpTopics.map((topic) => {
          const Icon = topic.icon
          return (
            <Link key={topic.title} href={topic.href}>
              <Card className="hover:border-primary/40 transition-colors">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{topic.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{topic.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
