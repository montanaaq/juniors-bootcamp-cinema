import type { PersonFormValues } from '../schemas/schemas'

import { TextField } from '@/components/ui'
import { useMask } from '@siberiacancode/reactuse'
import { useEffect } from 'react'
import { useController, type Control } from 'react-hook-form'

type PhoneFieldProps = {
  control: Control<PersonFormValues>
  defaultValue?: string
  error?: string
}

const RU_PHONE_MASK = '+9 (999) 999-99-99'

const PhoneField = ({ control, defaultValue, error }: PhoneFieldProps) => {
  const { field } = useController({
    name: 'phone',
    control,
    defaultValue: defaultValue ?? ''
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

  useEffect(() => {
    if (phone.value !== field.value) {
      field.onChange(phone.value)
    }
  }, [phone.value])

  return (
    <TextField
      label="Телефон"
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

export default PhoneField
