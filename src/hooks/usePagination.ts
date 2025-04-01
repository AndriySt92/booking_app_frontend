import { useState, useCallback, useRef, useEffect } from 'react'
import useQueryParams from './useQueryParams'

const usePagination = () => {
  const { params, updateQueryParams } = useQueryParams()
  const [page, setPage] = useState<number>(() => {
    const pageParam = params.page
    return pageParam && !isNaN(Number(pageParam)) ? Math.max(1, Number(pageParam)) : 1
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateQueryParams({ page })
  }, [updateQueryParams, page])

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)

    // Scroll to the referenced div
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [])

  return {
    page,
    setPage,
    scrollRef,
    handlePageChange,
  }
}

export default usePagination
