import { AsyncBoundary } from '@/headless/async-boundary'
import { Toaster } from '@/headless/Toaster'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { OverlayProvider } from 'overlay-kit'
import FramerLazyMotionProvider from './framer-lazy-motion-provider'
import { ReactQueryProvider } from './react-query-provider'

export function Providers({ children }: PropsWithStrictChildren) {
  return (
    <FramerLazyMotionProvider>
      <ReactQueryProvider>
        <AsyncBoundary>
          <OverlayProvider>
            {children}
            <Toaster />
            <ReactQueryDevtools buttonPosition="bottom-left" />
          </OverlayProvider>
        </AsyncBoundary>
      </ReactQueryProvider>
    </FramerLazyMotionProvider>
  )
}
