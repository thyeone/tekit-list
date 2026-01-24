'use client'

import { cn } from '@/utils/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { useSyncExternalStore } from 'react'
import { Icon } from './icon/Icon'
import { AnimatePortal } from './overlay/AnimatePortal'

type Toast = {
  type: 'SUCCESS' | 'FAIL' | 'DEFAULT'
  id: number
  text: string
}

type Action =
  | {
      type: 'ADD'
      toast: Toast
    }
  | {
      type: 'REMOVE'
      id: number
    }

let toastMemory: Toast[] = []
let listeners: Array<(toasts: Toast[]) => void> = []

const reducer = (state: Toast[], action: Action): Toast[] => {
  switch (action.type) {
    case 'ADD': {
      const __toasts = [...state, action.toast]
      return __toasts.slice(0, _TOAST_LIMIT_POLICY)
    }
    case 'REMOVE':
      return state.filter((toast) => toast.id !== action.id)
  }
}

const emitChange = () => {
  for (const listener of listeners) {
    listener(toastMemory)
  }
}

const dispatch = (action: Action) => {
  toastMemory = reducer(toastMemory, action)
  emitChange()
}

export const toast = {
  show: (text: string, type: 'SUCCESS' | 'FAIL' | 'DEFAULT' = 'DEFAULT') => {
    const newToast: Toast = {
      type: type ?? 'DEFAULT',
      id: Date.now(),
      text,
    }

    dispatch({ type: 'ADD', toast: newToast })

    setTimeout(() => {
      toast.remove(newToast.id)
    }, 2500)
  },
  success: (text: string) => {
    toast.show(text, 'SUCCESS')
  },
  fail: (text: string) => {
    toast.show(text, 'FAIL')
  },
  remove: (id: number) => {
    dispatch({ type: 'REMOVE', id })
  },
  subscribe: (listener: (toasts: Toast[]) => void) => {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
}

const _TOAST_LIMIT_POLICY = 5

const variants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.95 },
}

export function Toaster() {
  const toasts = useSyncExternalStore<Toast[]>(
    toast.subscribe,
    () => toastMemory,
    () => toastMemory,
  )

  return (
    <AnimatePortal isOpen={!!toasts.length}>
      <motion.div
        layout
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pointer-events-none fixed inset-x-0 bottom-80 z-modal mx-auto flex w-full max-w-modal flex-col justify-center gap-8 px-20"
      >
        <AnimatePresence>
          {toasts.map(({ id, text, type }) => (
            <motion.div
              key={id}
              layout
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
              className={cn(
                'pointer-events-none inline-flex w-full select-none items-center gap-12 rounded-2xl bg-brand-500 px-20 py-12 font-medium text-[15px] text-white shadow-lg backdrop-blur-md',
              )}
            >
              {type === 'SUCCESS' && (
                <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Icon name="Check" size={14} className="text-white" />
                </div>
              )}
              <span className="flex-1">{text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </AnimatePortal>
  )
}
