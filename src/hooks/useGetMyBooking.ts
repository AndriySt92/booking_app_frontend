import { fetchMyBookings } from '../services/bookingApi'
import { useQuery } from 'react-query'

const useGetMyBooking = () => {
  return useQuery('fetchMyBookings', fetchMyBookings, {
    staleTime: Infinity,
  })
}

export default useGetMyBooking
