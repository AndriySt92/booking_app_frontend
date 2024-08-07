import { useMutation } from 'react-query'
import { updateMyHotelById } from '../services/my-hotelApi'
import { useAppContext } from '../contexts/AppContext'

const useUpdateMyHotel = () => {
    const { showToast } = useAppContext()

  return useMutation(updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'SUCCESS' })
    },
    onError: () => {
      showToast({ message: 'Error Saving Hotel', type: 'ERROR' })
    },
  })
}

export default useUpdateMyHotel