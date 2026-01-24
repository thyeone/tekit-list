import { api } from '@/api'
import { bucketMutations } from '@/apis/bucket/mutaitons'
import { emojiQueries } from '@/apis/emoji/queries'
import { Button } from '@/components/common/Button'
import { Dialog } from '@/components/common/Dialog'
import { Header } from '@/components/common/Header'
import { Label } from '@/components/common/Label'
import { Screen } from '@/components/common/Screen'
import { FormTextField } from '@/components/common/TextField'
import { Toggle } from '@/components/common/Toggle'
import { DatePicker } from '@/components/DatePicker'
import { EmojiPicker } from '@/components/EmojiPicker'
import { Col, Flex } from '@/headless/ui/Flex'
import { Spacing } from '@/headless/ui/Spacing'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import type { Emoji, IBucketRO } from 'api'
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
  isCompleted: z.boolean(),
})

type BucketFormProps = {
  bucket?: IBucketRO
}

export function BucketForm({ bucket }: BucketFormProps) {
  const router = useRouter()
  const { data: emoji } = useQuery(emojiQueries.list())

  const { mutate: createMutate } = bucketMutations.create()
  const { mutate: updateMutate } = bucketMutations.update()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      emoji: bucket?.emoji ?? (emoji?.[0] as Emoji),
      title: bucket?.title ?? '',
      dueDate: bucket?.dueDate ? new Date(bucket.dueDate) : undefined,
      description: bucket?.description ?? '',
      isCompleted: !!bucket?.isCompleted,
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    if (bucket) {
      updateMutate(
        {
          id: bucket.id,
          emojiId: data.emoji.id,
          title: data.title,
          dueDate: dayjs(data.dueDate).format('YYYY-MM-DD'),
          description: data.description,
          isCompleted: data.isCompleted,
        },
        {
          onSuccess: () => {
            router.history.back()
          },
        },
      )
    } else {
      createMutate(
        {
          title: data.title,
          emojiId: data.emoji.id,
          dueDate: dayjs(data.dueDate).format('YYYY-MM-DD'),
          description: data.description,
        },
        {
          onSuccess: () => {
            router.history.back()
          },
        },
      )
    }
  })

  return (
    <Screen
      className="bg-white"
      header={
        <Header>
          <Header.Back />
          <Header.Center>{bucket ? '버킷 수정' : '버킷 추가'}</Header.Center>
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
                  const __emoji = emoji?.find((e) => e.id === emojiId)

                  if (__emoji) {
                    form.setValue('emoji', __emoji)
                  }
                }}
              />
            ))
          }}
          className="size-100 rounded-full bg-gray-50 transition-all hover:bg-gray-100"
        >
          <p className="text-[48px]">{form.watch('emoji')?.unicode}</p>
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
        {bucket && (
          <Col>
            <Label>완료 상태</Label>
            <Toggle
              checked={form.watch('isCompleted')}
              onChange={(checked) => {
                form.setValue('isCompleted', checked)
              }}
            />
          </Col>
        )}
        <Spacing size={16} />

        <Flex center gap={8}>
          <Button
            variant={bucket ? 'warning' : 'secondary'}
            onClick={() => {
              if (bucket?.id) {
                overlay.open(({ isOpen, close }) => (
                  <Dialog
                    title="버킷 삭제"
                    description="삭제된 버킷은 복구할 수 없습니다."
                    isOpen={isOpen}
                    onClose={close}
                    onConfirm={async () => {
                      if (!bucket?.id) return
                      await api().bucket.bucketDelete({ id: bucket?.id })
                      router.history.back()
                    }}
                  />
                ))
              } else {
                router.history.back()
              }
            }}
          >
            {bucket ? '삭제' : '취소'}
          </Button>
          <Button type="submit">{bucket ? '수정하기' : '등록하기'}</Button>
        </Flex>
      </Col>
    </Screen>
  )
}
