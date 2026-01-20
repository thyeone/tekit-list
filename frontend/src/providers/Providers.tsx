import { AsyncBoundary } from '@/components/async-boundary'
import { Toaster } from '@/components/Toaster'
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
          </OverlayProvider>
        </AsyncBoundary>
      </ReactQueryProvider>
    </FramerLazyMotionProvider>
  )
}
