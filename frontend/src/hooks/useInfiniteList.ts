import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useIntersect } from './useIntersect'

type PaginationRO<T> = {
  nextCursor?: number
  content?: T[]
  hasNext?: boolean
}

type Params = {
  cursor?: number | string
}

type Options<T, P = Params> = {
  key: string
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
    queryKey: [key, params],
    queryFn: ({ queryKey, pageParam }) => {
      const cursor = pageParam as string | number | undefined

      return fn({ ...(queryKey[1] as P), cursor })
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

    return query.data.pages.flatMap((v) => v.content) || []
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
    ...query,
  }
}
