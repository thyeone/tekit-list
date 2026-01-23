import { emojiQueries } from '@/apis/emoji/queries'
import { Button } from '@/components/common/Button'
import { Header } from '@/components/common/Header'
import { Label } from '@/components/common/Label'
import { Screen } from '@/components/common/Screen'
import { FormTextField } from '@/components/common/TextField'
import { DatePicker } from '@/components/DatePicker'
import { EmojiPicker } from '@/components/EmojiPicker'
import { Icon } from '@/headless/icon/Icon'
import { Col, Flex, Row } from '@/headless/ui/Flex'
import { Spacing } from '@/headless/ui/Spacing'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { overlay } from 'overlay-kit'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  emojiId: z.number(),
  title: z.string().min(1),
  dueDate: z.date(),
  description: z.string().optional(),
})

export const Route = createFileRoute('/bucket/create')({
  component: BucketCreate,
})

function BucketCreate() {
  const router = useRouter()
  const { data: emoji } = useSuspenseQuery(emojiQueries.list())

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      emojiId: emoji[0].id,
      title: '',
    },
  })

  console.log(form.watch('dueDate'))

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
                  form.setValue('emojiId', emojiId)
                  close()
                }}
              />
            ))
          }}
          className="size-100 rounded-full bg-gray-50 transition-all hover:bg-gray-100"
        >
          <p className="text-[48px]">
            {emoji.find((e) => e.id === Number(form.watch('emojiId')))?.unicode}
          </p>
        </Flex>
      </Col>
      <Col gap={8}>
        <FormTextField control={form.control} name="title" label="버킷리스트" />
        <Col>
          <Label>마감일</Label>
          <Row
            as="button"
            align="center"
            gap={6}
            className="rounded-xl border border-grey-200 p-16"
            onClick={() => {
              overlay.open(({ isOpen, close }) => (
                <DatePicker
                  date={form.watch('dueDate')}
                  isOpen={isOpen}
                  onClose={() => {
                    close()
                  }}
                  onSelect={(date) => {
                    form.setValue('dueDate', date)
                    close()
                  }}
                />
              ))
            }}
          >
            <Icon name="Calendar" size={16} className="text-grey-500" />
            <p className="font-medium text-base text-grey-900">
              {form.watch('dueDate')
                ? dayjs(form.watch('dueDate')).format('YYYY년 MM월 D일')
                : '날짜를 선택해주세요'}
            </p>
          </Row>
        </Col>
        <FormTextField
          as="textarea"
          control={form.control}
          name="description"
          label="설명"
        />
        <Spacing size={16} />
        <Flex center gap={8}>
          <Button
            variant="secondary"
            onClick={() => {
              router.history.back()
            }}
          >
            취소
          </Button>
          <Button>등록하기</Button>
        </Flex>
      </Col>
    </Screen>
  )
}
