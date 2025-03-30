import { useQuery } from 'react-query'
import { fetchMyHotels } from '../services/my-hotelApi'
import { useAppContext } from '../hooks'
import { IPaginationParams } from '../types/commonTypes'

const useGetMyHotels = (params: IPaginationParams) => {
  const { showToast } = useAppContext()

  return useQuery(['fetchMyHotels', params], () => fetchMyHotels(params), {
    onError: (error: Error) => {
      const message = error.message || 'Error fetching my hotel'
      showToast({ message, type: 'ERROR' })
    },
    staleTime: Infinity,
  })
}

export default useGetMyHotels
