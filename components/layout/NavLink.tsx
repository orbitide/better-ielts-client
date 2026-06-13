'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
  exact?: boolean
  onClick?: () => void
}

export function NavLink({
  href,
  children,
  className,
  activeClassName = 'text-primary font-semibold',
  exact = false,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link href={href} onClick={onClick} className={cn(className, isActive && activeClassName)}>
      {children}
    </Link>
  )
}
