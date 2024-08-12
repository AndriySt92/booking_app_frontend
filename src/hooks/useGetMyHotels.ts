import { useQuery } from 'react-query'
import { fetchMyHotels } from '../services/my-hotelApi'
import { useAppContext } from '../contexts/AppContext'

const useGetMyHotels = () => {
  const { showToast } = useAppContext()

  return useQuery('fetchMyHotels', fetchMyHotels, {
    onError: (error: Error) => {
      const message = error.message || 'Error fetching my hotel'
      showToast({ message, type: 'ERROR' })
    },
    staleTime: Infinity
  })
}

export default useGetMyHotels