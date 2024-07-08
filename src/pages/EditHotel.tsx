import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchMyHotelById, updateMyHotelById } from '../services/my-hotelApi'
import ManageHotelForm from '../forms/manageHotelForms/ManageHotelForm'
import { useAppContext } from '../contexts/AppContext'

const EditHotel = () => {
  const { showToast } = useAppContext()
  const { hotelId } = useParams()

  const { data: hotel } = useQuery('fetchHotelById', () => fetchMyHotelById(hotelId || ''), {
    enabled: !!hotelId,
  })
  
  const { mutate, isLoading } = useMutation(updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'SUCCESS' })
    },
    onError: () => {
      showToast({ message: 'Error Saving Hotel', type: 'ERROR' })
    },
  })

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }

  return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
}

export default EditHotel
