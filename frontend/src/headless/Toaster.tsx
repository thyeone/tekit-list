'use client'

import { cn } from '@/utils/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { useSyncExternalStore } from 'react'
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
  show: (text: string) => {
    const newToast: Toast = {
      type: 'DEFAULT',
      id: Date.now(),
      text,
    }

    dispatch({ type: 'ADD', toast: newToast })

    setTimeout(() => {
      toast.remove(newToast.id)
    }, 2500)
  },
  success: (text: string) => {
    dispatch({
      type: 'ADD',
      toast: {
        type: 'SUCCESS',
        id: Date.now(),
        text,
      },
    })
  },
  fail: (text: string) => {
    dispatch({
      type: 'ADD',
      toast: {
        type: 'FAIL',
        id: Date.now(),
        text,
      },
    })
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
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
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
        className="pointer-events-none fixed inset-x-0 bottom-68 z-modal mx-auto flex w-full max-w-[358px] flex-col justify-center gap-2 px-5"
      >
        <AnimatePresence>
          {toasts.map(({ id, text }) => (
            <motion.div
              key={id}
              layout
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={cn(
                'pointer-events-none inline-flex h-52 w-full select-none items-center gap-12 rounded-xl bg-gray-700 px-18 font-medium text-body-3 text-white backdrop-blur',
              )}
            >
              {text}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </AnimatePortal>
  )
}
