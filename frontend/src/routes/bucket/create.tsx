import { bucketMutations } from '@/apis/bucket/mutaitons'
import { emojiQueries } from '@/apis/emoji/queries'
import { Button } from '@/components/common/Button'
import { Header } from '@/components/common/Header'
import { Label } from '@/components/common/Label'
import { Screen } from '@/components/common/Screen'
import { FormTextField } from '@/components/common/TextField'
import { DatePicker } from '@/components/DatePicker'
import { EmojiPicker } from '@/components/EmojiPicker'
import { Col, Flex } from '@/headless/ui/Flex'
import { Spacing } from '@/headless/ui/Spacing'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { overlay } from 'overlay-kit'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  emoji: z.object({
    id: z.number(),
    name: z.string(),
    unicode: z.string(),
  }),
  title: z.string().min(1, {
    message: '제목을 입력해주세요',
  }),
  dueDate: z.date({
    message: '마감일을 선택해주세요',
  }),
  description: z.string().optional(),
})

export const Route = createFileRoute('/bucket/create')({
  component: BucketCreate,
})

function BucketCreate() {
  const router = useRouter()
  const { data: emoji } = useSuspenseQuery(emojiQueries.list())

  const { mutate } = bucketMutations.create()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      emoji: emoji[0],
      title: '',
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    mutate(
      {
        title: data.title,
        emojiUnicode: data.emoji.unicode,
        dueDate: dayjs(data.dueDate).format('YYYY-MM-DD'),
        description: data.description,
      },
      {
        onSuccess: () => {
          router.history.back()
        },
      },
    )
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
      onSubmit={onSubmit}
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
                  const __emoji = emoji.find((e) => e.id === emojiId)

                  if (__emoji) {
                    form.setValue('emoji', __emoji)
                  }
                  close()
                }}
              />
            ))
          }}
          className="size-100 rounded-full bg-gray-50 transition-all hover:bg-gray-100"
        >
          <p className="text-[48px]">{form.watch('emoji').unicode}</p>
        </Flex>
      </Col>
      <Col gap={8}>
        <FormTextField
          required
          control={form.control}
          name="title"
          label="제목"
        />
        <Col>
          <Label required>마감일</Label>
          <DatePicker
            date={form.watch('dueDate')}
            onSelect={(date) => {
              form.setValue('dueDate', date)
            }}
          />
          {form.formState.errors.dueDate && (
            <p className="mt-4 font-medium text-[14px] text-red-500">
              {form.formState.errors.dueDate.message}
            </p>
          )}
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
          <Button type="submit">등록하기</Button>
        </Flex>
      </Col>
    </Screen>
  )
}
