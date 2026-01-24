import { bucketQueries } from '@/apis/bucket/queries'
import { emojiQueries } from '@/apis/emoji/queries'
import { createFileRoute } from '@tanstack/react-router'
import { BucketForm } from './components/BucketForm'

export const Route = createFileRoute('/bucket/$bucketId')({
  component: BucketDetail,
  loader: async ({ context, params }) => {
    const { bucketId } = params
    const bucket = await context.queryClient.ensureQueryData(
      bucketQueries.detail(Number(bucketId)),
    )
    const emoji = await context.queryClient.ensureQueryData(emojiQueries.list())
    return { bucket, emoji }
  },
})

function BucketDetail() {
  const { bucket, emoji } = Route.useLoaderData()

  return <BucketForm bucket={bucket} emoji={emoji} />
}
