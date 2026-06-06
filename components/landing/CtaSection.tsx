import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const urgencyPoints = [
  { icon: Calendar, text: 'IELTS test dates book up 6–8 weeks in advance' },
  { icon: Clock, text: 'Most visa applications need results within 2 years' },
]

export function CtaSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="rounded-2xl bg-primary px-8 py-14 text-primary-foreground relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 h-96 w-96 rounded-full bg-white/[0.02] -translate-x-1/2 -translate-y-1/2" />

          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-10 items-center max-w-5xl mx-auto">
            {/* Left — main copy */}
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60 mb-3">
                Don&apos;t leave it too late
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 leading-tight">
                Your visa deadline won&apos;t wait.<br />Start preparing today.
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-6">
                Whether you need Band 6.5 for a UK visa or Band 7.5 for medical registration, every week you delay is a week of preparation you&apos;ll miss.
              </p>

              <ul className="space-y-2 mb-8">
                {urgencyPoints.map((p) => {
                  const Icon = p.icon
                  return (
                    <li key={p.text} className="flex items-center gap-2.5 text-sm text-primary-foreground/80">
                      <Icon className="h-4 w-4 shrink-0 text-primary-foreground/60" />
                      {p.text}
                    </li>
                  )
                })}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/dashboard" className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'gap-2 text-base px-8')}>
                  Start Preparing Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/pricing" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10')}>
                  See Pro plans
                </Link>
              </div>
              <p className="text-xs text-primary-foreground/50 mt-3">Free plan · No credit card · Cancel anytime</p>
            </div>

            {/* Right — proof panel */}
            <div className="lg:col-span-2">
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-5 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
                  Recent student results
                </p>
                {[
                  { name: 'Amara K.', from: 5.5, to: 7.0, goal: 'UK Nursing Registration', weeks: 9 },
                  { name: 'Wei L.', from: 6.0, to: 7.5, goal: 'University of Melbourne', weeks: 11 },
                  { name: 'Tariq M.', from: 6.5, to: 8.0, goal: 'Academic research program', weeks: 8 },
                ].map((s) => (
                  <div key={s.name} className="flex items-start justify-between gap-3 py-2.5 border-t border-white/10 first:border-0 first:pt-0">
                    <div>
                      <p className="text-sm font-semibold text-primary-foreground">{s.name}</p>
                      <p className="text-xs text-primary-foreground/60">{s.goal}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-primary-foreground">
                        {s.from} → <span className="text-emerald-300">{s.to}</span>
                      </p>
                      <p className="text-xs text-primary-foreground/60">{s.weeks} weeks</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
