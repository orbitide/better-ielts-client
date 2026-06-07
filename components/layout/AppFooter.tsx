import Link from 'next/link'

export function AppFooter() {
  return (
    <footer className="shrink-0 border-t bg-background px-4 py-3 lg:px-6">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Better IELTS</p>
        <div className="flex items-center gap-4">
          <Link href="/support" className="hover:text-foreground transition-colors">
            Support
          </Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
