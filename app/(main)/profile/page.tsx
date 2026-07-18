'use client'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  TextField
} from '@/components/ui'
import { signOutAction } from '@/contexts/user/actions'
import { useUser } from '@/contexts/user/useUser'
import { updateProfile } from '@/lib'
import { profileUpdateSchema, toPersonFormValues, type ProfileUpdateValues } from '@/schemas'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { CircleHelpIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'

import { formatPhone } from './_components/utils'

const ProfilePage = () => {
  const { user, setUser } = useUser()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSignOutOpen, setIsSignOutOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileUpdateValues>({
    resolver: valibotResolver(profileUpdateSchema),
    values: user ? toPersonFormValues(user) : undefined
  })

  const onSignOut = async () => {
    await signOutAction()
    startTransition(() => {
      setUser(null)
      router.push('/')
    })
  }

  const onSubmit = async (values: ProfileUpdateValues) => {
    setIsSubmitting(true)
    const data = await updateProfile(user!.phone, values)
    if (data) setUser({ ...user!, ...data })
    setIsSubmitting(false)
  }

  return (
    <section className="w-[60%] py-16 flex flex-col gap-6">
      <h1 className="font-bold text-2xl">Профиль</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2"
      >
        <TextField
          label="Фамилия"
          placeholder="Иванов"
          error={errors.lastname?.message}
          {...register('lastname')}
        />

        <TextField label="Телефон" readOnly disabled value={formatPhone(user!.phone)} />

        <TextField
          label="Имя"
          placeholder="Иван"
          error={errors.firstname?.message}
          {...register('firstname')}
        />

        <TextField
          label="Email"
          placeholder="Email"
          error={errors.email?.message}
          {...register('email')}
        />

        <TextField
          label="Отчество"
          placeholder="Иванович"
          error={errors.middlename?.message}
          {...register('middlename')}
        />

        <TextField
          label="Город"
          placeholder="Москва"
          error={errors.city?.message}
          {...register('city')}
        />

        <Button type="submit" variant="secondary" size="lg" disabled={isSubmitting}>
          Обновить данные
        </Button>
      </form>

      <Button
        type="button"
        variant="primary"
        size="lg"
        className="md:w-[calc(50%-1rem)]"
        onClick={() => setIsSignOutOpen(true)}
      >
        Выйти
      </Button>

      <Dialog open={isSignOutOpen} onOpenChange={setIsSignOutOpen}>
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
    </section>
  )
}

export default ProfilePage
