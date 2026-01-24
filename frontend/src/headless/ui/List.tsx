import { Divider } from '@/headless/ui/Divider'
import { Flex, type FlexProps } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'
import { Fragment } from 'react'

type ListProps<T> = Omit<FlexProps, 'children'> & {
  data: T[]
  renderItem: (data: T, index: number) => React.ReactNode
  renderEmpty?: () => React.ReactNode
  direction?: 'row' | 'col'
  className?: string
  nonEmptyClassName?: string
  divider?: React.ReactNode
  dividerOptions?: React.ComponentProps<typeof Divider>
  hasDivider?: boolean
  bottomElement?: React.ReactNode
}

export function List<T>({
  data,
  renderItem,
  renderEmpty,
  direction = 'col',
  className,
  nonEmptyClassName,
  divider,
  dividerOptions,
  hasDivider,
  bottomElement,
  ...props
}: ListProps<T>) {
  return (
    <Flex
      direction={direction}
      className={cn(className, {
        [nonEmptyClassName || '']: data.length,
      })}
      {...props}
    >
      {data.length === 0
        ? renderEmpty?.()
        : data.map((item, index) => {
            return (
              <Fragment key={index}>
                {renderItem(item, index)}
                {renderItem(item, index) &&
                  hasDivider &&
                  index !== data.length - 1 &&
                  (divider || <Divider {...dividerOptions} />)}
              </Fragment>
            )
          })}
      {bottomElement}
    </Flex>
  )
}
