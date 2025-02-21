import { useMutation, useQueryClient } from 'react-query'
import { updateMyHotelById } from '../services/my-hotelApi'
import { useAppContext } from '../hooks'
import { useNavigate } from 'react-router-dom'

const useUpdateMyHotel = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()
  const navigate = useNavigate()

  return useMutation(updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'SUCCESS' })

      queryClient.invalidateQueries('fetchMyHotels')
      queryClient.invalidateQueries('fetchHotels')

      navigate('/my-hotels')
    },
    onError: () => {
      showToast({ message: 'Error Saving Hotel', type: 'ERROR' })
    },
  })
}

export default useUpdateMyHotel
