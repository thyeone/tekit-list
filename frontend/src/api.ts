import { Api } from 'api'

function customFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  return fetch(input, init)
}

let instance: Api<unknown> | null = null

/**
 * 토큰 로직 추가 필요
 */
export function api(): Api<unknown> {
  if (instance) {
    return instance
  }

  const __instance = new Api({
    baseUrl: process.env.EXPO_PUBLIC_API_HOST,
    baseApiParams: {
      format: 'json',
      secure: true,
      cache: 'no-store',
    },
    customFetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await customFetch(input, init)
      return response
    },
    // securityWorker: async () => {
    //   const accessToken = await getToken('accessToken')
    //   if (accessToken) {
    //     return {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   }
    //   return {}
    // },
  })

  instance = __instance

  return instance
}
