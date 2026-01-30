import { Button } from '@/components/common/Button'
import { Screen } from '@/components/common/Screen'
import { CONFIG } from '@/constants/config'
import { Col, Flex } from '@/headless/ui/Flex'
import { Spacing } from '@/headless/ui/Spacing'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: Login,
})

function Login() {
  return (
    <Screen className="bg-linear-to-b from-brand-50 to-white">
      <Col flex={1} className="h-full py-32">
        <Col gap={24} className="flex-1 justify-center">
          <Col gap={8} className="text-center">
            <h1 className="font-bold text-4xl text-grey-900">테킷리스트</h1>
          </Col>
          <Spacing size={48} />
        </Col>

        <Col gap={12} justify="end" flex={1} className="px-20">
          <Button
            component={Link}
            to={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CONFIG.KAKAO.KAKAO_REST_API_KEY}&redirect_uri=${`${CONFIG.OAUTH_REDIRECT_URI}?provider=KAKAO`}&response_type=code`}
            variant="kakao"
            className="h-52 shadow-sm"
          >
            <Flex center gap={8}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 0C4.477 0 0 3.55 0 7.933c0 2.817 1.883 5.283 4.717 6.667-.183.667-.6 2.2-.683 2.55-.1.433.167.433.35.317.15-.084 2.4-1.6 3.15-2.05.483.066.983.1 1.483.1 5.517 0 10-3.55 10-7.934C20 3.55 15.517 0 10 0z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-semibold">카카오로 시작하기</span>
            </Flex>
          </Button>
        </Col>
      </Col>
    </Screen>
  )
}
