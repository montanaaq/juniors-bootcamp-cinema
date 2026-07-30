'use client'

import { TextField } from '@/components/ui'
import { toRuPhoneValue } from '@/lib/format-phone'
import { useMask } from '@siberiacancode/reactuse'
import { useController, type Control, type FieldPath, type FieldValues } from 'react-hook-form'

interface PhoneFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  defaultValue?: string
  required?: boolean
  error?: string
}

const RU_PHONE_MASK = '+7 (R99) 999-99-99'
const RU_PHONE_TOKENS = { R: /9/ }

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
    defaultValue: toRuPhoneValue(defaultValue ?? '') as never
  })

  const phoneMask = useMask(RU_PHONE_MASK, {
    showMask: 'never',
    initialValue: String(field.value ?? ''),
    tokens: RU_PHONE_TOKENS,
    onChangeRaw: rawValue => field.onChange(rawValue ? `8${rawValue}` : '')
  })

  const { ref: maskRef, ...maskedField } = phoneMask.register({
    onBlur: field.onBlur
  })

  return (
    <TextField
      label={required ? 'Телефон*' : 'Телефон'}
      inputMode="tel"
      placeholder="+7 (___) ___-__-__"
      error={error}
      {...maskedField}
      ref={element => {
        maskRef(element)
        field.ref(element)
      }}
    />
  )
}
