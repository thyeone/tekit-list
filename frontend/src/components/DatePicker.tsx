import { Calendar } from '@/headless/Calendar'
import { Icon } from '@/headless/icon/Icon'
import { Popover } from '@/headless/Popover'
import { Row } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'
import dayjs from 'dayjs'

type DatePickerProps = React.ComponentProps<typeof Calendar>

export function DatePicker(props: DatePickerProps) {
  const { date, onSelect } = props
  return (
    <Popover.Root trigger="click" offset={8} position="bottom-left">
      {(isOpen) => (
        <>
          <Popover.Trigger>
            <Row
              as="button"
              align="center"
              justify="between"
              gap={6}
              className={cn(
                'h-40 w-212 rounded-xl border border-grey-200 bg-white px-16',
                {
                  'bg-grey-50': isOpen,
                },
              )}
            >
              <p className="font-medium text-base text-grey-900">
                {date
                  ? dayjs(date).format('YYYY년 MM월 D일')
                  : '날짜를 선택해주세요'}
              </p>
              <Icon name="ChevronDown" size={16} className="text-grey-200" />
            </Row>
          </Popover.Trigger>
          <Popover.Content permanent>
            <Calendar {...props} />
          </Popover.Content>
        </>
      )}
    </Popover.Root>
  )
}
