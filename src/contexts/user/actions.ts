'use server'
import { AUTHORIZATION_TOKEN } from '@/constants'
import { cookies } from 'next/headers'

import { postApiUsersSignin } from '@generated/api'
import type { SignInResponse } from '@generated/api'

export const signInAction = async (phone: string, code: number): Promise<SignInResponse> => {
  try {
    const result = await postApiUsersSignin({ body: { phone, code } }).then(
      response => response.data
    )

    if (result.success) {
      const cookieStore = await cookies()
      cookieStore.set(AUTHORIZATION_TOKEN, result.token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      })
    }

    return result
  } catch (error) {
    const response = (error as { response?: { data?: { reason?: string } } })?.response

    return {
      success: false,
      reason: response?.data?.reason ?? 'Не удалось войти'
    } as SignInResponse
  }
}

export const signOutAction = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(AUTHORIZATION_TOKEN)
}
