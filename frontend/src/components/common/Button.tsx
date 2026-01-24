import { Flex, type FlexProps } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'

type ButtonProps<C extends React.ElementType = 'button'> = Omit<
  FlexProps<C>,
  'as'
> & {
  size?: 'sm' | 'lg'
  variant?: 'primary' | 'secondary' | 'warning'
}

export function Button<C extends React.ElementType = 'button'>({
  className,
  variant,
  size = 'lg',
  ...props
}: ButtonProps<C>) {
  const { disabled, ...rest } = props
  return (
    <Flex
      as="button"
      center
      gap={8}
      className={cn(
        'rounded-[12px] bg-primary px-24 py-10 font-semibold text-lg text-white transition-all hover:opacity-80 active:scale-95 disabled:opacity-50',
        {
          'mx-auto w-fit': size === 'sm',
          'bg-grey-100 text-grey-900': variant === 'secondary',
          'bg-red-500 text-white': variant === 'warning',
        },
        className,
      )}
      {...props}
    />
  )
}
