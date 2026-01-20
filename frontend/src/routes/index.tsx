import { bucketQueries } from '@/apis/bucket/queries'
import { Screen } from '@/components/Screen'
import { Flex, Row } from '@/headless/ui/Flex'
import { List } from '@/headless/ui/List'
import { Spacing } from '@/headless/ui/Spacing'
import { Text } from '@/headless/ui/Text'
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
      <Spacing size={48} />
      <List
        data={data}
        renderItem={(row) => (
          <Row
            key={row.id}
            className="w-full rounded-2xl bg-white p-20 shadow-sm transition-all hover:shadow-md"
            align="center"
          >
            <Flex
              center
              className="size-24 rounded-full border border-gray-200"
            />
            <Row gap={12} align="center">
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-brand-50 text-24-md">
                {String.fromCodePoint(0x1f600 + (row.emojiId % 64))}
              </div>
              <Text variant="18-bd" className="text-grey-900">
                {row.title}
              </Text>
            </Row>
          </Row>
        )}
      />
    </Screen>
  )
}
