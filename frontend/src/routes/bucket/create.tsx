import { EmojiPicker } from '@/components/EmojiPicker'
import { Header } from '@/components/Header'
import { Screen } from '@/components/Screen'
import { Col, Flex } from '@/headless/ui/Flex'
import { createFileRoute } from '@tanstack/react-router'
import { overlay } from 'overlay-kit'

export const Route = createFileRoute('/bucket/create')({
  component: BucketCreate,
})

function BucketCreate() {
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
              />
            ))
          }}
          className="size-100 rounded-full bg-gray-50 transition-all hover:bg-gray-100"
        >
          <p className="text-[48px]">😊</p>
        </Flex>
      </Col>
    </Screen>
  )
}
