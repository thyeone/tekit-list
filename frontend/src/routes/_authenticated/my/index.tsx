import { assetsMutations } from '@/apis/assets/mutations'
import { userMutations } from '@/apis/user/mutations'
import { userQueries } from '@/apis/user/queries'
import { Avatar } from '@/components/common/Avatar'
import { Button } from '@/components/common/Button'
import { Dialog } from '@/components/common/Dialog'
import { Header } from '@/components/common/Header'
import { Screen } from '@/components/common/Screen'
import { FormTextField } from '@/components/common/TextField'
import { IconButton } from '@/headless/icon/Icon'
import { toast } from '@/headless/Toaster'
import { Col } from '@/headless/ui/Flex'
import { useUser } from '@/providers/user.provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { overlay } from 'overlay-kit'
import { useForm } from 'react-hook-form'
import z from 'zod'

export const Route = createFileRoute('/_authenticated/my/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData(userQueries.me())
    return { data }
  },
})

const schema = z.object({
  avatar: z
    .object({
      id: z.number(),
      path: z.string(),
    })
    .optional(),
  nickname: z.string().min(1, {
    message: '닉네임을 입력해주세요',
  }),
})

function RouteComponent() {
  const { data } = Route.useLoaderData()
  const router = useRouter()
  const user = useUser()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      avatar: {
        id: data?.profileImage?.id ?? undefined,
        path: data?.profileImage?.path ?? undefined,
      },
      nickname: data?.nickname ?? '',
    },
  })

  const { mutateAsync: uploadFile } = assetsMutations.uploadFile()
  const { mutate: updateProfile, isPending } = userMutations.updateProfile()

  const handleAvatarChange = async (file: File) => {
    const fileAsset = await uploadFile({
      file,
    })

    if (fileAsset) {
      form.setValue('avatar', {
        id: fileAsset.id,
        path: fileAsset.path,
      })
    }
  }

  const onSubmit = form.handleSubmit((data) => {
    updateProfile(
      {
        nickname: data.nickname,
        profileImageId: data.avatar?.id ?? undefined,
      },
      {
        onSuccess: () => {
          router.history.back()
          toast.success('프로필 수정이 완료되었습니다.')
        },
      },
    )
  })

  return (
    <Screen
      header={
        <Header>
          <Header.Back />
          <Header.Center>마이페이지</Header.Center>
          <Header.Right>
            <IconButton
              name="Logout"
              size={24}
              onClick={() => {
                overlay.open(({ isOpen, close }) => (
                  <Dialog
                    title="로그아웃 하시겠습니까?"
                    isOpen={isOpen}
                    onClose={close}
                    onConfirm={() => {
                      user.logout()
                      toast.success('로그아웃 되었습니다.')
                      router.history.replace('/auth/login')
                    }}
                  />
                ))
              }}
            />
          </Header.Right>
        </Header>
      }
      onSubmit={onSubmit}
      bottomFixedButton={
        <Button type="submit" isLoading={isPending}>
          저장하기
        </Button>
      }
    >
      <Col align="center" className="mt-24">
        <Avatar
          src={form.watch('avatar.path')}
          onChange={handleAvatarChange}
          onDelete={() => {
            form.reset({
              ...form.getValues(),
              avatar: undefined,
            })
          }}
        />
        <FormTextField
          control={form.control}
          name="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
        />
      </Col>
    </Screen>
  )
}
