'use client'

import type { Theme } from './ThemeContext'
import type { ReactNode } from 'react'

import { THEME_STORAGE_KEY } from '@/constants'
import { getCookie, setCookie, usePreferredColorScheme } from '@siberiacancode/reactuse'
import { useLayoutEffect, useMemo, useState } from 'react'

import { ThemeContext } from './ThemeContext'

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getTheme = (theme: Theme): 'dark' | 'light' => {
  if (theme === 'system') return getSystemTheme()
  return theme
}

export interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = usePreferredColorScheme()

  const [theme, setTheme] = useState<Theme>('system')
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('light')

  useLayoutEffect(() => {
    const storedTheme = (getCookie(THEME_STORAGE_KEY) as Theme | undefined) ?? 'system'
    setTheme(storedTheme)
    setActiveTheme(getTheme(storedTheme))
  }, [])

  useLayoutEffect(() => {
    const root = document.documentElement
    const nextActiveTheme = getTheme(theme)

    setActiveTheme(nextActiveTheme)
    setCookie(THEME_STORAGE_KEY, theme, { path: '/' })

    root.classList.remove('light', 'dark')
    root.classList.add(nextActiveTheme)
  }, [theme, colorScheme])

  const animate = async (x: number, y: number, theme: Theme) => {
    if (!document.startViewTransition) {
      setTheme(theme)
      return
    }

    const radius = Math.hypot(window.innerWidth, window.innerHeight)

    await document.startViewTransition(() => {
      setTheme(theme)
    }).ready

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  }

  const value = useMemo(
    () => ({ theme, value: activeTheme, set: setTheme, animate }),
    [theme, activeTheme]
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
