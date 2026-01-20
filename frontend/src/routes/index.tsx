import { useQueryParams } from '@/hooks/use-query-params-react'
import { createFileRoute } from '@tanstack/react-router'
import { EmblaCarousel } from '@thyeone/embla'
import 'dayjs/locale/ko'

export const Route = createFileRoute('/')({
  component: Index,
})

export default function Index() {
  const { query, setParams } = useQueryParams<{
    name: string
  }>({
    name: '',
  })
  return (
    <EmblaCarousel.Root
      options={{
        stopPropagation: true,
      }}
      className="p-4"
    >
      <EmblaCarousel.Content>
        <EmblaCarousel.Root
          options={{
            stopPropagation: true,
          }}
        >
          <EmblaCarousel.Content>
            <EmblaCarousel.Item
              onClick={() => {
                setParams({ name: 'test' })
              }}
              className="size-[300px] rounded-md border border-gray-100 bg-gray-50"
            >
              dd
            </EmblaCarousel.Item>
          </EmblaCarousel.Content>
        </EmblaCarousel.Root>
      </EmblaCarousel.Content>
    </EmblaCarousel.Root>
  )
}
