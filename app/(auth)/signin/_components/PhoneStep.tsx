'use client'

import { PhoneField } from '@/components/shared'
import { Button } from '@/components/ui'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import * as v from 'valibot'

import type { OtpResponse } from '@generated/api'

const phoneFormSchema = v.object({
  phone: v.pipe(v.string(), v.trim(), v.regex(/^8\d{10}$/, 'Введите корректный номер телефона'))
})

type PhoneFormValues = v.InferOutput<typeof phoneFormSchema>

interface PhoneStepProps {
  onSubmit: (phone: string) => Promise<OtpResponse>
  isLoading: boolean
}

export const PhoneStep = ({ onSubmit, isLoading }: PhoneStepProps) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<PhoneFormValues>({
    resolver: valibotResolver(phoneFormSchema),
    defaultValues: { phone: '' }
  })

  const submit = handleSubmit(async values => {
    const result = await onSubmit(values.phone)

    if (!result.success) {
      setError('phone', { message: result.reason ?? 'Не удалось отправить код' })
    }
  })

  return (
    <form onSubmit={submit} className="w-full flex flex-col gap-4 justify-center">
      <h1 className="self-center font-bold text-2xl">Авторизация</h1>
      <p className="font-medium text-lg">Введите номер телефона для входа в свой профиль</p>
      <PhoneField control={control} name="phone" error={errors.phone?.message} />
      <Button type="submit" disabled={isLoading} size="lg">
        Войти
      </Button>
    </form>
  )
}
