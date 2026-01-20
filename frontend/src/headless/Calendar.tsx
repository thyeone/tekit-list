import { Flex } from '@/headless/ui/Flex'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLilius } from 'use-lilius'

import { Box } from '@/headless/ui/Box'
import { Grid } from '@/headless/ui/Grid'
import { useQueryParams } from '@/hooks/use-query-params-react'
import { cn } from '@/utils/cn'
import 'dayjs/locale/ko'

dayjs.locale('ko')

const HEADER = ['일', '월', '화', '수', '목', '금', '토']

export function Calendar() {
  const { query, setParams } = useQueryParams({
    year: dayjs().year(),
    month: dayjs().month() + 1,
  })

  const lilius = useLilius({
    viewing: dayjs(
      `${query.year}-${query.month}-${dayjs().format('MM')}`,
    ).toDate(),
  })

  return (
    <div>
      <Flex center gap={12}>
        <Flex
          as="button"
          center
          onClick={() => {
            lilius.viewPreviousMonth()
            setParams({
              year: dayjs(lilius.viewing).add(-1, 'month').year(),
              month: dayjs(lilius.viewing).add(-1, 'month').month() + 1,
            })
          }}
        >
          <ChevronLeft />
        </Flex>
        <span className="font-semibold text-xl">
          {dayjs(lilius.viewing).format('YYYY년 MM월')}
        </span>
        <Flex
          as="button"
          center
          className="disabled:opacity-30"
          disabled={dayjs(lilius.viewing).add(1, 'month').isAfter(dayjs())}
          onClick={() => {
            setParams({
              year: dayjs(lilius.viewing).add(1, 'month').year(),
              month: dayjs(lilius.viewing).add(1, 'month').month() + 1,
            })
            lilius.viewNextMonth()
          }}
        >
          <ChevronRight />
        </Flex>
      </Flex>
      <Box
        as="table"
        className="mx-auto mt-40 max-h-[calc(100dvh-400px)] w-full max-w-600"
      >
        <Flex as="thead" className="h-32 w-full overflow-hidden rounded-t-2xl">
          {HEADER.map((day, index) => {
            return (
              <Flex
                as="th"
                key={day}
                center
                className={cn('h-full flex-1 bg-gray-100', {
                  'border-gray-200 border-r': index !== HEADER.length - 1,
                })}
              >
                {day}
              </Flex>
            )
          })}
        </Flex>
        <Grid as="tbody" className="w-full border border-gray-100">
          {lilius.calendar[0].map((week, index) => {
            return (
              <Flex
                as="tr"
                className={cn('h-80 w-full', {
                  'border-gray-100 border-b': index !== week.length - 1,
                })}
              >
                {week.map((day, index) => {
                  return (
                    <Box
                      as="td"
                      key={day.toISOString()}
                      className={cn(
                        'h-full flex-1 shrink-0 border-gray-200 p-4',
                        {
                          'pointer-events-none bg-gray-50 text-gray-400':
                            dayjs(day).month() !==
                            dayjs(lilius.viewing).month(),
                          'border-r': index !== week.length - 1,
                        },
                      )}
                    >
                      {dayjs(day).format('DD')}
                    </Box>
                  )
                })}
              </Flex>
            )
          })}
        </Grid>
      </Box>
    </div>
  )
}
