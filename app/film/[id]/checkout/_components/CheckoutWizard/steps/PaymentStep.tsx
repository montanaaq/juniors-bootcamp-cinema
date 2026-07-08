'use client'

import { TextField } from '@/components/ui'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

import { type DebitCardFormValues, debitCardSchema } from '../schemas/schemas'

interface PaymentStepProps {
  totalPrice: number
  defaultValues?: Partial<DebitCardFormValues>
  onSubmit: (values: DebitCardFormValues) => void
}

export const PAYMENT_STEP_FORM_ID = 'payment-step-form'

export const PaymentStep = ({ totalPrice, defaultValues, onSubmit }: PaymentStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DebitCardFormValues>({
    resolver: valibotResolver(debitCardSchema),
    defaultValues
  })

  return (
    <form id={PAYMENT_STEP_FORM_ID} onSubmit={handleSubmit(onSubmit)} className="flex gap-8">
      <div className="flex flex-col gap-4 p-4">
        <TextField label="Номер карты*" error={errors.pan?.message} {...register('pan')} />
        <div className="flex gap-4">
          <TextField
            label="Срок действия*"
            placeholder="12/30"
            error={errors.expireDate?.message}
            {...register('expireDate')}
          />
          <TextField label="CVV*" error={errors.cvv?.message} {...register('cvv')} />
        </div>
      </div>
      <div className="rounded-12 bg-secondary p-4">
        <span className="block text-sm text-muted-fg">К оплате</span>
        <strong className="text-2xl">{totalPrice} ₽</strong>
      </div>
    </form>
  )
}
