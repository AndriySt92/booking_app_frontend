import { useMutation, useQueryClient } from 'react-query'
import { useAppContext } from '../hooks'
import { addFavorites } from '../services/favoritesApi'

const useAddFavorites = (hotelId: string) => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()

  return useMutation(() => addFavorites(hotelId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries('fetchFavorites')
    },
    onError: (error: Error) => {
      const message = error.message || 'Error adding hotel'
      showToast({ message, type: 'ERROR' })
    },
  })
}

export default useAddFavorites
