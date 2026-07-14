import type { Theme } from '../ThemeContext'

export const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const resolveTheme = (theme: Theme): 'dark' | 'light' => {
  if (theme === 'system') return getSystemTheme()
  return theme
}

export const parseThemeCookie = (raw: string | undefined): Theme => {
  if (!raw) return 'system'

  try {
    const parsed = JSON.parse(raw)
    if (parsed === 'dark' || parsed === 'light' || parsed === 'system') return parsed
  } catch {
    if (raw === 'dark' || raw === 'light' || raw === 'system') return raw
  }

  return 'system'
}
