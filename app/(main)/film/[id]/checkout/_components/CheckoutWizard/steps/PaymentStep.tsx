'use client'

import type { FC } from 'react'

import { Button, TextField } from '@/components/ui'
import { type DebitCardFormValues, debitCardSchema } from '@/schemas'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

import MaskedCardField from '../components/MaskedCardField'

interface PaymentStepProps {
  onBack: () => void
  defaultValues?: Partial<DebitCardFormValues>
  onSubmit: (values: DebitCardFormValues) => void
}

export const PAYMENT_STEP_FORM_ID = 'payment-step-form'

const CARD_PAN_MASK = '9999 9999 9999 9999'
const CARD_EXPIRE_MASK = '99/99'

export const PaymentStep: FC<PaymentStepProps> = ({ onBack, defaultValues, onSubmit }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DebitCardFormValues>({
    resolver: valibotResolver(debitCardSchema),
    defaultValues
  })

  return (
    <form id={PAYMENT_STEP_FORM_ID} onSubmit={handleSubmit(onSubmit)} className="flex gap-8">
      <div className="flex flex-col gap-6">
        <MaskedCardField
          control={control}
          name="pan"
          mask={CARD_PAN_MASK}
          label="Номер карты*"
          placeholder="0000 0000 0000 0000"
          error={errors.pan?.message}
          defaultValue={defaultValues?.pan}
        />
        <div className="flex gap-4">
          <MaskedCardField
            control={control}
            name="expireDate"
            mask={CARD_EXPIRE_MASK}
            label="Срок действия*"
            placeholder="12/30"
            error={errors.expireDate?.message}
            defaultValue={defaultValues?.expireDate}
          />
          <TextField
            label="CVV*"
            inputMode="numeric"
            placeholder="000"
            maxLength={3}
            error={errors.cvv?.message}
            {...register('cvv')}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button variant="secondary" size="lg" className="w-full" onClick={onBack}>
            Назад
          </Button>
          <Button type="submit" form={PAYMENT_STEP_FORM_ID} size="lg" className="w-full">
            Продолжить
          </Button>
        </div>
      </div>
    </form>
  )
}
