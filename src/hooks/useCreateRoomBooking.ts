import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { useBookingContext, useAppContext } from '.'
import { createRoomBooking } from '../services/bookingApi'

const useCreateRoomBooking = () => {
  const { showToast } = useAppContext()
  const { saveBookingValues } = useBookingContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation(createRoomBooking, {
    onSuccess: async () => {
      showToast({ message: 'Booking saved!', type: 'SUCCESS' })

      // Invalidate the "fetchMyBookings" query to trigger a refetch
      await queryClient.invalidateQueries('fetchMyBookings')

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
