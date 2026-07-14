'use client'

import { useMount, useMutation, useSessionStorage, useStep } from '@siberiacancode/reactuse'
import { useState } from 'react'

import type { CreateOtpDto, OtpResponse } from '@generated/api'
import { postApiAuthOtp } from '@generated/api'

import { signInAction } from './actions'
import { useUser } from './useUser'

const PHONE_STEP = 1
const CODE_STEP = 2

const OTP_STORAGE_KEY = 'otp_auth_state'

interface StoredOtpState {
  phone: string
  retryDelay: number
  requestedAt: number
}

export const useOtpAuth = () => {
  const stepper = useStep(2)
  const [phone, setPhone] = useState('')
  const [retryDelay, setRetryDelay] = useState(0)
  const { setUser } = useUser()

  const otpStorage = useSessionStorage<StoredOtpState | null>(OTP_STORAGE_KEY, null)

  const otpMutation = useMutation<CreateOtpDto, OtpResponse>(body =>
    postApiAuthOtp({ body }).then(response => response.data)
  )

  useMount(() => {
    const stored = otpStorage.value
    if (!stored) return

    const elapsed = Date.now() - stored.requestedAt
    const remainingDelay = Math.max(stored.retryDelay - elapsed, 0)

    setPhone(stored.phone)
    setRetryDelay(remainingDelay)
    stepper.set(CODE_STEP)
  })

  const requestOtp = async (nextPhone: string): Promise<OtpResponse> => {
    const result = await otpMutation.mutateAsync({ phone: nextPhone })

    if (result.success) {
      setPhone(nextPhone)
      setRetryDelay(result.retryDelay)
      stepper.set(CODE_STEP)

      otpStorage.set({
        phone: nextPhone,
        retryDelay: result.retryDelay,
        requestedAt: Date.now()
      })
    }

    return result
  }

  const resendOtp = () => requestOtp(phone)

  const verifyCode = async (code: number) => {
    const result = await signInAction(phone, code)

    if (result.success) {
      setUser(result.user)
      otpStorage.remove()
    }

    return result
  }

  const backToPhone = () => {
    otpStorage.remove()
    stepper.set(PHONE_STEP)
  }

  return {
    step: stepper.currentStep,
    phone,
    retryDelay,
    requestOtp,
    resendOtp,
    verifyCode,
    backToPhone,
    otpMutation
  }
}
