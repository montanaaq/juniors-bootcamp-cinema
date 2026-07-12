'use client'

import type { Theme } from './ThemeContext'
import type { ReactNode } from 'react'

import { useLocalStorage, usePreferredColorScheme } from '@siberiacancode/reactuse'
import { useLayoutEffect, useMemo, useState } from 'react'

import { ThemeContext } from './ThemeContext'

const THEME_STORAGE_KEY = 'theme'

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
  const [mounted, setMounted] = useState(false)
  const colorScheme = usePreferredColorScheme()
  const themeStorage = useLocalStorage<Theme>(THEME_STORAGE_KEY, 'system')
  const theme = themeStorage.value ?? 'system'
  const activeTheme = mounted ? getTheme(theme) : 'light'
  const setTheme = (theme: Theme) => {
    themeStorage.set(theme)
  }

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useLayoutEffect(() => {
    if (!mounted) return

    const root = document.documentElement

    root.classList.remove('light', 'dark')
    root.classList.add(activeTheme)
  }, [mounted, activeTheme, colorScheme])

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
