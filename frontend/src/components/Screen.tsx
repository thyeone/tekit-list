import { Col } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'

export function Screen({
  children,
  className,
}: PropsWithStrictChildren<{ className?: string }>) {
  return (
    <Col as="main" className={cn('min-h-dvh w-full px-16', className)}>
      {children}
    </Col>
  )
}
