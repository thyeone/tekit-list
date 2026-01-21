import { bucketQueries } from '@/apis/bucket/queries'
import { BucketCard } from '@/components/BucketCard'
import { Screen } from '@/components/Screen'
import { Box } from '@/headless/ui/Box'
import { Col, Row } from '@/headless/ui/Flex'
import { List } from '@/headless/ui/List'
import { Spacing } from '@/headless/ui/Spacing'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
})

export default function Index() {
  const { data } = useSuspenseQuery(bucketQueries.list({ orderBy: 'DESC' }))

  const progress = useMemo(() => {
    return Math.round(
      (data.filter((row) => row.isCompleted).length / data.length) * 100,
    )
  }, [data])

  return (
    <Screen className="bg-gray-50">
      <p className="mt-24 text-2xl">
        버킷리스트가
        <br />
        <span className="font-bold">
          {data.filter((row) => !row.isCompleted).length}개{' '}
        </span>
        남았어요!
      </p>
      <Spacing size={48} />
      <Col className="mb-16 rounded-2xl bg-white p-20">
        <Row align="center" justify="between">
          <p className="font-medium text-base text-grey-900">진행률</p>
          <p className="font-medium text-18-bd text-grey-900">
            {`${data.filter((row) => row.isCompleted).length} / ${data.length}`}
          </p>
        </Row>
        <Box className="relative mt-8 h-8 w-full overflow-hidden rounded-full bg-gray-200">
          <Box
            className="absolute h-full bg-brand-500 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </Box>
      </Col>
      <List
        data={data}
        renderItem={(bucket) => <BucketCard bucket={bucket} />}
      />
    </Screen>
  )
}
