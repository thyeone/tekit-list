import { Dim } from '@/headless/Dim'
import { AnimatePortal } from '@/headless/overlay/AnimatePortal'
import { Col } from '@/headless/ui/Flex'
import { motion } from 'framer-motion'

const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export function Backdrop({
  isOpen,
  onClose,
  children,
}: PropsWithStrictChildren<OverlayProps>) {
  return (
    <AnimatePortal isOpen={isOpen}>
      <Col
        center
        component={motion.div}
        {...fadeInOut}
        className="fixed inset-0 z-modal mx-auto max-w-modal px-16"
      >
        <Dim onClick={onClose} />
        {children}
      </Col>
    </AnimatePortal>
  )
}
