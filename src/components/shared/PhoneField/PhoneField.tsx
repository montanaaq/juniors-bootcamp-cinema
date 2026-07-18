'use client'

import { TextField } from '@/components/ui'
import { useDidUpdate, useMask } from '@siberiacancode/reactuse'
import { useController, type Control, type FieldPath, type FieldValues } from 'react-hook-form'

interface PhoneFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  defaultValue?: string
  required?: boolean
  error?: string
}

const RU_PHONE_MASK = '+7 (999) 999-99-99'

export const PhoneField = <TFieldValues extends FieldValues>({
  control,
  name,
  required,
  defaultValue,
  error
}: PhoneFieldProps<TFieldValues>) => {
  const { field } = useController({
    name,
    control,
    defaultValue: (defaultValue ?? '+7 ') as never
  })

  const phoneMask = useMask(RU_PHONE_MASK, {
    showMask: 'never',
    initialValue: defaultValue,
    beforeMaskedChange: ({ nextState }) => ({
      ...nextState,
      selection: { start: nextState.value.length, end: nextState.value.length }
    })
  })

  const phone = phoneMask.watch()

  useDidUpdate(() => {
    const rawDigits = phone.value.replace(/\D/g, '')
    const localDigits = rawDigits.startsWith('7') ? rawDigits.slice(1) : rawDigits
    const digits = localDigits.length > 0 ? `8${localDigits.slice(0, 10)}` : ''

    if (digits !== field.value) {
      field.onChange(digits)
    }
  }, [phone.value])
  return (
    <TextField
      label={required ? 'Телефон*' : 'Телефон'}
      inputMode="tel"
      placeholder="+7 (___) ___-__-__"
      error={error}
      {...phoneMask.register()}
      onBlur={event => {
        phoneMask.register().onBlur?.(event)
        field.onBlur()
      }}
    />
  )
}
