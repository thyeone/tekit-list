import type { BucketListParams } from 'api'

export const bucketKeys = {
  all: ['bucket'] as const,
  uncompletedCount: () => [...bucketKeys.all, 'uncompletedCount'] as const,
  list: {
    all: () => [...bucketKeys.all, 'list'] as const,
    __list: (params: BucketListParams) =>
      [...bucketKeys.list.all(), params] as const,
  },
  detail: (id: number) => [...bucketKeys.all, 'detail', id] as const,
} as const
