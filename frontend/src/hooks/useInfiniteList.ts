import {
  keepPreviousData,
  type QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { useMemo } from 'react'
import { useIntersect } from './useIntersect'

type PaginationRO<T> = {
  nextCursor?: number
  rows: T[]
  hasNext?: boolean
  total: number
}

type Params = {
  cursor?: number | string
}

type Options<T, P = Params> = {
  key: (params: P) => QueryKey
  fn: (params: P) => Promise<PaginationRO<T>>
  params: P
  enabled?: boolean
}

export const useInfiniteList = <T, P extends Params = Params>({
  key,
  fn,
  params,
  enabled,
}: Options<T, P>) => {
  const query = useInfiniteQuery<PaginationRO<T>>({
    queryKey: key(params),
    queryFn: ({ pageParam }) => {
      const cursor = pageParam as string | number | undefined

      return fn({ ...params, cursor })
    },
    gcTime: 0,
    enabled: enabled,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined
    },
    refetchOnWindowFocus: false,
    refetchInterval: 0,
    refetchOnMount: true,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
  })

  const rows = useMemo(() => {
    if (!query.data) return []

    return query.data.pages.flatMap((v) => v.rows) || []
  }, [query.data])

  const listBottom = useIntersect(
    () => {
      if (query.isFetching || query.isFetchingNextPage) {
        return
      }

      if (!query.hasNextPage) {
        return
      }

      query.fetchNextPage()
    },
    { rootMargin: '400px' },
  )

  return {
    rows,
    listBottom,
    total: query.data?.pages[0].total ?? 0,
    ...query,
  }
}
