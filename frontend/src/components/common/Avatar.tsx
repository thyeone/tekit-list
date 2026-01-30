import { Image } from '@/headless/Image'
import { Box } from '@/headless/ui/Box'
import { useId } from 'react'

type AvatarProps = {
  src: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export function Avatar({ src, onChange }: AvatarProps) {
  const id = useId()

  return (
    <>
      <input type="file" id={id} className="hidden" onChange={onChange} />
      <label htmlFor={id} className="cursor-pointer">
        {src ? (
          <Image
            src={src}
            alt="avatar"
            className="size-120 rounded-full"
            objectFit="cover"
          />
        ) : (
          <Box className="size-120 rounded-full bg-gray-200" />
        )}
      </label>
    </>
  )
}
