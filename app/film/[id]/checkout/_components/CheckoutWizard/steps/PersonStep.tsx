'use client'

import { TextField } from '@/components/ui'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

import PhoneField from '../components/PhoneField'
import { personSchema, type PersonFormValues } from '../schemas/schemas'

interface PersonStepProps {
  defaultValues?: Partial<PersonFormValues>
  onSubmit: (values: PersonFormValues) => void
}

export const PERSON_STEP_FORM_ID = 'person-step-form'

export const PersonStep = ({ defaultValues, onSubmit }: PersonStepProps) => {
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
    <form
      id={PERSON_STEP_FORM_ID}
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 sm:grid-cols-2"
    >
      <TextField
        label="Фамилия"
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
        label="Имя"
        placeholder="Иван"
        error={errors.firstname?.message}
        {...register('firstname')}
      />
      <PhoneField
        control={control}
        defaultValue={defaultValues?.phone}
        error={errors.phone?.message}
      />
      <TextField
        label="Отчество"
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
  )
}
