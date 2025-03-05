import { useMutation, useQueryClient } from 'react-query'
import { useAppContext, useFavoritesContext } from '../hooks'
import { removeFavorites } from '../services/favoritesApi'

const useRemoveFavorite = (hotelId: string) => {
  const { showToast } = useAppContext()
  const { removeFavoritesIds } = useFavoritesContext()
  const queryClient = useQueryClient()

  return useMutation(() => removeFavorites(hotelId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries('fetchFavorites')
      removeFavoritesIds(hotelId)
    },
    onError: (error: Error) => {
      const message = error.message || 'Error removing hotel from favorite'
      showToast({ message, type: 'ERROR' })
    },
  })
}

export default useRemoveFavorite
