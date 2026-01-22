import { emojiQueries } from '@/apis/emoji/queries'
import { IconButton } from '@/headless/icon/Icon'
import { Box } from '@/headless/ui/Box'
import { Col, Flex, Row } from '@/headless/ui/Flex'
import { Text } from '@/headless/ui/Text'
import { cn } from '@/utils/cn'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Backdrop } from './Backdrop'

// 자주 사용되는 이모지 목록 (이모지 ID 0-63)
const EMOJI_LIST = [
  { id: 0, emoji: '😀', label: '웃는 얼굴' },
  { id: 1, emoji: '😁', label: '활짝 웃는 얼굴' },
  { id: 2, emoji: '😂', label: '기쁨의 눈물' },
  { id: 3, emoji: '😃', label: '큰 미소' },
  { id: 4, emoji: '😄', label: '눈웃음' },
  { id: 5, emoji: '😅', label: '땀나는 미소' },
  { id: 6, emoji: '😆', label: '크게 웃는 얼굴' },
  { id: 7, emoji: '😇', label: '천사' },
  { id: 8, emoji: '😈', label: '악마' },
  { id: 9, emoji: '😉', label: '윙크' },
  { id: 10, emoji: '😊', label: '환한 미소' },
  { id: 11, emoji: '😋', label: '맛있어' },
  { id: 12, emoji: '😌', label: '만족' },
  { id: 13, emoji: '😍', label: '하트 눈' },
  { id: 14, emoji: '😎', label: '선글라스' },
  { id: 15, emoji: '😏', label: '씨익' },
  { id: 16, emoji: '🎉', label: '축하' },
  { id: 17, emoji: '🎊', label: '파티' },
  { id: 18, emoji: '🎈', label: '풍선' },
  { id: 19, emoji: '🎁', label: '선물' },
  { id: 20, emoji: '🎂', label: '케이크' },
  { id: 21, emoji: '🎯', label: '목표' },
  { id: 22, emoji: '🎨', label: '예술' },
  { id: 23, emoji: '🎭', label: '공연' },
  { id: 24, emoji: '🎪', label: '서커스' },
  { id: 25, emoji: '🎬', label: '영화' },
  { id: 26, emoji: '🎮', label: '게임' },
  { id: 27, emoji: '🎲', label: '주사위' },
  { id: 28, emoji: '🏆', label: '트로피' },
  { id: 29, emoji: '🏅', label: '메달' },
  { id: 30, emoji: '⚽', label: '축구' },
  { id: 31, emoji: '🏀', label: '농구' },
  { id: 32, emoji: '🌟', label: '반짝이는 별' },
  { id: 33, emoji: '⭐', label: '별' },
  { id: 34, emoji: '🌈', label: '무지개' },
  { id: 35, emoji: '🌸', label: '벚꽃' },
  { id: 36, emoji: '🌺', label: '꽃' },
  { id: 37, emoji: '🌻', label: '해바라기' },
  { id: 38, emoji: '🌹', label: '장미' },
  { id: 39, emoji: '🌷', label: '튤립' },
  { id: 40, emoji: '🍀', label: '네잎클로버' },
  { id: 41, emoji: '🍕', label: '피자' },
  { id: 42, emoji: '🍔', label: '햄버거' },
  { id: 43, emoji: '🍟', label: '감자튀김' },
  { id: 44, emoji: '🍦', label: '아이스크림' },
  { id: 45, emoji: '🍰', label: '케이크' },
  { id: 46, emoji: '🍩', label: '도넛' },
  { id: 47, emoji: '🍪', label: '쿠키' },
  { id: 48, emoji: '☕', label: '커피' },
  { id: 49, emoji: '🍺', label: '맥주' },
  { id: 50, emoji: '🚀', label: '로켓' },
  { id: 51, emoji: '✈️', label: '비행기' },
  { id: 52, emoji: '🚗', label: '자동차' },
  { id: 53, emoji: '🏠', label: '집' },
  { id: 54, emoji: '🏖️', label: '해변' },
  { id: 55, emoji: '🏔️', label: '산' },
  { id: 56, emoji: '📚', label: '책' },
  { id: 57, emoji: '📝', label: '메모' },
  { id: 58, emoji: '💰', label: '돈' },
  { id: 59, emoji: '💎', label: '보석' },
  { id: 60, emoji: '🔥', label: '불' },
  { id: 61, emoji: '💪', label: '힘' },
  { id: 62, emoji: '❤️', label: '하트' },
  { id: 63, emoji: '💯', label: '100점' },
]

type EmojiPickerProps = {
  onSelect: (emojiId: number) => void
  selectedId?: number
} & OverlayProps

export function EmojiPicker({
  isOpen,
  onClose,
  onSelect,
  selectedId,
}: EmojiPickerProps) {
  const { data } = useSuspenseQuery(emojiQueries.list())

  const handleSelect = (emojiId: number) => {
    onSelect(emojiId)
    onClose()
  }

  return (
    <Backdrop isOpen={isOpen} onClose={onClose}>
      <Col className="z-modal w-full max-w-400 rounded-2xl bg-white p-16 shadow-xl">
        <Row justify="between" align="center" className="mb-20">
          <Text variant="20-bd" className="text-grey-900">
            상징하는 이모지를
            <br /> 선택해주세요
          </Text>
          <IconButton
            name="Close"
            onClick={onClose}
            size={24}
            className="text-grey-400 hover:text-grey-600"
          />
        </Row>
        <Box className="max-h-400 overflow-y-auto">
          <div className="grid grid-cols-5 gap-8">
            {data.map((emoji) => (
              <Flex
                as="button"
                key={emoji.id}
                center
                onClick={() => handleSelect(emoji.id)}
                className={cn(
                  'size-56 overflow-hidden rounded-xl text-32-rg transition-all hover:scale-105 hover:bg-brand-50',
                  {
                    'bg-brand-100 ring-2 ring-brand-500':
                      selectedId === emoji.id,
                  },
                )}
                title={emoji.name}
              >
                {emoji.unicode}
              </Flex>
            ))}
          </div>
        </Box>
      </Col>
    </Backdrop>
  )
}
