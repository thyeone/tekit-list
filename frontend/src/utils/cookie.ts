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
