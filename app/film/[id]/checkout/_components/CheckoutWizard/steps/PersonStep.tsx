'use client'

import { TextField } from '@/components/ui'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useMask } from '@siberiacancode/reactuse'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { personSchema, type PersonFormValues } from '../schemas/schemas'

const RU_PHONE_MASK = '+9 (999) 999-99-99'

type PersonStepProps = {
  defaultValues?: Partial<PersonFormValues>
  onSubmit: (values: PersonFormValues) => void
}

export const PERSON_STEP_FORM_ID = 'person-step-form'

export const PersonStep = ({ defaultValues, onSubmit }: PersonStepProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors }
  } = useForm<PersonFormValues>({
    resolver: valibotResolver(personSchema),
    defaultValues
  })

  const phoneMask = useMask(RU_PHONE_MASK, {
    showMask: 'never',
    initialValue: defaultValues?.phone,
    beforeMaskedChange: ({ nextState }) => ({
      ...nextState,
      selection: { start: nextState.value.length, end: nextState.value.length }
    })
  })

  const phone = phoneMask.watch()

  useEffect(() => {
    setValue('phone', phone.value, { shouldValidate: false })
  }, [phone.value, setValue])

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
      <TextField
        label="Телефон"
        inputMode="tel"
        placeholder="+7 (___) ___-__-__"
        error={errors.phone?.message}
        {...phoneMask.register()}
        onBlur={event => {
          phoneMask.register().onBlur?.(event)
          trigger('phone')
        }}
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
        placeholder="ivanov@gmail.com"
        error={errors.email?.message}
        {...register('email')}
      />
    </form>
  )
}
