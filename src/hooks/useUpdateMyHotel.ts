import { useMutation, useQueryClient } from 'react-query'
import { updateMyHotelById } from '../services/my-hotelApi'
import { useAppContext } from '../hooks'

const useUpdateMyHotel = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()

  return useMutation(updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'SUCCESS' })

      queryClient.invalidateQueries('fetchMyHotels')
      queryClient.invalidateQueries('fetchHotels')
    },
    onError: () => {
      showToast({ message: 'Error Saving Hotel', type: 'ERROR' })
    },
  })
}

export default useUpdateMyHotel
