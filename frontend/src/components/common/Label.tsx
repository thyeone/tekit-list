import { cn } from '@/utils/cn'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className, ...rest }: LabelProps) {
  return (
    <label
      className={cn('mb-4 font-medium text-[14px] text-grey-900', className)}
      {...rest}
    />
  )
}
