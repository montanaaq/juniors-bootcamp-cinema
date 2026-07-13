'use client'

import { useOtpAuth } from '@/src/contexts/user/useOthAuth'
import { useRouter } from 'next/navigation'

import { OtpCodeStep } from './_components/OtpCodeStep'
import { PhoneStep } from './_components/PhoneStep'

const LoginPage = () => {
  const router = useRouter()
  const { step, retryDelay, requestOtp, resendOtp, verifyCode, backToPhone, otpMutation } =
    useOtpAuth()

  const handleVerify = async (code: number) => {
    const result = await verifyCode(code)
    if (result.success) router.push('/profile')
    return result
  }

  return (
    <section className="mx-auto max-w-sm h-[calc(100vh-var(--header-height)-8rem)]">
      {step === 1 ? (
        <PhoneStep onSubmit={requestOtp} isLoading={otpMutation.isLoading} />
      ) : (
        <OtpCodeStep
          retryDelay={retryDelay}
          onSubmit={handleVerify}
          onResend={resendOtp}
          onBack={backToPhone}
          isLoading={false}
        />
      )}
    </section>
  )
}

export default LoginPage
