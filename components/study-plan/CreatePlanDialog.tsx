'use client'

import { useState } from 'react'
import { Headphones, BookOpenText, PenLine, Mic, Brain, ClipboardList, CalendarDays, RefreshCw, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { generateStudyPlan, currentWeekStartDate } from '@/lib/utils/generate-study-plan'
import { useStudyPlanStore } from '@/lib/store/study-plan-store'
import type { TaskCategory } from '@/lib/types/study-plan'

const SKILL_OPTIONS: { id: TaskCategory; label: string; Icon: React.ElementType }[] = [
  { id: 'listening', label: 'Listening', Icon: Headphones },
  { id: 'reading', label: 'Reading', Icon: BookOpenText },
  { id: 'writing', label: 'Writing', Icon: PenLine },
  { id: 'speaking', label: 'Speaking', Icon: Mic },
  { id: 'vocabulary', label: 'Vocabulary', Icon: Brain },
  { id: 'mock-test', label: 'Mock Test', Icon: ClipboardList },
]

const BAND_OPTIONS = ['5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9']

const GOAL_OPTIONS = [
  { label: '3 hours / week', value: '180' },
  { label: '5 hours / week', value: '300' },
  { label: '7 hours / week', value: '420' },
  { label: '10+ hours / week', value: '600' },
]

interface CreatePlanDialogProps {
  currentTargetBand?: number
  currentWeeklyGoalMinutes?: number
  hasPlan?: boolean
}

export function CreatePlanDialog({ currentTargetBand, currentWeeklyGoalMinutes, hasPlan }: CreatePlanDialogProps) {
  const [open, setOpen] = useState(false)
  const setPlan = useStudyPlanStore((s) => s.setPlan)

  const [targetBand, setTargetBand] = useState(String(currentTargetBand ?? 7))
  const [weeklyGoal, setWeeklyGoal] = useState(String(currentWeeklyGoalMinutes ?? 420))
  const [focusSkills, setFocusSkills] = useState<TaskCategory[]>(['listening', 'reading', 'writing', 'speaking'])

  function toggleSkill(skill: TaskCategory) {
    setFocusSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  function handleGenerate() {
    const plan = generateStudyPlan({
      targetBand: parseFloat(targetBand),
      weeklyGoalMinutes: parseInt(weeklyGoal, 10),
      focusSkills,
      weekStartDate: currentWeekStartDate(),
    })
    setPlan(plan)
    setOpen(false)
  }

  const canGenerate = focusSkills.length > 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant={hasPlan ? 'outline' : 'default'} className="gap-2" />}>
        {hasPlan ? <RefreshCw className="h-4 w-4" /> : <CalendarDays className="h-4 w-4" />}
        {hasPlan ? 'Regenerate' : 'Create Plan'}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Study Plan</DialogTitle>
          <DialogDescription>
            Personalise your weekly study schedule based on your goals.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Target Band */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Target Band Score</label>
            <Select value={targetBand} onValueChange={(v) => { if (v) setTargetBand(v) }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select target band" />
              </SelectTrigger>
              <SelectContent>
                {BAND_OPTIONS.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Weekly Goal */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Weekly Study Goal</label>
            <Select value={weeklyGoal} onValueChange={(v) => { if (v) setWeeklyGoal(v) }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select weekly goal" />
              </SelectTrigger>
              <SelectContent>
                {GOAL_OPTIONS.map((g) => (
                  <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Focus Skills */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Focus Skills</label>
            <p className="text-xs text-muted-foreground">Select all that apply.</p>
            <div className="grid grid-cols-3 gap-2">
              {SKILL_OPTIONS.map(({ id, label, Icon }) => {
                const selected = focusSkills.includes(id)
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleSkill(id)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      selected
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/40 hover:bg-muted/40'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            disabled={!canGenerate}
            onClick={handleGenerate}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Generate Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
