import { fetchMyBookings } from '../services/bookingApi'
import { useQuery } from 'react-query'

const useGetMyBooking = () => {
  return useQuery('fetchMyBookings', fetchMyBookings)
}

export default useGetMyBooking