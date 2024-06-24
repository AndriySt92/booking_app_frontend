import { useMutation } from 'react-query'
import ManageHotelForm from '../forms/manageHotelForms/ManageHotelForm'
import { useAppContext } from '../contexts/AppContext'
import { addMyHotel } from '../services/my-hotelApi'

const AddHotel = () => {
  const { showToast } = useAppContext()

  const { mutate, isLoading } = useMutation(addMyHotel, {
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'SUCCESS' })
    },
    onError: (error) => {
      showToast({ message: 'Error Saving Hotel', type: 'ERROR' })
    },
  })

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
}

export default AddHotel
