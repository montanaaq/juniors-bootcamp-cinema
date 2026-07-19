import fetches from '@siberiacancode/fetches'

const baseURL = typeof window === 'undefined' ? process.env.BACKEND_URL : ''

export const instance = fetches.create({ baseURL })

instance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)
