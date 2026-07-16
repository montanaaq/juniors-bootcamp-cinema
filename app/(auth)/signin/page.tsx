'use client'

import type { Metadata } from 'next'

import { Logo } from '@/components/shared'
import { useOtpAuth } from '@/contexts/user/useOtpAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { OtpCodeStep } from './_components/OtpCodeStep'
import { PhoneStep } from './_components/PhoneStep'

export const metadata: Metadata = {
  title: 'Вход в аккаунт'
}

const SignInPage = () => {
  const router = useRouter()
  const { step, retryDelay, requestOtp, resendOtp, verifyCode, backToPhone, otpMutation } =
    useOtpAuth()

  const onVerify = async (code: number) => {
    const result = await verifyCode(code)
    if (result.success) router.push('/profile')
    return result
  }

  return (
    <section className="mx-auto flex flex-col items-center justify-center max-w-xs h-[calc(100vh-var(--header-height)-8rem)] gap-12">
      <Link href="/">
        <Logo />
      </Link>
      {step === 1 ? (
        <PhoneStep onSubmit={requestOtp} isLoading={otpMutation.isLoading} />
      ) : (
        <OtpCodeStep
          retryDelay={retryDelay}
          onVerify={onVerify}
          resendOtp={resendOtp}
          onBack={backToPhone}
          isLoading={false}
        />
      )}
    </section>
  )
}

export default SignInPage
