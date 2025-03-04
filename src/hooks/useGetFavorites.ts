import { useQuery } from 'react-query'
import { fetchFavorites } from '../services/favoritesApi'
import { useAppContext } from '../hooks'

const useGetFavorites = () => {
  const { showToast } = useAppContext()

  return useQuery('fetchFavorites', fetchFavorites, {
    onError: (error: Error) => {
      const message = error.message || 'Error fetching favorite hotels'
      showToast({ message, type: 'ERROR' })
    },
    staleTime: Infinity,
  })
}

export default useGetFavorites
