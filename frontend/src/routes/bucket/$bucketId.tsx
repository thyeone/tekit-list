import { bucketQueries } from '@/apis/bucket/queries'
import { createFileRoute } from '@tanstack/react-router'
import { BucketForm } from './components/BucketForm'

export const Route = createFileRoute('/bucket/$bucketId')({
  component: BucketDetail,
  loader: async ({ context, params }) => {
    const { bucketId } = params
    const bucket = await context.queryClient.ensureQueryData(
      bucketQueries.detail(Number(bucketId)),
    )
    return { bucket }
  },
})

function BucketDetail() {
  const { bucket } = Route.useLoaderData()

  return <BucketForm bucket={bucket} />
}
