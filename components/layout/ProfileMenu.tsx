'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, CreditCard, HelpCircle, LogOut, Settings, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/lib/store/auth-store'
import { cn } from '@/lib/utils'

export function ProfileMenu() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  if (!user) return null

  const firstName = user.name.split(' ')[0]

  function handleLogout() {
    logout()
    router.push('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'inline-flex h-8 items-center gap-1.5 rounded-lg border border-transparent px-2.5 text-sm font-medium',
          'hover:bg-muted hover:text-foreground transition-colors outline-none',
          'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        )}
      >
        <span className="max-w-[120px] truncate">{firstName}</span>
        <ChevronDown className="size-3.5 opacity-60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-3 font-normal">
            <p className="font-medium text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </DropdownMenuLabel>

          <DropdownMenuItem className="px-3 py-2 gap-3" render={<Link href="/account" />}>
            <User />
            My Account
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-2 gap-3" render={<Link href="/settings" />}>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-2 gap-3" render={<Link href="/subscription" />}>
            <CreditCard />
            Subscription
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-2 gap-3" render={<Link href="/support" />}>
            <HelpCircle />
            Support
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="px-3 py-2 gap-3" variant="destructive" onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
