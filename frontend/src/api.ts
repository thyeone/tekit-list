import { redirect } from '@tanstack/react-router'
import { Api } from 'api'
import BrowserCookies from 'js-cookie'

async function customFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(input, init)

  const originalToken = BrowserCookies.get('refreshToken')

  if (typeof window !== 'undefined') {
    if (response.status === 401 && originalToken) {
      try {
        const { token, expiresInMilliseconds } = await api().auth.getToken({
          headers: {
            Authorization: `Bearer ${originalToken}`,
          },
        })

        BrowserCookies.set('accessToken', token, {
          expires: new Date(Date.now() + expiresInMilliseconds!),
        })

        return fetch(input, {
          ...init,
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch {
        throw redirect({
          to: '/auth/login',
        })
      }
    }
  }

  return response
}

type ApiInstance<T = unknown> = Omit<
  Api<T>,
  'abortRequest' | 'baseUrl' | 'request' | 'setSecurityData'
>

let instance: ApiInstance | null = null

/**
 * 토큰 로직 추가 필요
 */
export function api<T>(): ApiInstance<T> {
  if (instance) {
    return instance
  }

  const __instance = new Api<T>({
    baseUrl: import.meta.env.VITE_API_HOST,
    baseApiParams: {
      format: 'json',
      secure: true,
      cache: 'no-store',
    },
    customFetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await customFetch(input, init)
      return response
    },
    securityWorker: async () => {
      const accessToken = BrowserCookies.get('accessToken')
      if (accessToken) {
        return {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      }
      return {}
    },
  })

  instance = __instance

  return instance
}
