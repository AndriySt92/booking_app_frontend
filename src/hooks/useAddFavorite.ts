import { useMutation, useQueryClient } from 'react-query'
import { useAppContext, useFavoritesContext } from '../hooks'
import { addFavorites } from '../services/favoritesApi'

const useAddFavorites = (hotelId: string) => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()
  const { addFavoritesIds } = useFavoritesContext()

  return useMutation(() => addFavorites(hotelId), {
    onSuccess: async () => {
      addFavoritesIds(hotelId)
      await queryClient.invalidateQueries('fetchFavorites')
    },
    onError: (error: Error) => {
      const message = error.message || 'Error adding hotel'
      showToast({ message, type: 'ERROR' })
    },
  })
}

export default useAddFavorites
