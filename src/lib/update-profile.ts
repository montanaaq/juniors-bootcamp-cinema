import type { ProfileUpdateValues } from '../schemas'

import { patchApiUsersProfile, type User } from '@/generated/api'

export const updateProfile = async (phone: User['phone'], values: ProfileUpdateValues) => {
  const { ...profile } = values

  try {
    const { data } = await patchApiUsersProfile({ body: { phone, profile } })
    return data
  } catch {
    return null
  }
}
