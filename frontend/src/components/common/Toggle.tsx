import { Flex } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'

type ToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <Flex
      data-state={checked ? 'checked' : 'unchecked'}
      as="button"
      center
      className={cn('relative h-28 w-52 shrink-0 rounded-full transition-all', {
        'bg-brand-500': checked,
        'bg-grey-200': !checked,
      })}
      onClick={() => onChange(!checked)}
    >
      <div
        className={cn(
          'absolute left-2 h-24 w-24 rounded-full bg-white shadow-md transition-all duration-200',
          checked ? 'translate-x-24' : 'translate-x-0',
        )}
      />
    </Flex>
  )
}
