import { api } from '@/api'
import { queryOptions } from '@tanstack/react-query'
import { emojiKeys } from './keys'

export const emojiQueries = {
  list: () =>
    queryOptions({
      queryKey: emojiKeys.list(),
      queryFn: () => api().emoji.emojiList(),
    }),
}
