import BrowserCookies from 'js-cookie'

export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const

export const getBrowserCookies = () => {
  const cookies: { [key: string]: string } = document.cookie
    .split(';')
    .reduce((obj, cookie) => {
      const [k, v] = decodeURIComponent(cookie).split('=')
      // @ts-expect-error
      obj[k.trim()] = v
      return obj
    }, {})

  return cookies
}

export const deleteToken = () => {
  BrowserCookies.remove(TOKEN_KEYS.ACCESS_TOKEN)
  BrowserCookies.remove(TOKEN_KEYS.REFRESH_TOKEN)
}
