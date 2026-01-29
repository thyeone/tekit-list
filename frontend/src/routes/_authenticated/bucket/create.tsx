import { emojiQueries } from '@/apis/emoji/queries'
import { createFileRoute } from '@tanstack/react-router'
import { BucketForm } from './components/BucketForm'

export const Route = createFileRoute('/_authenticated/bucket/create')({
  component: BucketCreate,
  loader: async ({ context }) => {
    const emoji = await context.queryClient.ensureQueryData(emojiQueries.list())
    return { emoji }
  },
})

function BucketCreate() {
  const { emoji } = Route.useLoaderData({})

  return <BucketForm emoji={emoji} />
}
