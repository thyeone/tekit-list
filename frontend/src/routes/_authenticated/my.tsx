import { userQueries } from '@/apis/user/queries'
import { Avatar } from '@/components/common/Avatar'
import { Button } from '@/components/common/Button'
import { Header } from '@/components/common/Header'
import { Screen } from '@/components/common/Screen'
import { Col } from '@/headless/ui/Flex'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import z from 'zod'

export const Route = createFileRoute('/_authenticated/my')({
  component: RouteComponent,
})

const schema = z.object({
  avatar: z.string().optional(),
  nickname: z.string(),
})

function RouteComponent() {
  const { data } = useQuery(userQueries.me())

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      avatar: '',
      nickname: data?.nickname ?? '',
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Screen
      header={
        <Header>
          <Header.Back />
          <Header.Center>마이페이지</Header.Center>
        </Header>
      }
      onSubmit={onSubmit}
      bottomFixedButton={<Button type="submit">저장하기</Button>}
    >
      <Col align="center" className="mt-24">
        <Avatar onChange={() => {}} />
        <p className="mt-24 text-2xl">{data?.id}</p>
      </Col>
    </Screen>
  )
}
