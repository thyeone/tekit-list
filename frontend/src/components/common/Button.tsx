import { Flex, type FlexProps } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'
import { Spinner } from './Spinner'

type ButtonProps<C extends React.ElementType = 'button'> = {
  size?: 'sm' | 'lg'
  variant?: 'primary' | 'secondary' | 'warning' | 'kakao'
  isLoading?: boolean
} & FlexProps<C>

export function Button<C extends React.ElementType = 'button'>({
  as,
  className,
  variant,
  size = 'lg',
  isLoading = false,
  children,
  ...props
}: ButtonProps<C>) {
  const { disabled, ...rest } = props

  return (
    <Flex
      as={as ?? 'button'}
      center
      disabled={isLoading || disabled}
      gap={8}
      className={cn(
        'w-full rounded-[12px] bg-primary px-24 py-10 font-semibold text-lg text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50',
        {
          'mx-auto w-fit': size === 'sm',
          'w-full': size === 'lg',
          'bg-grey-100 text-grey-900': variant === 'secondary',
          'bg-red-500 text-white': variant === 'warning',
          'bg-[#FEE500] text-[#000000] hover:bg-[#FDD835]': variant === 'kakao',
          'opacity-50': isLoading,
        },
        className,
      )}
      {...props}
    >
      {isLoading && <Spinner />}
      {children}
    </Flex>
  )
}
