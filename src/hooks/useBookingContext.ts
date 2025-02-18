import { useContext } from 'react'
import BookingContext from '../contexts/BookingContext'

const useBookingContext = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingContextProvider')
  }
  return context
}

export default useBookingContext
