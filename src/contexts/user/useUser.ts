import { use } from 'react'

import { UserContext } from './UserContext'

export function useUser() {
  return use(UserContext)
}
