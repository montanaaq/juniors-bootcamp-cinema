import type { Metadata } from 'next'

import './globals.css'
import type { ReactNode } from 'react'

import i18n from '@/i18n/messages.json'
import { cn } from '@/lib/utils'
import { Nunito, Pixelify_Sans } from 'next/font/google'
import { IntlProvider as ReactIntlProvider } from 'react-intl'

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

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={cn('h-full', 'antialiased', nunito.variable, pixelifySans.variable, 'font-sans')}
    >
      <head>
        <link href="./images/logo.svg" rel="icon" sizes="any" />
        <meta content="noindex, nofollow" name="robots" />
      </head>
      <body className="flex flex-1 flex-col px-4 py-8 sm:px-8 lg:px-16 lg:py-12 xl:px-30 xl:py-16">
        <ReactIntlProvider defaultLocale={locale} locale={locale} messages={i18n.messages[locale]}>
          <Header />
          {children}
          <Footer />
        </ReactIntlProvider>
      </body>
    </html>
  )
}
