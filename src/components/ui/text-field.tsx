'use client'

import { cn } from '@/lib/utils'

type TextFieldProps = React.ComponentProps<'input'> & {
  label: string
  error?: string
}

const fieldClassName =
  'h-12 w-full rounded-12 border border-input bg-background px-4 text-base outline-none transition focus:border-border-hard focus:ring-3 focus:ring-ring/50'

export const TextField = ({ label, error, className, ...props }: TextFieldProps) => (
  <label className="flex flex-col gap-2 font-bold">
    <span>{label}</span>
    <input className={cn(fieldClassName, error && 'border-danger', className)} {...props} />
    {error && <span className="text-sm text-danger">{error}</span>}
  </label>
)
