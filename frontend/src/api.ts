import { Api } from 'api'
import BrowserCookies from 'js-cookie'

async function customFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  // if (typeof window !== 'undefined') {
  //   const response = await fetch(input, init)
  //   const accessToken = BrowserCookies.get('accessToken')

  //   if (response.status === 401) {
  //   }
  // }
  return await fetch(input, init)
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
      credentials: 'include',
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
