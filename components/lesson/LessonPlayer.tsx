'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import type { Lesson, Course } from '@/lib/types/course'
import { Play, BookOpen, Dumbbell, ClipboardList, Clock, ChevronLeft, ChevronRight, CheckCircle, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const lessonIcon: Record<string, React.ElementType> = {
  video: Play,
  reading: BookOpen,
  exercise: Dumbbell,
  quiz: ClipboardList,
}

const skillColor: Record<string, string> = {
  listening: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  reading: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  writing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  speaking: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  general: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
}

export function LessonPlayer({ lesson, course }: { lesson: Lesson; course: Course }) {
  const [completed, setCompleted] = useState(lesson.isCompleted)
  const [showSidebar, setShowSidebar] = useState(true)

  const lessonIdx = course.lessons.findIndex((l) => l.id === lesson.id)
  const prevLesson = course.lessons[lessonIdx - 1]
  const nextLesson = course.lessons[lessonIdx + 1]
  const Icon = lessonIcon[lesson.type] ?? BookOpen
  const completedCount = course.lessons.filter((l) => l.isCompleted).length + (completed && !lesson.isCompleted ? 1 : 0)
  const progress = (completedCount / course.lessons.length) * 100

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b shrink-0 gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground truncate">{course.title}</p>
              <h1 className="font-semibold truncate">{lesson.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground hidden sm:block">{lesson.durationMinutes} min</span>
            <Badge variant="secondary" className="capitalize gap-1">
              <Icon className="h-3 w-3" />
              {lesson.type}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSidebar(!showSidebar)}
              className="text-xs hidden lg:flex"
            >
              {showSidebar ? 'Hide' : 'Show'} outline
            </Button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 max-w-3xl mx-auto">
            {lesson.type === 'video' && (
              <div className="aspect-video rounded-xl bg-black/80 flex items-center justify-center mb-6 border">
                <div className="text-center text-white">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 mb-3 cursor-pointer hover:bg-white/20 transition-colors">
                    <Play className="h-8 w-8 ml-1" />
                  </div>
                  <p className="text-sm opacity-70">{lesson.title}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <Badge className={cn('capitalize', skillColor[course.skill])}>{course.skill}</Badge>
              <Badge variant="secondary" className="capitalize">{course.level}</Badge>
              <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {lesson.durationMinutes} minutes
              </span>
            </div>

            {lesson.content ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="space-y-4 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                  {lesson.content}
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p className="text-foreground font-semibold text-lg">{lesson.title}</p>
                <p>
                  This lesson covers key strategies and techniques for the IELTS {course.skill} section.
                  Work through each exercise carefully and make notes on the techniques that are new to you.
                </p>
                <p>
                  The IELTS exam tests your ability to use English in academic contexts. In this lesson,
                  you will practise the specific skills needed to achieve your target band score of 7.0 or above.
                </p>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-semibold text-foreground mb-2">Key Learning Objectives</p>
                  <ul className="space-y-1.5">
                    <li>• Understand the task requirements and timing</li>
                    <li>• Apply the recommended strategy for maximum marks</li>
                    <li>• Practise with authentic IELTS-style questions</li>
                    <li>• Review common mistakes and how to avoid them</li>
                  </ul>
                </div>
                <p>
                  After completing this lesson, proceed to the practice exercises to reinforce your learning.
                  Remember: consistent practice is the key to band score improvement.
                </p>
              </div>
            )}

            {/* Mark complete button */}
            <div className="mt-8 flex items-center gap-3">
              <Button
                onClick={() => setCompleted(true)}
                disabled={completed}
                className={cn(
                  'gap-2',
                  completed ? 'bg-emerald-600 hover:bg-emerald-600 cursor-not-allowed' : ''
                )}
              >
                <CheckCircle className="h-4 w-4" />
                {completed ? 'Completed!' : 'Mark as complete'}
              </Button>
              {nextLesson && (
                <Button variant="outline" asChild className="gap-2">
                  <Link href={`/lesson/${nextLesson.id}`}>
                    Next lesson
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Sidebar — course outline */}
      {showSidebar && (
        <div className="hidden lg:flex flex-col w-80 border-l shrink-0">
          <div className="p-4 border-b shrink-0">
            <p className="font-semibold text-sm mb-1">Course Outline</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>{completedCount}/{course.lessons.length} completed</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {course.lessons.map((l, i) => {
                const LIcon = lessonIcon[l.type] ?? BookOpen
                const isCurrent = l.id === lesson.id
                return (
                  <Link
                    key={l.id}
                    href={`/lesson/${l.id}`}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent',
                      isCurrent && 'bg-primary/10 text-primary font-medium'
                    )}
                  >
                    <span className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                      l.isCompleted || (isCurrent && completed)
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-muted text-muted-foreground'
                    )}>
                      {l.isCompleted || (isCurrent && completed) ? <CheckCircle className="h-3 w-3" /> : i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate">{l.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <LIcon className="h-3 w-3" />
                        {l.durationMinutes}m
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
