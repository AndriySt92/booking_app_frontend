import { useAppContext } from '../contexts/AppContext'
import { deleteMyHotel } from '../services/my-hotelApi'
import { useMutation, useQueryClient } from 'react-query'

const useDeleteMyHotel = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()

  return useMutation(deleteMyHotel, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('fetchMyHotels')
      showToast({ message: 'Hotel deleted successfully', type: 'SUCCESS' })
    },
    onError: (error: Error) => {
      let message = error.message || 'Error deleting hotel'
      showToast({ message, type: 'ERROR' })
    },
  })
}

export default useDeleteMyHotel
