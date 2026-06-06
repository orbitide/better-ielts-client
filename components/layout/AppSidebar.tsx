import Link from 'next/link'
import { BookOpen, LayoutDashboard, BookMarked, Headphones, PenLine, Mic, ClipboardList, Brain, Users, CalendarDays, BarChart3 } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { BrandName } from './BrandName'
import { SidebarNavLink } from './SidebarNavLink'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/study-plan', label: 'Study Plan', icon: CalendarDays },
  { type: 'divider', label: 'Practice' },
  { href: '/reading/test-1', label: 'Reading', icon: BookMarked },
  { href: '/listening/test-1', label: 'Listening', icon: Headphones },
  { href: '/writing/task2-1', label: 'Writing', icon: PenLine },
  { href: '/speaking/session-1', label: 'Speaking', icon: Mic },
  { type: 'divider', label: 'Learn' },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/vocabulary/environment', label: 'Vocabulary', icon: Brain },
  { href: '/mock-test/full-1', label: 'Mock Tests', icon: ClipboardList },
  { type: 'divider', label: 'Community' },
  { href: '/community', label: 'Community', icon: Users },
]

export function AppSidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('flex flex-col h-full', className)}>
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-4 border-b shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <BrandMark size="sm" />
          <BrandName size="sm" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item, i) => {
          if ('type' in item && item.type === 'divider') {
            return (
              <p key={i} className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {item.label}
              </p>
            )
          }
          const Icon = (item as { icon: React.ElementType }).icon
          return (
            <SidebarNavLink
              key={(item as { href: string }).href}
              href={(item as { href: string }).href}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </SidebarNavLink>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t p-3 shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent text-sm"
        >
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Progress</span>
        </Link>
      </div>
    </aside>
  )
}
