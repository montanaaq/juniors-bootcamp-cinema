import { createContext } from 'react'

export type Theme = 'dark' | 'light' | 'system'

export interface ThemeContextValue {
  theme: Theme
  value: Exclude<Theme, 'system'>
  animate: (x: number, y: number, theme: Theme) => Promise<void>
  set: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  value: 'light',
  set: () => {},
  animate: async () => {}
})
