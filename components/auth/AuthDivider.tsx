import { Separator } from '@/components/ui/separator'

export function AuthDivider({ label = 'or' }: { label?: string }) {
  return (
    <div className="relative flex items-center py-1">
      <Separator className="flex-1" />
      <span className="px-3 text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      <Separator className="flex-1" />
    </div>
  )
}
