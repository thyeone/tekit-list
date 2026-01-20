import { Box } from '@/headless/ui/Box'
import { Providers } from '@/providers/Providers'
import { createRootRoute, Outlet } from '@tanstack/react-router'

function Layout() {
  return (
    <Providers>
      <Box className="mx-auto w-full max-w-base">
        <Outlet />
      </Box>
    </Providers>
  )
}

export const Route = createRootRoute({
  component: Layout,
})
