import type { DebitCardFormValues } from '@/schemas'
import type { FC } from 'react'

import { TextField } from '@/components/ui'
import { useMask } from '@siberiacancode/reactuse'
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
    initialValue: field.value,
    onChangeRaw: (_, maskedValue) => field.onChange(maskedValue)
  })

  const { ref: maskRef, ...maskedField } = masked.register({
    onBlur: field.onBlur
  })

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      error={error}
      inputMode="numeric"
      {...maskedField}
      ref={element => {
        maskRef(element)
        field.ref(element)
      }}
    />
  )
}

export default MaskedCardField
