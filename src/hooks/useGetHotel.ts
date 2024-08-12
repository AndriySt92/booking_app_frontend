import { useQuery } from 'react-query'
import { fetchHotelById } from '../services/hotelApi'
import { useAppContext } from '../contexts/AppContext'

const useGetHotel = (hotelId: string) => {
  const { showToast } = useAppContext()

  return useQuery(['fetchHotelById', hotelId], () => fetchHotelById(hotelId || ''), {
    enabled: !!hotelId,
    onError: () => {
      showToast({ message: 'Error fetching hotel', type: 'ERROR' })
    },
    staleTime: Infinity
  })
}

export default useGetHotel
