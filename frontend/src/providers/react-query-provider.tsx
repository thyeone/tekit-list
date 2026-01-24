import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export const queryClient = new QueryClient()

export function ReactQueryProvider({ children }: PropsWithStrictChildren) {
  const [__queryClient] = useState(() => queryClient)

  return (
    <QueryClientProvider client={__queryClient}>{children}</QueryClientProvider>
  )
}
