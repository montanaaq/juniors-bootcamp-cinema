import { AUTHORIZATION_TOKEN } from '@/constants'
import { NextRequest, NextResponse } from 'next/server'

import { getApiUsersSession } from '@generated/api'

const isAuthenticated = async (token: string) => {
  try {
    const { data } = await getApiUsersSession({
      headers: { authorization: `Bearer ${token}` }
    })
    return data.success
  } catch {
    return false
  }
}

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTHORIZATION_TOKEN)?.value

  if (!token || !(await isAuthenticated(token))) {
    const signInUrl = new URL('/signin', request.url)
    signInUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*']
}
