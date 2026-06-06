const stats = [
  {
    value: '+1.5',
    unit: 'bands',
    label: 'Average improvement',
    detail: 'among students who complete 8 weeks',
  },
  {
    value: '40',
    unit: 'questions',
    label: 'Per skill section',
    detail: 'matching the real IELTS exam format',
  },
  {
    value: '165',
    unit: 'minutes',
    label: 'Full mock test',
    detail: 'Listening · Reading · Writing · Speaking',
  },
  {
    value: '140+',
    unit: 'countries',
    label: 'Accept IELTS scores',
    detail: 'for visas, study and immigration',
  },
]

export function StatsSection() {
  return (
    <section className="border-y bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-primary mb-0.5">
                {stat.value}
                <span className="text-lg font-semibold text-muted-foreground ml-1">{stat.unit}</span>
              </p>
              <p className="text-sm font-medium mb-0.5">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
