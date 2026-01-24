import { Icon } from '@/headless/icon/Icon'
import { AnimatePortal } from '@/headless/overlay/AnimatePortal'
import { Col, Flex, Row } from '@/headless/ui/Flex'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import { useEffect, useEffectEvent, useRef, useState } from 'react'

type SelectProps<T extends string> = {
  options: {
    label: string
    value: T
  }[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function Select<T extends string>({
  options,
  value,
  onChange,
  className,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<{
    x: number
    y: number
    width: number
    height: number
  }>({ x: 0, y: 0, width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  const handleClickOutside = useEffectEvent((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  })

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside)

      if (containerRef.current) {
        setPosition(containerRef.current.getBoundingClientRect())
      }
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative w-full max-w-120">
      <Row
        as="button"
        justify="between"
        align="center"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'line-clamp-1 h-38 w-full rounded-full border bg-white pr-12 pl-16 font-medium text-[16px] text-grey-700 transition-all disabled:cursor-not-allowed disabled:bg-grey-50 disabled:text-grey-400',
          {
            'border-brand-500': isOpen,
            'border-grey-200': !isOpen,
          },
          className,
        )}
      >
        <p className="font-medium">{selectedOption?.label}</p>
        <Icon
          name="ChevronDown"
          size={16}
          className={cn('text-grey-200 transition-transform', {
            'rotate-180': isOpen,
          })}
        />
      </Row>

      <AnimatePortal isOpen={isOpen}>
        <Col
          component={motion.div}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute',
            top: position.y + position.height,
            left: position.x,
            width: position.width,
            zIndex: 50,
          }}
          className="mt-4 h-180 w-full overflow-hidden rounded-xl bg-white p-4 shadow-lg"
        >
          <Col as="ul" gap={4} className="h-full overflow-y-auto">
            {options.map((option) => (
              <Flex
                as="li"
                key={option.value}
                align="center"
                justify="between"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full cursor-pointer rounded px-16 py-4 text-left text-[16px] transition-colors hover:bg-grey-50',
                  {
                    'bg-brand-50 font-medium text-brand-600':
                      option.value === value,
                    'text-grey-900': option.value !== value,
                  },
                )}
              >
                {option.label}
                {option.value === value && (
                  <Icon name="Check" size={16} className="text-brand-500" />
                )}
              </Flex>
            ))}
          </Col>
        </Col>
      </AnimatePortal>
    </div>
  )
}
