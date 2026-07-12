'use client'

import type { ReactNode } from 'react'

import { IntlProvider } from 'react-intl'

import type { User } from '@generated/api'

import { ThemeProvider } from './theme/ThemeProvider'
import { UserProvider } from './user/UserProvider'

interface ProvidersProps {
  children: ReactNode
  user: User | null
  defaultLocale: string
  locale: string
  messages: Record<string, string>
}

export const Providers = ({ children, user, defaultLocale, locale, messages }: ProvidersProps) => {
  return (
    <UserProvider defaultUser={user}>
      <IntlProvider defaultLocale={defaultLocale} locale={locale} messages={messages}>
        <ThemeProvider>{children}</ThemeProvider>
      </IntlProvider>
    </UserProvider>
  )
}
