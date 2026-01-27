import { api } from '@/api'
import { queryOptions } from '@tanstack/react-query'
import type { BucketListParams } from 'api'
import { bucketKeys } from './keys'

export const bucketQueries = {
  list: (params: BucketListParams) =>
    queryOptions({
      queryKey: bucketKeys.list.__list(params),
      queryFn: () => api().bucket.bucketList(params),
    }),

  count: () =>
    queryOptions({
      queryKey: bucketKeys.count(),
      queryFn: () => api().bucket.countList(),
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: bucketKeys.detail(id),
      queryFn: () => api().bucket.bucketDetail({ id }),
      enabled: !!id,
    }),
}
