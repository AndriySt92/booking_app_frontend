import { useState, useCallback, useRef } from 'react'

const INITIAL_PAGE = 1

const usePagination = () => {
  const [page, setPage] = useState<number>(INITIAL_PAGE)
  const scrollRef = useRef<HTMLDivElement>(null)

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
