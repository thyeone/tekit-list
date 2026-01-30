import { IconButton } from '@/headless/icon/Icon'
import { Flex, type FlexProps } from '@/headless/ui/Flex'
import { Spacing } from '@/headless/ui/Spacing'
import { cn } from '@/utils/cn'
import { useRouter } from '@tanstack/react-router'

export function Header({ className, ...rest }: FlexProps) {
  return (
    <Flex
      as="header"
      className={cn(
        'fixed inset-x-0 top-0 z-header mx-auto h-52 w-full max-w-base bg-white px-20',
        className,
      )}
      {...rest}
    />
  )
}

Header.Left = ({ children, ...rest }: FlexProps) => {
  return (
    <Flex className={cn('mr-auto')} {...rest}>
      {children}
    </Flex>
  )
}

Header.Center = ({ children, ...rest }: FlexProps) => {
  return (
    <Flex
      center
      className={cn(
        'absolute inset-x-0 -z-10 h-full text-center font-bold text-lg',
      )}
      {...rest}
    >
      {children}
    </Flex>
  )
}

Header.Right = ({ children, ...rest }: FlexProps) => {
  return (
    <Flex align="center" className={cn('ml-auto')} {...rest}>
      {children}
    </Flex>
  )
}

Header.Back = ({ onClick }: { onClick?: VoidFunction }) => {
  const router = useRouter()

  return (
    <Header.Left>
      <IconButton
        name="ChevronLeft"
        size={24}
        onClick={() => {
          if (onClick) {
            onClick()
          } else {
            router.history.back()
          }
        }}
      />
    </Header.Left>
  )
}

Header.Spacing = () => {
  return <Spacing size={52} />
}
