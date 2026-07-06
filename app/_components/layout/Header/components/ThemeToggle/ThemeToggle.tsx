'use client'

import type { MouseEvent } from 'react'

import { IconButton } from '@/components/ui'
import { MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from '@app/_contexts/theme'

export const ThemeToggle = () => {
  const { animate, value } = useTheme()
  const nextTheme = value === 'dark' ? 'light' : 'dark'
  const label = value === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'
  const Icon = value === 'dark' ? SunIcon : MoonIcon

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    animate(event.clientX, event.clientY, nextTheme)
  }

  return (
    <IconButton aria-label={label} onClick={toggleTheme} rounded type="button" variant="secondary">
      <Icon size={16} />
    </IconButton>
  )
}
