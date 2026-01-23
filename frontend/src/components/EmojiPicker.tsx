import { emojiQueries } from '@/apis/emoji/queries'
import { IconButton } from '@/headless/icon/Icon'
import { Box } from '@/headless/ui/Box'
import { Col, Flex, Row } from '@/headless/ui/Flex'
import { Grid } from '@/headless/ui/Grid'
import { Text } from '@/headless/ui/Text'
import { cn } from '@/utils/cn'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Backdrop } from './common/Backdrop'

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
          <Grid columns="3" gap={8}>
            {data.map((emoji) => (
              <Flex
                as="button"
                key={emoji.id}
                center
                flex={1}
                onClick={() => handleSelect(emoji.id)}
                className={cn(
                  'h-56 overflow-hidden rounded-xl text-3xl transition-all hover:scale-105 hover:bg-brand-50',
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
          </Grid>
        </Box>
      </Col>
    </Backdrop>
  )
}
