import { api } from '@/api'
import { bucketKeys } from '@/apis/bucket/keys'
import { bucketQueries } from '@/apis/bucket/queries'
import { BucketCard } from '@/components/BucketCard'
import { Button } from '@/components/common/Button'
import { Header } from '@/components/common/Header'
import { Screen } from '@/components/common/Screen'
import { Select } from '@/components/common/Select'
import { Icon, IconButton } from '@/headless/icon/Icon'
import { toast } from '@/headless/Toaster'
import { Box } from '@/headless/ui/Box'
import { Col, Flex, Row } from '@/headless/ui/Flex'
import { List } from '@/headless/ui/List'
import { Spacing } from '@/headless/ui/Spacing'
import { useQueryParams } from '@/hooks/use-query-params-react'
import { useInfiniteList } from '@/hooks/useInfiniteList'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { OrderByEnum, StatusEnum } from 'api'
import { useCallback, useMemo } from 'react'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

export default function Index() {
  const { query, setParams } = useQueryParams<{
    orderBy: OrderByEnum
    status: StatusEnum
  }>({
    orderBy: 'DESC',
    status: 'ALL',
  })

  const { data: count } = useQuery(bucketQueries.count())

  const { rows, listBottom } = useInfiniteList({
    key: bucketKeys.list.__list,
    fn: api().bucket.bucketList,
    params: {
      orderBy: query.orderBy,
      status: query.status,
      limit: 10,
    },
  })

  const onRefresh = useCallback(() => {
    setParams({ orderBy: 'DESC', status: 'ALL' })
  }, [])

  const progress = useMemo(() => {
    return Math.round(
      ((count?.completedCount ?? 0) / (count?.totalCount ?? 0)) * 100,
    )
  }, [count])

  return (
    <Screen
      header={
        <Header>
          <Header.Center>버킷리스트</Header.Center>
          <Header.Right>
            <IconButton component={Link} to="/my" name="User" size={24} />
          </Header.Right>
        </Header>
      }
      bottomFixedButton={
        <Button component={Link} to="/bucket/create">
          📋 버킷 추가
        </Button>
      }
    >
      <p className="mt-24 text-2xl">
        아직 완료하지 못한 버킷리스트가
        <br />
        <span className="font-bold text-brand-500">
          {count?.uncompletedCount ?? 0}개{' '}
        </span>
        남았어요!
      </p>

      <Spacing size={36} />
      <Flex align="center" gap={8} className="mb-16">
        <Select
          options={[
            {
              label: '전체',
              value: 'ALL',
            },
            {
              label: '진행중',
              value: 'INCOMPLETED',
            },
            {
              label: '완료됨',
              value: 'COMPLETED',
            },
          ]}
          value={query.status}
          onChange={(status) => setParams({ status: status as StatusEnum })}
        />

        <Select
          options={[
            {
              label: '최신순',
              value: 'DESC',
            },
            {
              label: '오래된순',
              value: 'ASC',
            },
          ]}
          value={query.orderBy}
          onChange={(orderBy) => setParams({ orderBy })}
        />
        <Flex
          as="button"
          center
          onClick={() => {
            onRefresh()
            toast.success('필터를 초기화했습니다.')
          }}
          className="size-40 rounded-full border border-grey-200 bg-white text-gray-600"
        >
          <Icon name="Refresh" size={16} />
        </Flex>
      </Flex>

      <Col className="mb-16 rounded-2xl bg-white p-20 shadow-sm">
        <Row align="center" justify="between">
          <p className="font-medium text-base text-grey-900">진행률</p>
          <p className="font-medium text-18-bd text-grey-900">
            <span className="text-brand-500">{count?.completedCount ?? 0}</span>
            {` / ${count?.totalCount ?? 0}`}
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
        data={rows}
        gap={8}
        renderItem={(bucket) => <BucketCard bucket={bucket} />}
        bottomElement={<div ref={listBottom} />}
      />
      <div ref={listBottom} />
    </Screen>
  )
}
