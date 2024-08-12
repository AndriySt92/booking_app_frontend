import { useInfiniteQuery } from 'react-query'
import { fetchHotels } from '../services/hotelApi'

const useGetHotels = (limit: number) => {
  const queryResult = useInfiniteQuery(
    ['fetchHotels'],
    ({ pageParam = 1 }) => fetchHotels(pageParam, limit),
    {
      getNextPageParam: (lastPage, allPages) => {
        const morePagesExist = lastPage.hotels.length === limit
        if (!morePagesExist) return undefined
        return allPages.length + 1 // return the next page number
      },
      staleTime: 5000,
    },
  )
  // Extract hotels from all pages
  const hotels = queryResult.data?.pages.flatMap((page) => page.hotels) || []

  return {
    ...queryResult,
    hotels,
  }
}

export default useGetHotels
