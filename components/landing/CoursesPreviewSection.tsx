import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'
import { Badge } from '@/components/ui/badge'
import { Star, Users, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const previewCourses = [
  {
    id: 'course-reading-1',
    title: 'IELTS Reading Mastery',
    skill: 'Reading',
    level: 'Intermediate',
    rating: 4.8,
    students: 4821,
    lessons: 12,
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
    skillColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  },
  {
    id: 'course-writing-1',
    title: 'Writing Task 2 Masterclass',
    skill: 'Writing',
    level: 'Intermediate',
    rating: 4.9,
    students: 6203,
    lessons: 14,
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80',
    skillColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  },
  {
    id: 'course-speaking-1',
    title: 'Speaking Confidence',
    skill: 'Speaking',
    level: 'Intermediate',
    rating: 4.8,
    students: 5431,
    lessons: 10,
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
    skillColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  },
]

export function CoursesPreviewSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
              Expert-designed courses
            </h2>
            <p className="text-muted-foreground text-lg">
              Built by IELTS examiners and Band 9 instructors.
            </p>
          </div>
          <Link href="/courses" className={cn(buttonVariants({ variant: 'outline' }), 'gap-2 shrink-0')}>
            View all courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewCourses.map((course) => (
            <Link
              key={course.id}
              href={`/courses`}
              className="group rounded-xl border bg-card overflow-hidden transition-shadow hover:shadow-lg"
            >
              {/* Thumbnail */}
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className={course.skillColor}>
                    {course.skill}
                  </Badge>
                  <Badge variant="outline" className="text-xs">{course.level}</Badge>
                </div>

                <h3 className="font-semibold text-base mb-3 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {course.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {course.students.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {course.lessons} lessons
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
