import { Toaster } from '@/headless/Toaster'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { OverlayProvider } from 'overlay-kit'
import { Suspense } from 'react'
import FramerLazyMotionProvider from './framer-lazy-motion-provider'
import { ReactQueryProvider } from './react-query-provider'
import { Spinner } from '@/components/common/Spinner'

export function Providers({ children }: PropsWithStrictChildren) {
  return (
    <FramerLazyMotionProvider>
      <ReactQueryProvider>
        <OverlayProvider>
          <Suspense fallback={<Spinner />}>{children}</Suspense>
          <Toaster />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </OverlayProvider>
      </ReactQueryProvider>
    </FramerLazyMotionProvider>
  )
}
