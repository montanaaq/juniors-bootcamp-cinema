import type { Metadata } from 'next'

import './globals.css'
import type { ReactNode } from 'react'

import { AUTHORIZATION_TOKEN, THEME_STORAGE_KEY } from '@/constants'
import { Providers } from '@/contexts/Providers'
import { parseThemeCookie, resolveTheme } from '@/contexts/theme/utils'
import i18n from '@/i18n/messages.json'
import { getSessionUser } from '@/lib'
import { cn } from '@/lib/utils'
import { Nunito, Pixelify_Sans } from 'next/font/google'
import { cookies } from 'next/headers'

const locale = i18n.defaultLocale as keyof typeof i18n.messages

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin', 'cyrillic']
})

const pixelifySans = Pixelify_Sans({
  variable: '--font-pixelify-sans',
  subsets: ['latin', 'cyrillic']
})

export const metadata: Metadata = {
  title: {
    default: 'Juniors Bootcamp Cinema',
    template: '%s — Juniors Bootcamp Cinema'
  },
  description: 'Онлайн-кинотеатр для juniorsbootcamp.ru',
  robots: {
    index: false,
    follow: false
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTHORIZATION_TOKEN)?.value
  const initialTheme = parseThemeCookie(cookieStore.get(THEME_STORAGE_KEY)?.value)

  const user = token ? await getSessionUser(token) : null

  return (
    <html
      lang="ru"
      className={cn(
        'h-full',
        'antialiased',
        nunito.variable,
        pixelifySans.variable,
        'font-sans',
        resolveTheme(initialTheme)
      )}
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <meta content="noindex, nofollow" name="robots" />
      </head>
      <body className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col px-4 py-8 sm:px-8 lg:px-16 lg:py-12 xl:px-30 xl:py-16">
          <Providers
            user={user}
            defaultLocale={locale}
            locale={locale}
            messages={i18n.messages[locale]}
          >
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
