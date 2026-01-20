import { Screen } from '@/components/Screen'
import { Box } from '@/headless/ui/Box'
import { Text } from '@/headless/ui/Text'
import { createFileRoute } from '@tanstack/react-router'
import 'dayjs/locale/ko'

export const Route = createFileRoute('/')({
  component: Index,
})

export default function Index() {
  return (
    <Screen className="bg-gray-50">
      <Text></Text>
      <Box className="h-200 w-200 bg-red-500" />
    </Screen>
  )
}
