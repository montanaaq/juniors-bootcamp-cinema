'use client'

import { SignoutDialog } from '@/components/shared'
import { Button, TextField } from '@/components/ui'
import { useUser } from '@/contexts/user/useUser'
import { updateProfile } from '@/lib'
import { profileUpdateSchema, toPersonFormValues, type ProfileUpdateValues } from '@/schemas'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { formatPhone } from './_components/utils'

const ProfilePage = () => {
  const { user, setUser } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileUpdateValues>({
    resolver: valibotResolver(profileUpdateSchema),
    values: user ? toPersonFormValues(user) : undefined
  })

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

        <TextField
          label="Телефон"
          readOnly
          disabled
          className="cursor-not-allowed"
          value={formatPhone(user!.phone)}
        />

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

      <SignoutDialog>
        <Button type="button" variant="primary" size="lg" className="md:w-[calc(50%-1rem)]">
          Выйти
        </Button>
      </SignoutDialog>
    </section>
  )
}

export default ProfilePage
