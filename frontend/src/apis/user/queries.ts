import { api } from '@/api'
import { queryOptions } from '@tanstack/react-query'
import { userKeys } from './keys'

export const userQueries = {
  me: () =>
    queryOptions({
      queryKey: userKeys.me(),
      queryFn: () => api().user.getMe(),
    }),
}
