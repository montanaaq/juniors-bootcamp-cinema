'use client'

import type { ReactNode } from 'react'

import { useState } from 'react'

import type { User } from '@generated/api'

import { UserContext } from './UserContext'

export function UserProvider({
  children,
  defaultUser
}: {
  children: ReactNode
  defaultUser: User | null
}) {
  const [user, setUser] = useState<User | null>(defaultUser)

  return <UserContext value={{ user, setUser }}>{children}</UserContext>
}
