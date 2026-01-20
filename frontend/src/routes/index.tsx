import { bucketQueries } from '@/apis/bucket/queries'
import { Screen } from '@/components/Screen'
import { Check } from '@/headless/icon/svgs'
import { Box } from '@/headless/ui/Box'
import { Col, Flex, Row } from '@/headless/ui/Flex'
import { List } from '@/headless/ui/List'
import { Spacing } from '@/headless/ui/Spacing'
import { cn } from '@/utils/cn'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import dayjs from 'dayjs'
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
        <span className="font-bold">n개 </span>남았어요!
      </p>
      <Spacing size={48} />
      <Col className="mb-16 rounded-2xl bg-white p-20">
        <Row align="center" justify="between">
          <p className="text-18-bd text-grey-900">진행률</p>
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
        renderItem={(row) => (
          <Row
            component={Link}
            to="/bucket"
            key={row.id}
            gap={12}
            className={cn(
              'w-full rounded-2xl bg-white p-20 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md',
              {
                'opacity-50': row.isCompleted,
              },
            )}
            align="center"
          >
            <Flex
              center
              className="size-24 rounded-full border border-gray-200"
            >
              {row.isCompleted && <Check />}
            </Flex>
            <Row gap={12} align="center">
              {String.fromCodePoint(0x1f600 + (row.emojiId % 64))}
              <p className="text-[18px] text-grey-900">{row.title}</p>
            </Row>
            <Row align="center" gap={8} className="ml-auto">
              <Flex
                center
                className={cn(
                  'w-fit rounded-4xl px-8 py-4 font-medium text-xs',
                  {
                    'bg-blue-100 text-blue-500':
                      dayjs(row.date).diff(dayjs(), 'day') > 7,
                    'bg-red-100 text-red-500':
                      dayjs(row.date).diff(dayjs(), 'day') < 7 &&
                      dayjs(row.date).diff(dayjs(), 'day') > 0,
                    'bg-green-100 text-green-500':
                      dayjs(row.date).diff(dayjs(), 'day') === 0,
                    'bg-gray-100 text-gray-500':
                      dayjs(row.date).diff(dayjs(), 'day') < 0,
                  },
                )}
              >
                {dayjs(row.date).diff(dayjs(), 'day') > 0
                  ? `D-${dayjs(row.date).diff(dayjs(), 'day')}`
                  : dayjs(row.date).diff(dayjs(), 'day') === 0
                    ? 'D-Day'
                    : '지난 날'}
              </Flex>
            </Row>
          </Row>
        )}
      />
    </Screen>
  )
}
