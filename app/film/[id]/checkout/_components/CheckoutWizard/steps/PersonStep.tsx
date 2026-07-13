'use client'

import type { FC } from 'react'

import { PhoneField } from '@/src/components/shared'
import { Button, TextField } from '@/src/components/ui'
import { personSchema, type PersonFormValues } from '@/src/schemas'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

interface PersonStepProps {
  defaultValues?: Partial<PersonFormValues>
  onSubmit: (values: PersonFormValues) => void
  onBack: () => void
}

export const PERSON_STEP_FORM_ID = 'person-step-form'

export const PersonStep: FC<PersonStepProps> = ({ defaultValues, onSubmit, onBack }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<PersonFormValues>({
    resolver: valibotResolver(personSchema),
    defaultValues: {
      phone: '',
      ...defaultValues
    }
  })

  return (
    <div className="w-[60%] flex flex-col gap-6">
      <form
        id={PERSON_STEP_FORM_ID}
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 sm:grid-cols-2"
      >
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
          defaultValue={defaultValues?.phone}
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
      </form>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Button variant="secondary" size="lg" className="w-full" onClick={onBack}>
          Назад
        </Button>
        <Button type="submit" form={PERSON_STEP_FORM_ID} size="lg" className="w-full">
          Продолжить
        </Button>
      </div>
    </div>
  )
}
