export const bucketKeys = {
  all: ['bucket'] as const,
  list: () => [...bucketKeys.all, 'list'] as const,
  detail: (id: number) => [...bucketKeys.all, 'detail', id] as const,
} as const
