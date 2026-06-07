import Link from 'next/link'
import { LayoutDashboard, BookMarked, Headphones, PenLine, Mic, ClipboardList, Brain, Users, CalendarDays, BarChart3, Calculator, GraduationCap } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { BrandName } from './BrandName'
import { SidebarNavLink } from './SidebarNavLink'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/study-plan', label: 'Study Plan', icon: CalendarDays },
  { type: 'divider', label: 'Practice' },
  { href: '/practice/reading', label: 'Reading', icon: BookMarked, matchPaths: ['/practice/reading', '/reading'] },
  { href: '/practice/listening', label: 'Listening', icon: Headphones, matchPaths: ['/practice/listening', '/listening'] },
  { href: '/practice/writing', label: 'Writing', icon: PenLine, matchPaths: ['/practice/writing', '/writing'] },
  { href: '/practice/speaking', label: 'Speaking', icon: Mic, matchPaths: ['/practice/speaking', '/speaking'] },
  { type: 'divider', label: 'Learn' },
  { href: '/vocabulary/environment', label: 'Vocabulary', icon: Brain },
  { href: '/mock-test/full-1', label: 'Mock Tests', icon: ClipboardList },
  { type: 'divider', label: 'Tools' },
  { href: '/tools/band-calculator', label: 'Band Calculator', icon: Calculator },
  { href: '/exam-guide', label: 'Exam Guide', icon: GraduationCap },
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
              matchPaths={(item as { matchPaths?: string[] }).matchPaths}
            >
              <Icon />
              <span>{item.label}</span>
            </SidebarNavLink>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-sidebar-border p-3 shrink-0">
        <SidebarNavLink href="/dashboard">
          <BarChart3 />
          <span>Progress</span>
        </SidebarNavLink>
      </div>
    </aside>
  )
}
