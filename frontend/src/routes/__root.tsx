import { Box } from '@/headless/ui/Box'
import { createRootRoute, Outlet } from '@tanstack/react-router'

function Layout() {
  return (
    <Box className="mx-auto w-full max-w-base">
      <Outlet />
    </Box>
  )
}

export const Route = createRootRoute({
  component: Layout,
})
