import { Calendar } from '@/headless/Calendar'
import { Flex } from '@/headless/ui/Flex'
import { Backdrop } from './common/Backdrop'

type DatePickerProps = React.ComponentProps<typeof Calendar> & OverlayProps

export function DatePicker({ isOpen, onClose, ...props }: DatePickerProps) {
  return (
    <Backdrop isOpen={isOpen} onClose={onClose}>
      <Flex
        center
        className="z-modal w-full max-w-modal rounded-2xl bg-white p-16"
      >
        <Calendar {...props} />
      </Flex>
    </Backdrop>
  )
}
