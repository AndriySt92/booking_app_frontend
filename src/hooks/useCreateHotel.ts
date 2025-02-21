import { useMutation, useQueryClient } from 'react-query'
import { useAppContext } from '../hooks'
import { addMyHotel } from '../services/my-hotelApi'
import { useNavigate } from 'react-router-dom'

const useCreateHotel = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()
  const navigate = useNavigate()

  return useMutation(addMyHotel, {
    onSuccess: () => {
      showToast({ message: 'Hotel saved!', type: 'SUCCESS' })

      queryClient.invalidateQueries('fetchMyHotels')
      queryClient.invalidateQueries('fetchHotels')

      navigate('/my-bookings')
    },
    onError: (error: Error) => {
      const message = error.message || 'Error saving hotel'
      showToast({ message, type: 'ERROR' })
    },
  })
}

export default useCreateHotel
