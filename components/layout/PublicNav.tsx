import Link from 'next/link'
import { BrandMark } from './BrandMark'
import { BrandName } from './BrandName'
import { NavLink } from './NavLink'
import { ThemeToggle } from './ThemeToggle'
import { PublicNavActions } from './PublicNavActions'

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/practice', label: 'Practice' },
  { href: '/mock-tests', label: 'Mock Tests' },
  { href: '/vocabulary', label: 'Vocabulary' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
]

export function PublicNav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <BrandMark />
            <BrandName className="hidden sm:inline-flex" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <PublicNavActions />
          </div>
        </div>
      </div>
    </header>
  )
}
