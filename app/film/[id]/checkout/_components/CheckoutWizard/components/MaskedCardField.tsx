import type { DebitCardFormValues } from '@/src/schemas'

import { TextField } from '@/src/components/ui'
import { useMask } from '@siberiacancode/reactuse'
import { useEffect, type FC } from 'react'
import { useController, type Control } from 'react-hook-form'

interface MaskedCardFieldProps {
  control: Control<DebitCardFormValues>
  name: 'pan' | 'expireDate'
  mask: string
  label: string
  placeholder: string
  error?: string
  defaultValue?: string
}

const MaskedCardField: FC<MaskedCardFieldProps> = ({
  control,
  name,
  mask,
  label,
  placeholder,
  error,
  defaultValue
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: defaultValue ?? ''
  })

  const masked = useMask(mask, {
    showMask: 'never',
    initialValue: defaultValue,
    beforeMaskedChange: ({ nextState }) => ({
      ...nextState,
      selection: { start: nextState.value.length, end: nextState.value.length }
    })
  })

  const value = masked.watch()

  useEffect(() => {
    if (value.value !== field.value) {
      field.onChange(value.value)
    }
  }, [value.value])

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      error={error}
      inputMode="numeric"
      {...masked.register()}
      onBlur={event => {
        masked.register().onBlur?.(event)
        field.onBlur()
      }}
    />
  )
}

export default MaskedCardField
