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

        {user && (
          <IconButton rounded variant="secondary" asChild>
            <Link href="/orders" aria-label="Мои заказы">
              <TicketIcon size={16} />
            </Link>
          </IconButton>
        )}

        <IconButton rounded variant="secondary" asChild>
          <Link href="/profile" aria-label="Профиль">
            <UserIcon size={16} />
          </Link>
        </IconButton>

        {user ? (
          <SignoutDialog>
            <Button variant="primary" className="ml-2">
              Выйти
              <LogOutIcon size={16} />
            </Button>
          </SignoutDialog>
        ) : (
          <Button asChild variant="primary" className="ml-2">
            <Link href="/signin">Войти</Link>
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header
