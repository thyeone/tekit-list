import { Flex } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

export function Label({ className, required, ...rest }: LabelProps) {
  return (
    <Flex gap={4} className={cn('relative mb-4')}>
      <label
        className={cn('mb-4 font-medium text-[14px] text-grey-900', className)}
        {...rest}
      />
      {required && <span className="text-red">*</span>}
    </Flex>
  )
}
