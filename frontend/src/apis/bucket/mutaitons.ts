import { api } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CompletePartialUpdateParams } from 'api'
import { bucketKeys } from './keys'

export const bucketMutations = {
  complete: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (params: CompletePartialUpdateParams) =>
        api().bucket.completePartialUpdate(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: bucketKeys.list() })
      },
    })
  },
}
