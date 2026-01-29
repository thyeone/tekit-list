import { getBrowserCookies } from '@/utils/cookie'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import BrowserCookies from 'js-cookie'
import { useEffect, useEffectEvent } from 'react'

type TokenResponse = {
  accessToken: string
  refreshToken: string
}

export const Route = createFileRoute('/auth/callback')({
  component: Callback,
})

function Callback() {
  const router = useRouter()

  const handleLogin = useEffectEvent(async () => {
    const token = getBrowserCookies()['auth-response']

    const tokens = JSON.parse(token) as TokenResponse

    console.log(tokens)

    if (tokens) {
      BrowserCookies.set('accessToken', tokens.accessToken, {
        expires: 7,
        path: '/',
      })
      BrowserCookies.set('refreshToken', tokens.refreshToken, {
        expires: 7,
        path: '/',
      })
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
