import { api } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { IUserUpdate } from 'api'
import { userKeys } from './keys'

export const userMutations = {
  updateProfile: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (params: IUserUpdate) => api().user.updateProfile(params),
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: userKeys.me(),
        })
      },
    })
  },
}
