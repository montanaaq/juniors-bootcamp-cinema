import type { ActiveTheme, Theme } from '../ThemeContext'

export const getSystemTheme = (): ActiveTheme => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const resolveTheme = (theme: Theme): ActiveTheme => {
  if (theme === 'system') return getSystemTheme()
  return theme
}

export const parseThemeCookie = (raw: string | undefined): Theme => {
  if (!raw) return 'system'
  const ALLOWED_THEMES = new Set<Theme>(['dark', 'light', 'system'])

  try {
    const parsed = JSON.parse(raw)
    if (parsed in ALLOWED_THEMES) return parsed
  } catch {
    if (raw === 'dark' || raw === 'light' || raw === 'system') return raw
  }

  return 'system'
}
