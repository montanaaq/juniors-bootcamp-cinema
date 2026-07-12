import fetches from '@siberiacancode/fetches'

const baseURL = typeof window === 'undefined' ? process.env.BACKEND_URL : ''

export const instance = fetches.create({ baseURL })
