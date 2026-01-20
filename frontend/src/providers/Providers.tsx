import { OverlayProvider } from 'overlay-kit'
import { AsyncBoundary } from '@/headless/async-boundary'
import { Toaster } from '@/headless/Toaster'
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
          </OverlayProvider>
        </AsyncBoundary>
      </ReactQueryProvider>
    </FramerLazyMotionProvider>
  )
}
