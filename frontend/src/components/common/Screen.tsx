import { Box } from '@/headless/ui/Box'
import { Col, Flex } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'

type ScreenProps = {
  className?: string
  innerClassName?: string
  header?: React.ReactNode
  bottomFixedButton?: React.ReactNode
  onSubmit?: VoidFunction
}

export function Screen({
  children,
  className,
  innerClassName,
  bottomFixedButton,
  header,
  onSubmit,
}: PropsWithStrictChildren<ScreenProps>) {
  return (
    <Col
      as={onSubmit ? 'form' : 'main'}
      onSubmit={onSubmit}
      className={cn('min-h-dvh w-full bg-gray-50', className)}
    >
      {header}
      <Col className={cn('px-16', innerClassName)}>{children}</Col>
      {bottomFixedButton && (
        <Flex
          center
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto max-w-mobile pt-10 pb-20"
        >
          <Box className="pointer-events-auto">{bottomFixedButton}</Box>
        </Flex>
      )}
    </Col>
  )
}
