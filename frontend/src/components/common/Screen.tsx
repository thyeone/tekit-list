import { Box } from '@/headless/ui/Box'
import { Col, Flex } from '@/headless/ui/Flex'
import { Spacing } from '@/headless/ui/Spacing'
import { cn } from '@/utils/cn'
import { Header } from './Header'

type ScreenProps = {
  className?: string
  header?: React.ReactNode
  bottomFixedButton?: React.ReactNode
  onSubmit?: VoidFunction
  bottomSpacing?: number
}

export function Screen({
  children,
  className,
  bottomFixedButton,
  header,
  bottomSpacing = 48,
  onSubmit,
}: PropsWithStrictChildren<ScreenProps>) {
  return (
    <Col
      as={onSubmit ? 'form' : 'main'}
      onSubmit={onSubmit}
      className={cn('min-h-dvh w-full bg-gray-50 px-16', className)}
    >
      {header}
      <Header.Spacing />
      {children}
      {bottomFixedButton && (
        <Flex
          center
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto max-w-mobile pt-10 pb-20"
        >
          <Box className="pointer-events-auto">{bottomFixedButton}</Box>
        </Flex>
      )}
      {bottomSpacing && <Spacing size={bottomSpacing} />}
    </Col>
  )
}
