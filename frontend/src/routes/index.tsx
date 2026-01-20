import { bucketQueries } from '@/apis/bucket/queries'
import { Screen } from '@/components/Screen'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

export default function Index() {
  const { data } = useSuspenseQuery(bucketQueries.list({ orderBy: 'DESC' }))
  return (
    <Screen className="bg-gray-50">
      <p className="mt-24 text-2xl">
        버킷리스트가
        <br />
        <span className="font-bold">n개 </span>남았어요!
      </p>
    </Screen>
  )
}
