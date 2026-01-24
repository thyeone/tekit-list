import { Box } from '@/headless/ui/Box'
import { Flex } from '@/headless/ui/Flex'
import { Text } from '@/headless/ui/Text'
import { cn } from '@/utils/cn'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { motion } from 'framer-motion'
import { useLilius } from 'use-lilius'
import { IconButton } from './icon/Icon'
import { Grid } from './ui/Grid'

dayjs.locale('ko')

const HEADER = ['일', '월', '화', '수', '목', '금', '토']

type CalendarProps = {
  date: Date
  onSelect: (date: Date) => void
}

export function Calendar({ date, onSelect }: CalendarProps) {
  const lilius = useLilius({
    viewing: date,
    selected: [date],
  })

  const handleDateClick = (date: Date) => {
    if (
      dayjs(date).isBefore(dayjs(), 'day') ||
      dayjs(date).month() !== dayjs(lilius.viewing).month()
    ) {
      return
    }
    lilius.toggle(date)
    onSelect(date)
  }

  const isToday = (_date: Date) => dayjs(_date).isSame(dayjs(), 'day')

  const isSelected = (_date: Date) => {
    if (!date) {
      return false
    }

    return dayjs(_date).isSame(dayjs(date), 'day')
  }

  const isPast = (_date: Date) => dayjs(_date).isBefore(dayjs(), 'day')

  const isOtherMonth = (date: Date) =>
    dayjs(date).month() !== dayjs(lilius.viewing).month()

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full rounded-2xl bg-black/80 px-16 py-24 backdrop-blur-sm"
    >
      <Flex center justify="between" gap={4} className="mb-16">
        <IconButton
          name="ChevronLeft"
          onClick={lilius.viewPreviousMonth}
          size={24}
          className="text-white"
        />
        <Text variant="18-bd" className="text-white">
          {dayjs(lilius.viewing).format('YYYY년 M월')}
        </Text>
        <IconButton
          name="ChevronLeft"
          onClick={lilius.viewNextMonth}
          size={24}
          className="rotate-180 text-white"
        />
      </Flex>

      <Grid columns="7" gap={4} className="mb-8">
        {HEADER.map((day, index) => (
          <Flex key={day} center>
            <Text
              variant="14-md"
              className={cn('text-white', {
                'text-red': index === 0, // 일요일
                'text-brand-500': index === 6, // 토요일
              })}
            >
              {day}
            </Text>
          </Flex>
        ))}
      </Grid>

      <Grid columns="7" gap={4}>
        {lilius.calendar[0].map((week) =>
          week.map((date) => {
            const isPastDate = isPast(date)
            const isOtherMonthDate = isOtherMonth(date)
            const isTodayDate = isToday(date)
            const isSelectedDate = isSelected(date)

            return (
              <Flex
                key={date.toISOString()}
                as="button"
                center
                flex={1}
                onClick={() => handleDateClick(date)}
                disabled={isPastDate || isOtherMonthDate}
                className={cn(
                  'relative aspect-square rounded-[8px] p-4 font-medium text-[16px] text-white transition-all',
                  {
                    'text-white hover:bg-brand-50 hover:text-brand-700':
                      !isPastDate && !isOtherMonthDate && !isSelectedDate,

                    'bg-brand-500 text-white hover:bg-brand-600':
                      isSelectedDate,

                    'pointer-events-none text-white/50': isOtherMonthDate,

                    'pointer-events-none text-white/50 line-through':
                      isPastDate && !isOtherMonthDate,
                  },
                )}
              >
                {dayjs(date).format('D')}
              </Flex>
            )
          }),
        )}
      </Grid>
    </Box>
  )
}
