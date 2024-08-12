import { useMutation } from 'react-query'
import { useAppContext } from '../contexts/AppContext'
import { useBookingContext } from '../contexts/BookingContext'
import { createRoomBooking } from '../services/bookingApi'
import { useNavigate } from 'react-router-dom'

const useCreateRoomBooking = () => {
  const { showToast } = useAppContext()
  const { saveBookingValues } = useBookingContext()
  const navigate = useNavigate()

  return useMutation(createRoomBooking, {
    onSuccess: async () => {
      showToast({ message: 'Booking saved!', type: 'SUCCESS' })

      const date = new Date()
      saveBookingValues('', date, date, 1, 1)

      navigate('/my-bookings')
    },
    onError: (error: Error) => {
      const message = error.message || 'Error creating booking'
      showToast({ message, type: 'ERROR' })
    },
  })
}

export default useCreateRoomBooking
