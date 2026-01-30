import { api } from '@/api'
import { useMutation } from '@tanstack/react-query'
import type { IFileAssetUpload } from 'api'

export const assetsMutations = {
  uploadFile: () =>
    useMutation({
      mutationFn: (params: IFileAssetUpload) => api().assets.uploadFile(params),
    }),
}
