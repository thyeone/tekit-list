import { api } from '@/api'
import { queryOptions } from '@tanstack/react-query'
import type { BucketListParams } from 'api'
import { bucketKeys } from './keys'

export const bucketQueries = {
  list: (params: BucketListParams) =>
    queryOptions({
      queryKey: bucketKeys.list(),
      queryFn: () => api().bucket.bucketList(params),
    }),
}
