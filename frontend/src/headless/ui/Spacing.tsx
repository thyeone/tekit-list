import { cn } from '@/utils/cn'
import { memo } from 'react'

type SpacingProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: never
  direction?: 'horizontal' | 'vertical'
  size: number
}

export const Spacing = memo(function Spacing({
  direction = 'vertical',
  size,
  className,
  ...props
}: SpacingProps) {
  return (
    <div
      className={cn('flex-none', className)}
      style={{
        [direction === 'vertical' ? 'height' : 'width']: size + 'px',
      }}
      {...props}
    />
  )
})
