import { Icon } from '@/headless/icon/Icon'
import { Col, Flex } from '@/headless/ui/Flex'
import { useId } from 'react'
import { Sheet } from './common/Sheet'

export function ImageUploadSheet({
  isOpen,
  onClose,
  onDelete,
  onChange,
}: OverlayProps & {
  onDelete: VoidFunction
  onChange: (file: File) => Promise<void>
}) {
  const id = useId()

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          onClose()
          const file = e.target.files?.[0]
          if (file) {
            onChange(file)
          }
        }}
      />
      <Col className="mb-12 w-full">
        <Flex
          as="label"
          htmlFor={id}
          center
          // onClick={onClose}
          gap={8}
          className="cursor-pointer py-20"
        >
          <Icon name="Image" size={24} />
          <p className="font-medium text-base text-grey-900">사진 업로드</p>
        </Flex>

        <Flex
          as="button"
          center
          gap={8}
          onClick={() => {
            onDelete()
            onClose()
          }}
          className="py-20"
        >
          <Icon name="Trash" size={24} className="text-red" />
          <p className="font-medium text-base text-red">사진 삭제</p>
        </Flex>
      </Col>
    </Sheet>
  )
}
