'use client'

import type { MouseEvent } from 'react'

import { IconButton } from '@/components/ui'
import { useTheme } from '@/contexts/theme'
import { MoonIcon, SunIcon } from 'lucide-react'

export const ThemeToggle = () => {
  const { animate, value } = useTheme()
  const isDark = value === 'dark'
  const nextTheme = isDark ? 'light' : 'dark'
  const label = isDark ? 'Включить светлую тему' : 'Включить темную тему'
  const Icon = isDark ? SunIcon : MoonIcon

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    animate(event.clientX, event.clientY, nextTheme)
  }

  return (
    <IconButton aria-label={label} onClick={toggleTheme} rounded type="button" variant="secondary">
      <Icon size={16} />
    </IconButton>
  )
}
