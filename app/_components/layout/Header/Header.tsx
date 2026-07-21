'use client'

import { Logo, SignoutDialog, ThemeToggle } from '@/components/shared'
import { Button, IconButton } from '@/components/ui'
import { useUser } from '@/contexts/user/useUser'
import { LogOutIcon, TicketIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  const { user } = useUser()

  return (
    <header className="flex h-(--header-height) w-full items-center justify-between rounded-full border border-border-hard p-4 dark:border-border-soft">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center justify-center gap-4">
        <ThemeToggle />
        <IconButton rounded variant="secondary">
          <TicketIcon size={16} />
        </IconButton>
        <IconButton rounded variant="secondary" asChild>
          <Link href="/profile">
            <UserIcon size={16} />
          </Link>
        </IconButton>
        {user && (
          <SignoutDialog>
            <Button variant="primary" className="ml-2">
              Выйти
              <LogOutIcon size={16} />
            </Button>
          </SignoutDialog>
        )}
      </div>
    </header>
  )
}

export default Header
