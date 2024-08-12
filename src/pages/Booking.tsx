import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { useAppContext } from '../contexts/AppContext'
import { useBookingContext } from '../contexts/BookingContext'
import BookingForm from '../forms/bookingForm/BookingForm'
import { BookingDetailsSummary } from '../components'
import { useGetCurrentUser, useGetHotel, useGetPaymentIntendData } from '../hooks'

const Booking = () => {
  const [numberOfNights, setNumberOfNights] = useState<number>(0)
  const { hotelId } = useParams()
  const { stripePromise } = useAppContext()
  const booking = useBookingContext()

  const { data: currentUser } = useGetCurrentUser()
  const { data: hotel } = useGetHotel(hotelId as string || '')
  const { data: paymentIntentData } = useGetPaymentIntendData({
    hotelId: hotelId as string || '',
    numberOfNights,
  })

  useEffect(() => {
    if (booking.checkIn && booking.checkOut) {
      const nights =
        Math.abs(booking.checkOut.getTime() - booking.checkIn.getTime()) / (1000 * 60 * 60 * 24)

      setNumberOfNights(Math.ceil(nights))
    }
  }, [booking.checkIn, booking.checkOut])

  if (!hotel) {
    return null
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={booking.checkIn}
        checkOut={booking.checkOut}
        adultCount={booking.adultCount}
        childCount={booking.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}>
          <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
        </Elements>
      )}
    </div>
  )
}

export default Booking
