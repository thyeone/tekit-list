import { createSafeContext } from '@/headless//create-safe-context'
import { Box, type BoxProps } from '@/headless/ui/Box'
import { Flex, type FlexProps } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'

type TableHeader = { title: string; width: number }

type TableContextValue = {
  tableHeader: TableHeader[]
}

type TableProps = BoxProps<'table'> & {
  tableHeader: TableHeader[]
}

const [TableContextProvider, useTableContext] =
  createSafeContext<TableContextValue>('TableContext')

function Root({ tableHeader, className, ...props }: TableProps) {
  return (
    <TableContextProvider value={{ tableHeader }}>
      <Box className="w-full">
        <Box className="max-h-[calc(100vh-360px)] overflow-y-auto">
          <Box
            as="table"
            className="w-full table-fixed border-collapse"
            {...props}
          />
        </Box>
      </Box>
    </TableContextProvider>
  )
}

function Header() {
  const { tableHeader } = useTableContext()

  return (
    <Flex
      as="thead"
      className="sticky top-0 h-41 w-full border-grey-100 border-y"
    >
      {tableHeader.map(({ title, width }, index) => (
        <Flex
          key={index}
          as="th"
          center
          style={{ flexBasis: width }}
          className={cn(
            'h-full grow border-gray-100 border-r bg-grey-50 px-10 py-12 font-semibold text-[15px] text-grey-400',
            {
              'border-grey-100 border-r': index !== tableHeader.length - 1,
            },
          )}
        >
          {title}
        </Flex>
      ))}
    </Flex>
  )
}

function Body({ className, ...props }: BoxProps<'tbody'>) {
  return (
    <Box
      as="tbody"
      {...props}
      className={cn('w-full overflow-hidden', className)}
    />
  )
}

function Row({ className, ...props }: FlexProps<'tr'>) {
  return (
    <Flex
      as="tr"
      {...props}
      className={cn('h-46 w-full border-grey-100 border-b', className)}
    />
  )
}

function Cell({ className, ...props }: FlexProps<'td'> & { index: number }) {
  const { tableHeader } = useTableContext()

  return (
    <Flex
      as="td"
      className={cn(
        'h-full grow px-10 py-12 text-[15px] text-grey-800',
        {
          'border-grey-100 border-r': props.index !== tableHeader.length - 1,
        },
        className,
      )}
      style={{
        flexBasis: tableHeader?.[props.index]?.width,
        ...props.style,
      }}
      {...props}
    />
  )
}

export const Table = {
  Root,
  Header,
  Body,
  Row,
  Cell,
}
