import { useLocation, useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback } from 'react'

type ReplaceOptions = {
  resetQueries?: string[]
  push?: boolean
  path?: string
}

export const useQueryParams = <
  T extends Record<string, string | boolean | number>,
>(
  initialValue: Readonly<T>,
) => {
  const search = useSearch({ strict: false })
  const location = useLocation()
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(
    Object.entries(search as Record<string, unknown>).map(([k, v]) => [
      k,
      String(v),
    ]),
  )

  const getPath = useCallback(
    (key: string, val: string, options?: ReplaceOptions) => {
      const newParams = new URLSearchParams(searchParams)

      if (options?.resetQueries) {
        for (const k of options.resetQueries) {
          newParams.delete(k)
        }
      }

      if (val) {
        newParams.set(key, val)
      } else {
        newParams.delete(key)
      }

      return `${options?.path || location.pathname}?${newParams.toString()}`
    },
    [location.pathname, searchParams],
  )

  const setParams = useCallback(
    (queries: Partial<T>, options?: ReplaceOptions) => {
      const newParams = new URLSearchParams(searchParams)

      if (options?.resetQueries) {
        options.resetQueries.forEach((key) => {
          newParams.delete(key)
        })
      }

      Object.entries(queries).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, String(value))
        } else {
          newParams.delete(key)
        }
      })

      const newSearch = Object.fromEntries(newParams.entries())

      navigate({
        to: options?.path || location.pathname,
        search: newSearch,
        replace: !options?.push,
      })
    },
    [location.pathname, searchParams, navigate],
  )

  const query: T = (() => {
    const obj: Partial<T> = initialValue

    for (const [k, v] of searchParams.entries()) {
      if (v === 'true' || v === 'false') {
        obj[k as keyof T] = (v === 'true') as T[keyof T]
      } else if (!Number.isNaN(Number(v)) && !v.startsWith('0')) {
        obj[k as keyof T] = Number(v) as T[keyof T]
      } else {
        obj[k as keyof T] = v as T[keyof T]
      }
    }
    return obj as T
  })()

  const resetQuery = useCallback(
    (exceptKeys?: string[]) => {
      const newParams = new URLSearchParams()

      if (exceptKeys) {
        searchParams.forEach((value, key) => {
          if (exceptKeys.includes(key)) {
            newParams.set(key, value)
          }
        })
      }

      const newSearch = Object.fromEntries(newParams.entries())

      navigate({
        to: location.pathname,
        search: newSearch,
        replace: true,
      })
    },
    [location.pathname, searchParams, navigate],
  )

  return {
    setParams,
    getPath,
    query,
    resetQuery,
  }
}
