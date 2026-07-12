import { AUTHORIZATION_TOKEN } from '@/constants'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

async function proxy(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString()
  const targetUrl = new URL(request.nextUrl.pathname, process.env.BACKEND_URL)
  targetUrl.search = searchParams

  const headers = new Headers(request.headers)
  headers.delete('host')

  const cookieStore = await cookies()
  const token = cookieStore.get(AUTHORIZATION_TOKEN)?.value
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const fetchOptions: RequestInit & { duplex?: 'half' } = {
    method: request.method,
    headers,
    redirect: 'manual'
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    fetchOptions.body = request.body
    fetchOptions.duplex = 'half'
  }

  try {
    const response = await fetch(targetUrl, fetchOptions)

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers(response.headers)
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Bad Gateway' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const GET = proxy
export const POST = proxy
export const PUT = proxy
export const PATCH = proxy
export const DELETE = proxy
export const OPTIONS = proxy
