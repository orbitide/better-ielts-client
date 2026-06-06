'use client'

import { Menu } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AppSidebar } from './AppSidebar'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'lg:hidden')}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <AppSidebar />
      </SheetContent>
    </Sheet>
  )
}
