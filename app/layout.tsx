import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthBootstrap } from '@/components/auth/AuthBootstrap'
import { GoogleOAuthClientProvider } from '@/components/auth/GoogleOAuthClientProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://betterielts.com'),
  title: {
    default: 'Better IELTS — Achieve Your Target Band',
    template: '%s | Better IELTS',
  },
  description:
    'Prepare for IELTS with structured courses, practice tests, mock exams, and personalised study plans. Target Band 7+ with Better IELTS.',
  openGraph: {
    type: 'website',
    siteName: 'Better IELTS',
    title: 'Better IELTS — Achieve Your Target Band',
    description:
      'Prepare for IELTS with structured courses, practice tests, mock exams, and personalised study plans.',
    url: 'https://betterielts.com',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better IELTS — Achieve Your Target Band',
    description:
      'Prepare for IELTS with structured courses, practice tests, mock exams, and personalised study plans.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthBootstrap />
        <GoogleOAuthClientProvider>
          <ThemeProvider>
            <TooltipProvider delay={300}>{children}</TooltipProvider>
          </ThemeProvider>
        </GoogleOAuthClientProvider>


        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TCSRXKT5WB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TCSRXKT5WB');
          `}
        </Script>


      </body>
    </html>
  )
}
