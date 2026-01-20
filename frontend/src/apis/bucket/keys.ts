export const bucketKeys = {
  all: ['bucket'] as const,
  list: () => [...bucketKeys.all, 'list'] as const,
}
