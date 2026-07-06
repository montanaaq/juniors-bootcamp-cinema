'use client'

import type { ReactNode } from 'react'

import { IntlProvider } from 'react-intl'

import { ThemeProvider } from './theme/ThemeProvider'

type ProvidersProps = {
  children: ReactNode
  defaultLocale: string
  locale: string
  messages: Record<string, string>
}

export const Providers = ({ children, defaultLocale, locale, messages }: ProvidersProps) => {
  return (
    <IntlProvider defaultLocale={defaultLocale} locale={locale} messages={messages}>
      <ThemeProvider>{children}</ThemeProvider>
    </IntlProvider>
  )
}
