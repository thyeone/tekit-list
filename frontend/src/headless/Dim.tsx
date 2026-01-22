import { cn } from '@/utils/cn'
import { type HTMLMotionProps, motion } from 'framer-motion'

export function Dim({ className, ...rest }: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      className={cn('fixed inset-0 top-0 z-dim mx-auto max-w-base', className)}
      {...rest}
    />
  )
}
