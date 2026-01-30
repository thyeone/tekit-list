import { Image } from '@/headless/Image'
import { cn } from '@/utils/cn'
import { overlay } from 'overlay-kit'
import { useId } from 'react'
import { ImageUploadSheet } from '../ImageUploadSheet'

type AvatarProps = {
  src?: string
  onChange: (file: File) => Promise<void>
  onDelete: VoidFunction
}

export function Avatar({ src, onChange, onDelete }: AvatarProps) {
  const id = useId()

  return (
    <label
      onClick={() => {
        overlay.open(({ isOpen, close }) => (
          <ImageUploadSheet
            isOpen={isOpen}
            onClose={close}
            onDelete={onDelete}
            onChange={async (file) => {
              console.log(file)
              await onChange(file)
              close()
            }}
          />
        ))
      }}
      htmlFor={id}
      className={cn(
        'relative size-120 cursor-pointer overflow-hidden rounded-full bg-gray-200',
      )}
    >
      {src && (
        <Image
          fill
          src={src}
          alt="avatar"
          className="size-120 rounded-full"
          objectFit="cover"
        />
      )}
    </label>
  )
}
