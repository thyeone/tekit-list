import { Col, Flex } from '@/headless/ui/Flex'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Backdrop } from './Backdrop'
import { Button } from './Button'

type SheetProps = OverlayProps & {
  onConfirm?: () => void
}

export function Sheet({
  isOpen,
  onClose,
  children,
  onConfirm,
}: PropsWithStrictChildren<SheetProps>) {
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, 100], [1, 0.5])

  const handleDragEnd = (_: unknown, info: { offset: { y: number } }) => {
    if (info.offset.y > 100) {
      onClose()
    }
  }

  return (
    <Backdrop isOpen={isOpen} onClose={onClose}>
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.2 }}
        onDragEnd={handleDragEnd}
        style={{ y, opacity }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
        }}
        className="fixed inset-x-0 bottom-16 z-modal mx-auto w-full max-w-base px-16"
      >
        <Col className="mb-16 max-h-[85vh] w-full overflow-hidden rounded-t-3xl rounded-b-3xl bg-white px-24 pt-0 pb-24 shadow-2xl">
          <Flex center className="pt-12 pb-16">
            <div className="h-4 w-36 rounded-full bg-grey-100" />
          </Flex>
          <Col className="overflow-y-auto">{children}</Col>
          <Flex center gap={8} className="mt-8 w-full">
            <Button
              onClick={() => {
                onConfirm?.()
                onClose()
              }}
            >
              확인
            </Button>
          </Flex>
        </Col>
      </motion.div>
    </Backdrop>
  )
}
