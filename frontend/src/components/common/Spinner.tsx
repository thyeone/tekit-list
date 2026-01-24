import { Flex } from '@/headless/ui/Flex'

export function Spinner() {
  return (
    <Flex center className="fixed inset-0 z-header mx-auto max-w-base">
      <div className="relative z-modal size-24 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
    </Flex>
  )
}
