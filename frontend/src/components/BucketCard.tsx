import { bucketMutations } from '@/apis/bucket/mutaitons'
import { Check } from '@/headless/icon/svgs'
import { Flex, Row } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'
import { Link } from '@tanstack/react-router'
import type { IBucketRO } from 'api'
import dayjs from 'dayjs'

export function BucketCard({ bucket }: { bucket: IBucketRO }) {
  const { mutate: complete } = bucketMutations.complete()

  return (
    <Row
      key={bucket.id}
      component={Link}
      to={`/bucket/${bucket.id}`}
      gap={12}
      className={cn(
        'w-full rounded-2xl bg-white p-20 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md',
        {
          'opacity-50': bucket.isCompleted,
        },
      )}
      align="center"
    >
      <Flex
        as="button"
        center
        className="size-24 rounded-full border border-gray-200 transition-all hover:bg-gray-100"
        onClick={(e) => {
          e.preventDefault()
          complete({ id: bucket.id })
        }}
      >
        {bucket.isCompleted && (
          <Check width={16} height={16} className="text-gray-400" />
        )}
      </Flex>
      <Row gap={12} align="center">
        <span className="text-2xl">{bucket.emoji.unicode}</span>
        <p
          className={cn('font-medium text-base text-grey-900', {
            'text-gray-400 line-through': bucket.isCompleted,
          })}
        >
          {bucket.title}
        </p>
      </Row>
      <Row align="center" gap={8} className="ml-auto">
        <Flex
          center
          className={cn('w-fit rounded-md px-8 py-4 font-semibold text-xs', {
            'bg-blue-100 text-blue-500':
              dayjs(bucket.dueDate).diff(dayjs(), 'day') > 7,
            'bg-red-100 text-red-500':
              dayjs(bucket.dueDate).diff(dayjs(), 'day') < 7 &&
              dayjs(bucket.dueDate).diff(dayjs(), 'day') > 0,
            'bg-green-100 text-green-500':
              dayjs(bucket.dueDate).diff(dayjs(), 'day') === 0,
            'bg-gray-100 text-gray-500':
              dayjs(bucket.dueDate).diff(dayjs(), 'day') < 0,
          })}
        >
          {dayjs(bucket.dueDate).diff(dayjs(), 'day') > 0
            ? `D-${dayjs(bucket.dueDate).diff(dayjs(), 'day')}`
            : dayjs(bucket.dueDate).diff(dayjs(), 'day') === 0
              ? 'D-Day'
              : '지난 날'}
        </Flex>
      </Row>
    </Row>
  )
}
