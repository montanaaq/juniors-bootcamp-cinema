'use client'

import type { FC } from 'react'

import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { IconButton } from '@/components/ui/icon-button'
import { LogOutIcon, TicketIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'

const Header: FC = () => {
  return (
    <header className="flex h-16 w-full items-center justify-between rounded-full border border-border-hard p-4 dark:border-border-soft">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center justify-center gap-4">
        <IconButton rounded variant="secondary">
          <TicketIcon size={16} />
        </IconButton>
        <IconButton rounded variant="secondary">
          <UserIcon size={16} />
        </IconButton>
        <Button variant="primary" className="ml-2 font-bold!">
          Выйти
          <LogOutIcon size={16} />
        </Button>
      </div>
    </header>
  )
}

export default Header
