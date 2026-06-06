'use client'

import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { Switch } from '@/components/ui/switch'

export function SettingsForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Appearance</p>
          <p className="text-xs text-muted-foreground mt-0.5">Switch between light and dark mode</p>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Email notifications</p>
          <p className="text-xs text-muted-foreground mt-0.5">Study reminders and weekly progress reports</p>
        </div>
        <Switch defaultChecked />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Practice reminders</p>
          <p className="text-xs text-muted-foreground mt-0.5">Daily nudge to complete your study plan</p>
        </div>
        <Switch defaultChecked />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Marketing emails</p>
          <p className="text-xs text-muted-foreground mt-0.5">Tips, offers, and product updates</p>
        </div>
        <Switch />
      </div>
    </div>
  )
}
