import { useParams } from 'react-router-dom'
import ManageHotelForm from '../forms/manageHotelForms/ManageHotelForm'
import { useGetHotel, useUpdateMyHotel } from '../hooks'

const EditHotel = () => {
  const { hotelId } = useParams()
  const { data: hotel } = useGetHotel(hotelId as string || '')
  const { mutate, isLoading } = useUpdateMyHotel()

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }

  return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} title='edit' />
}

export default EditHotel
