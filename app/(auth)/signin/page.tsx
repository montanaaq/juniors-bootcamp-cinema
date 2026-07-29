import type { Metadata } from 'next'

import { SignInForm } from './_components/SignInForm'

export const metadata: Metadata = {
  title: 'Вход в аккаунт'
}

const SignInPage = () => <SignInForm />

export default SignInPage
