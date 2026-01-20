import { useQueryParams } from '@/hooks/use-query-params-react'
import { cn } from '@/utils/cn'
import { IconButton } from './icon/Icon'
import { Flex } from './ui/Flex'
import { List } from './ui/List'
import { Text } from './ui/Text'

/**
 * total
 */

type PaginationProps = {
  total: number
  dataCount: number
  pageGroupSize?: number
  currentPage?: number
  onPageChange?: (page: number) => void
}

export function Pagination({
  total,
  dataCount,
  pageGroupSize = 5,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const { setParams, query } = useQueryParams<{
    page: number
  }>({
    page: currentPage ?? 1,
  })

  const page = currentPage ?? query.page

  const totalPages = Math.ceil(total / dataCount)

  const pages = (() => {
    const groupStart =
      Math.floor((page - 1) / pageGroupSize) * pageGroupSize + 1
    const groupEnd = Math.min(groupStart + pageGroupSize - 1, totalPages)

    const pages = Array.from(
      { length: groupEnd - groupStart + 1 },
      (_, i) => groupStart + i,
    )

    return pages
  })()

  const __onPageChange = (page: number) => {
    setParams({ page })
    onPageChange?.(page)

    const main = document.getElementById('main')
    main?.scrollTo({ top: 0 })
  }

  return (
    <Flex center gap={8}>
      <IconButton
        name="Alert"
        size={16}
        className="size-40 rounded-[8px] bg-white text-gray-600"
        disabled={page === 1}
        onClick={() => __onPageChange(page - 1)}
      />
      <List
        data={pages}
        renderItem={(page) => (
          <Flex
            key={page}
            as="button"
            center
            className={cn('size-40 rounded-[8px] bg-white', {
              'bg-brand-50': query.page === page,
            })}
            onClick={() => __onPageChange(page)}
          >
            <Text
              variant="14-md"
              className={cn('text-gray-600', {
                'text-brand-500': query.page === page,
              })}
            >
              {page}
            </Text>
          </Flex>
        )}
        gap={8}
        direction="row"
      />
      <IconButton
        name="Alert"
        size={16}
        className="size-40 rounded-[8px] bg-white text-gray-600"
        disabled={page === totalPages}
        onClick={() => __onPageChange(page + 1)}
      />
    </Flex>
  )
}
