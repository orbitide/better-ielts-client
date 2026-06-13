'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, LayoutDashboard, LogIn, UserPlus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { NavLink } from './NavLink'
import { BrandMark } from './BrandMark'
import { BrandName } from './BrandName'
import { useAuthStore } from '@/lib/store/auth-store'
import { useAuthHydration } from '@/hooks/use-auth-hydration'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/practice', label: 'Practice' },
  { href: '/mock-tests', label: 'Mock Tests' },
  { href: '/exam-guide', label: 'Exam Guide' },
  { href: '/tools/band-calculator', label: 'Calculator' },
  { href: '/vocabulary', label: 'Vocabulary' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
]

export function PublicMobileNav() {
  const [open, setOpen] = useState(false)
  const hydrated = useAuthHydration()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'md:hidden')}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-0">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <BrandMark />
            <BrandName />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeClassName="bg-muted text-primary"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t p-4">
          {!hydrated ? (
            <>
              <div className="h-9 w-full rounded-lg bg-muted animate-pulse" />
              <div className="h-9 w-full rounded-lg bg-muted animate-pulse" />
            </>
          ) : isAuthenticated ? (
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ size: 'sm' }), 'gap-1.5')}
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5')}
              >
                <LogIn className="size-4" />
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ size: 'sm' }), 'gap-1.5')}
              >
                <UserPlus className="size-4" />
                Get Started
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
