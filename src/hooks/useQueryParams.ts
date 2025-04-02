import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Convert URLSearchParams to a plain object with decoded values.
  const params = useMemo(() => {
    const decodedEntries = Array.from(searchParams.entries()).map(([key, value]) => [
      key,
      decodeURIComponent(value),
    ])
    return Object.fromEntries(decodedEntries)
  }, [searchParams])

  // Update query parameters with new values.
  const updateQueryParams = useCallback(
    (newParams: Record<string, unknown>) => {
      const updatedParams = new URLSearchParams(searchParams)

      Object.entries(newParams).forEach(([key, value]) => {
        // Remove the key from the query, if value is falsy or an empty array
        if (!value || (Array.isArray(value) && value.length === 0)) {
          updatedParams.delete(key)
          return
        }

        // Set the query parameter
        updatedParams.set(
          key,
          Array.isArray(value)
            ? encodeURIComponent(value.join(','))
            : encodeURIComponent(String(value)),
        )
      })
      setSearchParams(updatedParams, { replace: true })
    },
    [searchParams, setSearchParams],
  )

  // Retrieve a query parameter as an array of strings.
  const getArrayParam = useCallback((value: string): string[] => {
    if (!value) return []
    return value.split(',').map(decodeURIComponent)
  }, [])

  return { params, updateQueryParams, getArrayParam }
}

export default useQueryParams
