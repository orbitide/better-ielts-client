import { PageHeader } from '@/components/shared/PageHeader'
import { SettingsForm } from '@/components/settings/SettingsForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = { title: 'Settings' }

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-2xl mx-auto">
      <PageHeader
        title="Settings"
        description="Manage your preferences and notifications."
      />

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customise how Better IELTS works for you</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm />
        </CardContent>
      </Card>
    </div>
  )
}
