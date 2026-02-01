import { api } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type {
  BucketUpdateParams,
  CompletePartialUpdateParams,
  IBucketCreate,
} from 'api'
import { bucketKeys } from './keys'

export const bucketMutations = {
  complete: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (params: CompletePartialUpdateParams) =>
        api().bucket.completePartialUpdate(params),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: bucketKeys.count(),
        })
        queryClient.invalidateQueries({
          queryKey: bucketKeys.list.all(),
        })
      },
    })
  },

  create: () => {
    return useMutation({
      mutationFn: (params: IBucketCreate) => api().bucket.bucketCreate(params),
    })
  },

  update: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: ({ id, ...params }: BucketUpdateParams & IBucketCreate) =>
        api().bucket.bucketUpdate({ id }, params),
      onSuccess: ({ id }) => {
        queryClient.refetchQueries({ queryKey: bucketKeys.detail(id) })
      },
    })
  },
}
