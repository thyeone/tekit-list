import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import BrowserCookies from 'js-cookie'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const accessToken = BrowserCookies.get('accessToken')
    const refreshToken = BrowserCookies.get('refreshToken')

    if (!accessToken || !refreshToken) {
      throw redirect({
        to: '/auth/login',
      })
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return <Outlet />
}
