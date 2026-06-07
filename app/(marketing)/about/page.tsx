import { BookOpen, Target, Users, Award } from 'lucide-react'

export const metadata = {
  title: 'About Us',
  description:
    'Meet the team behind Better IELTS — IELTS examiners and language educators on a mission to make expert IELTS preparation accessible to everyone.',
}

const team = [
  { name: 'Dr Sarah Chen', role: 'Chief Academic Officer', bio: 'IELTS examiner for 12 years with a PhD in Applied Linguistics. Author of three IELTS preparation books.', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah' },
  { name: 'James Whitfield', role: 'Head of Content', bio: 'Senior IELTS tutor and curriculum designer with 10+ years helping candidates achieve Band 7 and above.', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=James' },
  { name: 'Michael Torres', role: 'Speaking Coach', bio: 'Phonetics specialist and certified speaking examiner. Helped over 2,000 students improve their speaking band.', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Michael' },
]

const values = [
  { icon: Target, title: 'Results-focused', description: 'Every feature we build is measured by one thing: does it help candidates achieve their target band score?' },
  { icon: BookOpen, title: 'Expert-led', description: 'Our content is created and reviewed by active IELTS examiners — not just English teachers.' },
  { icon: Users, title: 'Learner-centred', description: 'We design for the learner\'s experience first, prioritising clarity, accessibility, and motivation.' },
  { icon: Award, title: 'Academically rigorous', description: 'Our methods are grounded in research on language acquisition, retrieval practice, and deliberate learning.' },
]

export default function AboutPage() {
  return (
    <div className="py-12 min-h-[85vh]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Mission */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Our mission is to make expert IELTS preparation accessible to everyone
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Better IELTS was founded in 2023 by a team of IELTS examiners and language educators who were frustrated by the quality of IELTS preparation materials available online. Most platforms offered outdated content, poor UX, and no personalisation.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We built Better IELTS to be the platform we wished existed — modern, evidence-based, and genuinely focused on helping candidates reach their goals, whether that is a university place, a visa, or a career change.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { value: '50,000+', label: 'Active learners worldwide' },
            { value: '94%', label: 'Reach their target band' },
            { value: '12', label: 'Countries represented' },
            { value: '2023', label: 'Year founded' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-6 text-center">
              <p className="text-3xl font-extrabold text-primary mb-1">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8">What we believe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="flex gap-4 p-6 rounded-xl border bg-card">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Meet the team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="rounded-xl border bg-card p-6 text-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-20 w-20 rounded-full mx-auto mb-4 bg-muted"
                />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
