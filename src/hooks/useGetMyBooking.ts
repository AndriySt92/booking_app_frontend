import { fetchMyBookings } from '../services/bookingApi'
import { useQuery } from 'react-query'
import { IPaginationParams } from '../types/commonTypes'

const useGetMyBooking = (params: IPaginationParams) => {
  return useQuery(['fetchMyBookings', params], () => fetchMyBookings(params), {
    staleTime: Infinity,
  })
}

export default useGetMyBooking
