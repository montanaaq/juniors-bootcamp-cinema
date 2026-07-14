'use client'

import { Button, TextField } from '@/components/ui'
import { signOutAction } from '@/contexts/user/actions'
import { useUser } from '@/contexts/user/useUser'
import { updateProfile } from '@/lib'
import { profileUpdateSchema, toPersonFormValues, type ProfileUpdateValues } from '@/schemas'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useIsomorphicLayoutEffect } from '@siberiacancode/reactuse'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { formatPhone } from './_components/utils'

const ProfilePage = () => {
  const { user, setUser } = useUser()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useIsomorphicLayoutEffect(() => {
    if (!user) router.replace('/signin')
  }, [user])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileUpdateValues>({
    resolver: valibotResolver(profileUpdateSchema),
    values: user ? toPersonFormValues(user) : undefined
  })

  if (!user) return null

  const handleSignOut = async () => {
    await signOutAction()
    setUser(null)
    router.push('/signin')
  }
  const onSubmit = async (values: ProfileUpdateValues) => {
    setIsSubmitting(true)
    const data = await updateProfile(user?.phone, values)
    if (data) setUser({ ...user, ...data })
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

        <TextField label="Телефон" readOnly disabled value={formatPhone(user.phone)} />

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
        onClick={handleSignOut}
        className="md:w-[calc(50%-1rem)]"
      >
        Выйти
      </Button>
    </section>
  )
}

export default ProfilePage
