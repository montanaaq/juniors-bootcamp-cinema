import type { Metadata } from 'next'

import './globals.css'
import type { ReactNode } from 'react'

import { AUTHORIZATION_TOKEN, THEME_STORAGE_KEY } from '@/src/constants'
import { Providers } from '@/src/contexts/Providers'
import { parseThemeCookie, resolveTheme } from '@/src/contexts/theme/utils'
import i18n from '@/src/i18n/messages.json'
import { cn } from '@/src/lib/utils'
import { Nunito, Pixelify_Sans } from 'next/font/google'
import { cookies } from 'next/headers'

import { getApiUsersSession } from '@generated/api'

import { Footer } from './_components/layout/Footer/Footer'
import Header from './_components/layout/Header/Header'

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
  title: 'Juniors Bootcamp Cinema',
  description: 'Online cinema for juniorsbootcamp.ru'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTHORIZATION_TOKEN)?.value
  const initialTheme = parseThemeCookie(cookieStore.get(THEME_STORAGE_KEY)?.value)

  const user = token
    ? await getApiUsersSession({ headers: { authorization: `Bearer ${token}` } })
        .then(response => (response.data.success ? response.data.user : null))
        .catch(() => null)
    : null

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
      <body className="flex flex-1 flex-col px-4 py-8 sm:px-8 lg:px-16 lg:py-12 xl:px-30 xl:py-16">
        <Providers
          user={user}
          defaultLocale={locale}
          locale={locale}
          messages={i18n.messages[locale]}
        >
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
