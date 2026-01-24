import { Col, Flex } from '@/headless/ui/Flex'
import { Backdrop } from './Backdrop'
import { Button } from './Button'

type DialogProps = {
  title: string
  description: string
  onConfirm: () => void
  onCancel?: () => void
} & OverlayProps

export function Dialog({
  title,
  description,
  onConfirm,
  onCancel,
  isOpen,
  onClose,
}: DialogProps) {
  return (
    <Backdrop isOpen={isOpen} onClose={onClose}>
      <Col
        gap={24}
        className="z-modal mx-auto w-full max-w-modal rounded-2xl bg-white p-24"
      >
        <Col gap={8}>
          <h2 className="text-center font-bold text-gray-900 text-xl">
            {title}
          </h2>
          <p className="text-center text-gray-600 text-sm">{description}</p>
        </Col>
        <Flex center gap={8}>
          <Button
            variant="secondary"
            onClick={() => {
              onCancel?.()
              onClose()
            }}
          >
            취소
          </Button>
          <Button
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            확인
          </Button>
        </Flex>
      </Col>
    </Backdrop>
  )
}
