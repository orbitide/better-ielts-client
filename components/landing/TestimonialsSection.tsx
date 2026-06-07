import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    country: 'India',
    band: 7.5,
    previous: 6.0,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya',
    quote: 'I had been stuck at Band 6 for two attempts. Better IELTS helped me identify exactly where I was losing marks in writing. I scored 7.5 on my third attempt — I couldn\'t believe it!',
    course: 'Writing Task 2 Masterclass',
  },
  {
    name: 'Carlos Mendez',
    country: 'Colombia',
    band: 7.0,
    previous: 5.5,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Carlos',
    quote: 'The reading strategies transformed my approach completely. I went from rushing through passages to feeling calm and methodical. My score jumped from 5.5 to 7.0 in two months.',
    course: 'IELTS Reading Mastery',
  },
  {
    name: 'Mei-Ling Zhang',
    country: 'China',
    band: 8.0,
    previous: 6.5,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=MeiLing',
    quote: 'The mock tests are incredibly realistic. After doing five full mocks on this platform, the actual exam felt like just another practice session. Band 8 for reading!',
    course: 'Full Mock Test Centre',
  },
  {
    name: 'Ahmed Al-Rashid',
    country: 'UAE',
    band: 7.5,
    previous: 6.0,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ahmed',
    quote: 'The vocabulary module is exceptional. Learning words in context with example sentences made them actually stick. My lexical resource score went from 5.5 to 7.5.',
    course: 'IELTS Vocabulary Builder',
  },
  {
    name: 'Natasha Ivanova',
    country: 'Russia',
    band: 7.0,
    previous: 6.0,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Natasha',
    quote: 'Speaking was my biggest fear. The Part 2 technique I learned here — structuring the cue card with a simple framework — completely transformed my confidence in the exam room.',
    course: 'IELTS Speaking Confidence',
  },
  {
    name: 'James Okonkwo',
    country: 'Nigeria',
    band: 8.5,
    previous: 7.0,
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=James',
    quote: 'Already at Band 7, I wasn\'t sure how much more improvement was possible. The advanced grammar course and detailed feedback on my writing helped me hit 8.5. Absolutely incredible.',
    course: 'Grammar for Band 7+',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Real students, real results
          </h2>
          <p className="text-muted-foreground text-lg">
            Thousands of IELTS candidates have achieved their target band with Better IELTS. Here are some of their stories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="group rounded-xl border bg-card p-6 shadow-sm flex flex-col transition-shadow hover:shadow-md">
              {/* Stars */}
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-muted-foreground leading-relaxed mb-4 overflow-hidden max-h-[5rem] group-hover:max-h-[20rem] transition-[max-height] duration-300 ease-in-out">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.country} · {t.course}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">Band</p>
                  <p className="font-bold text-primary">{t.previous} → {t.band}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
