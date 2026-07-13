'use client'

import { signOutAction } from '@/src/contexts/user/actions'
import { useUser } from '@/src/contexts/user/useUser'
import { useIsomorphicLayoutEffect } from '@siberiacancode/reactuse'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {
  const { user, setUser } = useUser()
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    if (!user) router.replace('/signin')
  }, [user])

  if (!user) return null

  const handleSignOut = async () => {
    await signOutAction()
    setUser(null)
    router.push('/signin')
  }

  return (
    <section className="mx-auto max-w-sm py-16 flex flex-col gap-6">
      <h1 className="font-bold text-2xl">Профиль</h1>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-muted-fg">Телефон</span>
        <span className="text-lg">{user.phone}</span>
      </div>
      <button
        type="button"
        onClick={handleSignOut}
        className="text-sm text-danger underline self-start"
      >
        Выйти
      </button>
    </section>
  )
}

export default ProfilePage
