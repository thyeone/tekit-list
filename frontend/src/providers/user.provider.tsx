import { deleteToken, TOKEN_KEYS } from '@/utils/cookie'
import { createSafeContext } from '@/utils/create-safe-context'
import type { ProviderEnum } from 'api'
import { decodeJwt } from 'jose'
import BrowserCookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'

type UserContext = {
  user?: User
  sync: VoidFunction
  logout: VoidFunction
}

type User = {
  id: string
  type: 'access' | 'refresh'
  provider: ProviderEnum
  exp?: string
  iat?: string
}

const [Provider, useUser] = createSafeContext<UserContext>('UserContext')

export { useUser }

export function UserProvider({ children }: PropsWithStrictChildren) {
  const [user, setUser] = useState<User | undefined>(undefined)

  const sync = useCallback(() => {
    const token = BrowserCookies.get(TOKEN_KEYS.ACCESS_TOKEN)
    if (!token) {
      return
    }
    const user: User = decodeJwt(token)

    if (user) {
      setUser(user)
    }
  }, [])

  const logout = useCallback(() => {
    deleteToken()
    setUser(undefined)
  }, [])

  console.log(user, 'user')

  useEffect(() => {
    sync()
  }, [sync])

  return <Provider value={{ user, sync, logout }}>{children}</Provider>
}
