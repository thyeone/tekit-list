import { emojiQueries } from '@/apis/emoji/queries'
import { EmojiPicker } from '@/components/EmojiPicker'
import { Header } from '@/components/Header'
import { Screen } from '@/components/Screen'
import { Col, Flex } from '@/headless/ui/Flex'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { overlay } from 'overlay-kit'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  emojiId: z.string(),
})

export const Route = createFileRoute('/bucket/create')({
  component: BucketCreate,
})

function BucketCreate() {
  const { data: emoji } = useSuspenseQuery(emojiQueries.list())

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      emojiId: emoji[0].unicode,
    },
  })

  return (
    <Screen
      className="bg-white"
      header={
        <Header>
          <Header.Back />
          <Header.Center>버킷 추가</Header.Center>
          <Header.Right />
        </Header>
      }
    >
      <p className="my-24 text-2xl">
        소소해도 괜찮아요. <br />
        <span className="font-bold">채우고 싶은 것</span>을 적어보세요!
      </p>
      <Col align="center">
        <Flex
          as="button"
          center
          onClick={() => {
            overlay.open(({ isOpen, close }) => (
              <EmojiPicker
                isOpen={isOpen}
                onClose={() => {
                  close()
                }}
                onSelect={(emojiId) => {
                  form.setValue('emojiId', emoji[emojiId].unicode)
                  close()
                }}
              />
            ))
          }}
          className="size-100 rounded-full bg-gray-50 transition-all hover:bg-gray-100"
        >
          <p className="text-[48px]">{form.watch('emojiId')}</p>
        </Flex>
      </Col>
    </Screen>
  )
}
