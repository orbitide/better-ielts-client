import { getAllCourses } from '@/lib/data/courses'
import { Badge } from '@/components/ui/badge'
import { Star, Users, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { skillColor } from '@/lib/utils/format'

export const metadata = { title: 'Courses' }

export default async function CoursesPage() {
  const courses = await getAllCourses()

  const skills = ['all', 'reading', 'listening', 'writing', 'speaking', 'general']

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-3">IELTS Courses</h1>
          <p className="text-muted-foreground text-lg">
            Expert-designed courses for all four IELTS skills. Learn strategies, practise techniques, and build confidence.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant={skill === 'all' ? 'default' : 'secondary'}
              className="cursor-pointer capitalize px-4 py-1 text-sm"
            >
              {skill === 'all' ? 'All Skills' : skill}
            </Badge>
          ))}
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/lesson/${course.lessons[0]?.id ?? course.id}`}
              className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className={skillColor(course.skill)}>
                    {course.skill.charAt(0).toUpperCase() + course.skill.slice(1)}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">{course.level}</Badge>
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course.enrolledCount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {course.totalLessons} lessons
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
