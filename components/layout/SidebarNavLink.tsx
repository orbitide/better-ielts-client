'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarNavLinkProps {
  href: string
  children: React.ReactNode
}

export function SidebarNavLink({ href, children }: SidebarNavLinkProps) {
  const pathname = usePathname()
  const isActive =
    pathname === href ||
    (href !== '/dashboard' && pathname.startsWith(href.split('/').slice(0, 2).join('/')))

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200',
        'outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring/50',
        isActive
          ? 'bg-sidebar-primary/12 text-sidebar-primary font-medium ring-1 ring-sidebar-primary/20'
          : 'text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      )}
    >
      {isActive && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-sidebar-primary"
        />
      )}
      <span
        className={cn(
          'flex items-center gap-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-colors',
          isActive
            ? '[&_svg]:text-sidebar-primary'
            : '[&_svg]:text-sidebar-foreground/50 group-hover:[&_svg]:text-sidebar-accent-foreground/80',
        )}
      >
        {children}
      </span>
    </Link>
  )
}
