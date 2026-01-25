import { emojiQueries } from '@/apis/emoji/queries'
import { Icon } from '@/headless/icon/Icon'
import { Col, Flex, Row } from '@/headless/ui/Flex'
import { Grid } from '@/headless/ui/Grid'
import { Text } from '@/headless/ui/Text'
import { cn } from '@/utils/cn'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Sheet } from './common/Sheet'

type EmojiPickerProps = {
  onSelect: (emojiId: number) => void
  selectedId: number
} & OverlayProps

export function EmojiPicker({
  isOpen,
  onClose,
  onSelect,
  selectedId,
}: EmojiPickerProps) {
  const { data } = useSuspenseQuery(emojiQueries.list())

  const [emojiId, setEmojiId] = useState<number>(selectedId)

  const handleSelect = (emojiId: number) => {
    onSelect(emojiId)
    onClose()
  }

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        handleSelect(emojiId)
      }}
    >
      <Row justify="between" align="center" className="mb-12">
        <Text variant="20-bd" className="text-grey-900">
          상징하는 이모지를
          <br /> 선택해주세요
        </Text>
      </Row>
      <Grid columns="3" className="mb-16">
        {data.map((emoji) => (
          <Col
            as="button"
            key={emoji.id}
            center
            gap={4}
            onClick={() => setEmojiId(emoji.id)}
            className={cn(
              'relative m-4 rounded-2xl border-2 border-transparent bg-grey-50 p-16 transition-all active:scale-95',
              {
                'scale-105 border-brand-500 bg-brand-500 shadow-brand-500/20 shadow-lg':
                  emojiId === emoji.id,
              },
            )}
          >
            {emojiId === emoji.id && (
              <Flex
                center
                className="absolute top-8 right-8 size-20 rounded-full bg-white"
              >
                <Icon name="Check" size={12} className="text-brand-500" />
              </Flex>
            )}
            <Flex center gap={8} className="text-3xl">
              {emoji.unicode}
            </Flex>
            <p
              className={cn('font-semibold text-sm', {
                'text-white': emojiId === emoji.id,
                'text-grey-900': emojiId !== emoji.id,
              })}
            >
              {emoji.name}
            </p>
          </Col>
        ))}
      </Grid>
    </Sheet>
  )
}
