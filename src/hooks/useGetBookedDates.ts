import { fetchBookedDates } from '../services/hotelApi'
import { useQuery } from 'react-query'

const useGetBookedDates = (hotelId: string) => {
  return useQuery('fetchBookedDates', () => fetchBookedDates(hotelId || ''), {
    enabled: !!hotelId,
    staleTime: 1000
  })
}

export default useGetBookedDates
