'use client'

import type { Dispatch, SetStateAction } from 'react'

import { createContext } from 'react'

import type { User } from '@generated/api'

export interface UserContextValue {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextValue>(null!)
