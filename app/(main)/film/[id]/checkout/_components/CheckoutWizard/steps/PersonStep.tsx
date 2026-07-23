'use client'

import type { FC } from 'react'

import { PhoneField } from '@/components/shared'
import { Button, TextField } from '@/components/ui'
import { useUser } from '@/contexts/user/useUser'
import { toRuPhoneDigits } from '@/lib'
import { personSchema, type PersonFormValues } from '@/schemas'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

interface PersonStepProps {
  onSubmit: (values: PersonFormValues) => void
  onBack: () => void
}

export const PERSON_STEP_FORM_ID = 'person-step-form'

export const PersonStep: FC<PersonStepProps> = ({ onSubmit, onBack }) => {
  const { user } = useUser()

  const phoneDefault = user ? toRuPhoneDigits(user.phone) : ''

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<PersonFormValues>({
    resolver: valibotResolver(personSchema),
    defaultValues: {
      firstname: user?.firstname ?? '',
      lastname: user?.lastname ?? '',
      middlename: user?.middlename ?? '',
      email: user?.email ?? '',
      city: user?.city ?? '',
      phone: phoneDefault
    }
  })

  return (
    <form
      id={PERSON_STEP_FORM_ID}
      onSubmit={handleSubmit(onSubmit)}
      className="w-[60%] flex flex-col gap-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Фамилия*"
          placeholder="Иванов"
          error={errors.lastname?.message}
          {...register('lastname')}
        />
        <TextField
          label="Город"
          placeholder="Москва"
          error={errors.city?.message}
          {...register('city')}
        />
        <TextField
          label="Имя*"
          placeholder="Иван"
          error={errors.firstname?.message}
          {...register('firstname')}
        />
        <PhoneField
          required
          name="phone"
          control={control}
          defaultValue={phoneDefault}
          error={errors.phone?.message}
        />
        <TextField
          label="Отчество*"
          placeholder="Иванович"
          error={errors.middlename?.message}
          {...register('middlename')}
        />
        <TextField
          label="Почта"
          type="email"
          placeholder="ivanov@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button variant="secondary" size="lg" className="w-full" onClick={onBack}>
            Назад
          </Button>
          <Button type="submit" form={PERSON_STEP_FORM_ID} size="lg" className="w-full">
            Продолжить
          </Button>
        </div>
      </div>
    </form>
  )
}
