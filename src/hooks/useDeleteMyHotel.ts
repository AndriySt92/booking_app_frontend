import { useMutation, useQueryClient } from 'react-query'
import { useAppContext } from '../hooks'
import { deleteMyHotel } from '../services/my-hotelApi'

const useDeleteMyHotel = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()

  return useMutation(deleteMyHotel, {
    onSuccess: async () => {
      showToast({ message: 'Hotel deleted successfully', type: 'SUCCESS' })

      queryClient.invalidateQueries('fetchMyHotels')  
      queryClient.invalidateQueries('fetchHotels') 
    },
    onError: (error: Error) => {
      const message = error.message || 'Error deleting hotel'
      showToast({ message, type: 'ERROR' })
    },
  })
}

export default useDeleteMyHotel
