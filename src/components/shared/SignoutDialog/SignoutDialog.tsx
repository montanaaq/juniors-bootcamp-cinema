'use client'

import type { ReactNode } from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'
import { signOutAction } from '@/contexts/user/actions'
import { useUser } from '@/contexts/user/useUser'
import { CircleHelpIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

interface SignoutDialogProps {
  children: ReactNode
}

export const SignoutDialog = ({ children }: SignoutDialogProps) => {
  const { setUser } = useUser()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const onSignOut = async () => {
    await signOutAction()
    startTransition(() => {
      setUser(null)
      router.push('/')
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-fg">
            <CircleHelpIcon size={28} />
          </div>
          <DialogTitle className="text-center">
            Вы уверены, что хотите выйти из профиля?
          </DialogTitle>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" size="lg" className="w-full">
              Отменить
            </Button>
          </DialogClose>
          <Button type="button" size="lg" className="w-full" onClick={onSignOut}>
            Выйти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SignoutDialog
