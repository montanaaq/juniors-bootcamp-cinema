'use client'

import { Button, TextField } from '@/components/ui'
import { useOtpCredential, useTimer } from '@siberiacancode/reactuse'
import { ChevronLeftIcon } from 'lucide-react'
import { useState } from 'react'

import type { OtpResponse, SignInResponse } from '@generated/api'

interface OtpCodeStepProps {
  retryDelay: number
  onSubmit: (code: number) => Promise<SignInResponse>
  onResend: () => Promise<OtpResponse>
  onBack: () => void
  isLoading: boolean
}

export const OtpCodeStep = ({
  retryDelay,
  onSubmit,
  onResend,
  onBack,
  isLoading
}: OtpCodeStepProps) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)

  const retryDelaySeconds = Math.round(retryDelay / 1000)
  const timer = useTimer(retryDelaySeconds)

  const submitCode = async (value: string) => {
    setError(null)
    const result = await onSubmit(+value)
    if (!result.success) setError(result.reason ?? 'Неверный код')
  }

  useOtpCredential({
    onSuccess: credential => {
      if (!credential?.code) return
      setCode(credential.code)
      submitCode(credential.code)
    }
  })

  const handleChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 6)
    setCode(digits)

    if (digits.length === 6) submitCode(digits)
  }

  const handleResend = async () => {
    setError(null)
    const result = await onResend()
    if (!result.success) setError(result.reason ?? 'Не удалось отправить код повторно')
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center">
      <div className="flex items-center gap-2">
        <button type="button" onClick={onBack} aria-label="Изменить номер">
          <ChevronLeftIcon size={28} />
        </button>
        <h1 className="font-bold text-2xl">Проверочный код</h1>
      </div>
      <p className="font-medium text-lg">На указанный вами номер был отправлен проверочный код</p>
      <TextField
        label="Проверочный код"
        inputMode="numeric"
        maxLength={6}
        autoComplete="one-time-code"
        value={code}
        onChange={event => handleChange(event.target.value)}
        error={error ?? undefined}
      />
      <Button onClick={() => submitCode(code)} disabled={isLoading || code.length < 6} size="lg">
        Войти
      </Button>
      <Button variant="secondary" onClick={handleResend} disabled={timer.active} size="lg">
        {timer.active
          ? `Повторить через ${timer.minutes}:${String(timer.seconds).padStart(2, '0')}`
          : 'Отправить код повторно'}
      </Button>
    </div>
  )
}
