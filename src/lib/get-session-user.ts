import { getApiUsersSession, type User } from '@generated/api'

export const getSessionUser = async (token: string): Promise<User | null> => {
  try {
    const { data } = await getApiUsersSession({
      headers: { authorization: `Bearer ${token}` }
    })

    return data.success ? data.user : null
  } catch {
    return null
  }
}
