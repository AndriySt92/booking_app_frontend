import { useQuery } from 'react-query'
import { fetchFavoriteHotelIds } from '../services/favoritesApi'
import { useAppContext } from '.'

const useGetFavoriteIds = () => {
  const { showToast } = useAppContext()

  return useQuery('fetchFavoriteHotelIds', fetchFavoriteHotelIds, {
    onError: (error: Error) => {
      const message = error.message || 'Error fetching favorite hotel ids'
      showToast({ message, type: 'ERROR' })
    },
    staleTime: Infinity,
  })
}

export default useGetFavoriteIds
