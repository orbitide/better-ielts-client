import type { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { StatsSection } from '@/components/landing/StatsSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { BandScaleSection } from '@/components/landing/BandScaleSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { CtaSection } from '@/components/landing/CtaSection'
import { PublicNav } from '@/components/layout/PublicNav'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Better IELTS — Achieve Your Target Band Score',
  description:
    'The modern IELTS preparation platform. Structured lessons, full mock tests, AI writing feedback, and personalised study plans. Trusted by 50,000+ learners.',
  openGraph: {
    title: 'Better IELTS — Achieve Your Target Band Score',
    description:
      'Structured lessons, full mock tests, AI writing feedback, and personalised study plans for IELTS candidates.',
    url: 'https://betterielts.com',
  },
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNav />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <BandScaleSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
