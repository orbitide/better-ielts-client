import { HeroSection } from '@/components/landing/HeroSection'
import { StatsSection } from '@/components/landing/StatsSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { BandScaleSection } from '@/components/landing/BandScaleSection'
import { CoursesPreviewSection } from '@/components/landing/CoursesPreviewSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { CtaSection } from '@/components/landing/CtaSection'
import { PublicNav } from '@/components/layout/PublicNav'
import { Footer } from '@/components/layout/Footer'

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
        <CoursesPreviewSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
