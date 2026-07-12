'use client'

import { useMutation, useStep } from '@siberiacancode/reactuse'
import { useState } from 'react'

import type { CreateOtpDto, OtpResponse } from '@generated/api'
import { postApiAuthOtp } from '@generated/api'

import { signInAction } from './actions'
import { useUser } from './useUser'

const PHONE_STEP = 1
const CODE_STEP = 2

export const useOtpAuth = () => {
  const stepper = useStep(2)
  const [phone, setPhone] = useState('')
  const [retryDelay, setRetryDelay] = useState(0)
  const { setUser } = useUser()

  const otpMutation = useMutation<CreateOtpDto, OtpResponse>(body =>
    postApiAuthOtp({ body }).then(response => response.data)
  )

  const requestOtp = async (nextPhone: string): Promise<OtpResponse> => {
    const result = await otpMutation.mutateAsync({ phone: nextPhone })

    if (result.success) {
      setPhone(nextPhone)
      setRetryDelay(result.retryDelay)
      stepper.set(CODE_STEP)
    }

    return result
  }

  const resendOtp = () => requestOtp(phone)

  const verifyCode = async (code: number) => {
    const result = await signInAction(phone, code)

    if (result.success) {
      setUser(result.user)
    }

    return result
  }

  const backToPhone = () => stepper.set(PHONE_STEP)

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
