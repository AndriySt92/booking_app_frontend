// import { useCallback } from 'react'
// import { useSearchParams } from 'react-router-dom'

// const useQueryParams = () => {
//   const [searchParams, setSearchParams] = useSearchParams()

//   const updateQueryParams = useCallback(
//     (params: Record<string, unknown>) => {
//       const newParams = new URLSearchParams(searchParams)
//       Object.entries(params).forEach(([key, value]) => {
//         if (Array.isArray(value)) {
//           if (value.length > 0) {
//             // Join array values into a comma-separated string
//             newParams.set(key, value.join(','))
//           } else {
//             newParams.delete(key)
//           }
//         } else if (value === undefined || value === null || value === '') {
//           newParams.delete(key)
//         } else {
//           newParams.set(key, String(value))
//         }
//       })
//       setSearchParams(newParams)
//     },
//     [searchParams, setSearchParams],
//   )

//   return { searchParams, updateQueryParams }
// }

// export default useQueryParams

import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams])

  const updateQueryParams = useCallback(
    (newParams: Record<string, unknown>) => {
      const updatedParams = new URLSearchParams(searchParams)

      Object.entries(newParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          updatedParams.delete(key)
          value.forEach((v) => updatedParams.append(key, v))
        } else if (value === null || value === undefined || value === '') {
          updatedParams.delete(key)
        } else {
          updatedParams.set(key, String(value))
        }
      })

      setSearchParams(updatedParams, { replace: true })
    },
    [searchParams, setSearchParams],
  )

  return { params, updateQueryParams }
}

export default useQueryParams
