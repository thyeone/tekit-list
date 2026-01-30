import { useUser } from '@/providers/user.provider'
import { getBrowserCookies } from '@/utils/cookie'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import type { ProviderEnum } from 'api'
import BrowserCookies from 'js-cookie'
import { useEffect, useEffectEvent } from 'react'

type TokenResponse = {
  oAuthProvider: ProviderEnum
  oAuthId: string
  accessToken: string
  accessTokenExpiresInMilliseconds: number
  refreshToken: string
  refreshTokenExpiresInMilliseconds: number
}

export const Route = createFileRoute('/auth/callback')({
  component: Callback,
})

function Callback() {
  const router = useRouter()
  const user = useUser()

  const handleLogin = useEffectEvent(async () => {
    const authResponse = getBrowserCookies()['auth-response']

    const token = JSON.parse(authResponse) as TokenResponse

    if (token) {
      BrowserCookies.set('accessToken', token.accessToken, {
        expires: new Date(Date.now() + token.accessTokenExpiresInMilliseconds),
      })
      BrowserCookies.set('refreshToken', token.refreshToken, {
        expires: new Date(Date.now() + token.refreshTokenExpiresInMilliseconds),
      })

      user.sync()

      router.navigate({ to: '/', replace: true })
    } else {
      router.history.back()
    }
  })

  useEffect(() => {
    handleLogin()
  }, [handleLogin])

  return null
}
