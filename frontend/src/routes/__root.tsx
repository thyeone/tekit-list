import { Box } from '@/headless/ui/Box'
import { Providers } from '@/providers/Providers'
import type { queryClient } from '@/providers/react-query-provider'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

function Layout() {
  return (
    <Providers>
      <Box className="mx-auto w-full max-w-base text-gray-950">
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </Providers>
  )
}

type RouterContext = {
  queryClient: typeof queryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Layout,
})
