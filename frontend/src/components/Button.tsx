import { Flex, type FlexProps } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'

type ButtonProps<C extends React.ElementType = 'button'> = Omit<
  FlexProps<C>,
  'as'
> & {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

export function Button<C extends React.ElementType = 'button'>({
  className,
  link,
  ...props
}: ButtonProps<C>) {
  const { disabled, ...rest } = props
  return (
    <Flex
      as="button"
      center
      gap={8}
      className={cn(
        'rounded-full bg-primary px-16 py-10 font-semibold text-base text-white transition-all hover:opacity-80 active:scale-95 disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
