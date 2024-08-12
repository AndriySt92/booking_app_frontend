import ManageHotelForm from '../forms/manageHotelForms/ManageHotelForm'
import { useCreateHotel } from '../hooks'

const AddHotel = () => {
  const { mutate, isLoading } = useCreateHotel()

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
}

export default AddHotel
