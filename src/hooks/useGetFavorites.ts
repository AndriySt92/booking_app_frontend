import { useQuery } from 'react-query'
import { fetchFavorites } from '../services/favoritesApi'
import { useAppContext } from '../hooks'
import { IPaginationParams } from '../types/commonTypes'

const useGetFavorites = (params: IPaginationParams) => {
  const { showToast } = useAppContext()

  return useQuery(['fetchFavorites', params], () => fetchFavorites(params), {
    onError: (error: Error) => {
      const message = error.message || 'Error fetching favorite hotels'
      showToast({ message, type: 'ERROR' })
    },
    staleTime: Infinity,
  })
}

export default useGetFavorites
