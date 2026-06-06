import Link from 'next/link'
import { BookOpen } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Courses', href: '/courses' },
    { label: 'Practice Tests', href: '/practice' },
    { label: 'Mock Tests', href: '/mock-tests' },
    { label: 'Vocabulary', href: '/vocabulary' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'IELTS Tips', href: '/blog?category=tips' },
    { label: 'Grammar Guide', href: '/blog?category=grammar' },
    { label: 'Band Score Guide', href: '/blog?category=strategy' },
    { label: 'About Us', href: '/about' },
  ],
  Skills: [
    { label: 'Reading', href: '/practice' },
    { label: 'Listening', href: '/practice' },
    { label: 'Writing', href: '/practice' },
    { label: 'Speaking', href: '/practice' },
    { label: 'Vocabulary', href: '/vocabulary' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span>Better IELTS</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The modern IELTS preparation platform. Achieve your target band score with structured learning and expert guidance.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Better IELTS. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
