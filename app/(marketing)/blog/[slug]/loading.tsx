export default function BlogDetailLoading() {
  return (
    <div className="py-12 min-h-[85vh]">
      <div className="container mx-auto px-4 max-w-3xl animate-pulse">
        <div className="h-4 w-24 bg-muted rounded mb-8" />
        <div className="aspect-video rounded-2xl bg-muted mb-8" />
        <div className="h-5 w-20 bg-muted rounded mb-4" />
        <div className="h-9 bg-muted rounded mb-2" />
        <div className="h-9 w-3/4 bg-muted rounded mb-4" />
        <div className="h-4 bg-muted rounded mb-2" />
        <div className="h-4 w-5/6 bg-muted rounded mb-6" />
        <div className="flex gap-4 mb-6 pb-6 border-b">
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div className="flex-1 space-y-1">
            <div className="h-3 w-24 bg-muted rounded" />
            <div className="h-3 w-32 bg-muted rounded" />
          </div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded" style={{ width: `${85 + (i % 3) * 5}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
