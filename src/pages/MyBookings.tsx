import { useQuery } from 'react-query'
import { fetchMyBookings } from '../services/bookingApi'
import { BookingCard, Loader } from '../components'

const MyBookings = () => {
  const { data: bookings, isLoading, isError } = useQuery('fetchMyBookings', fetchMyBookings)
  
  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {bookings && bookings.length === 0 && (
        <span className="text-3xl mx-8 block text-center mt-5">No bookings found</span>
      )}
      {bookings &&
        bookings.map(({ hotelId, checkIn, checkOut, adultCount, childCount }) => (
          <BookingCard
            key={adultCount}
            hotelId={hotelId}
            checkIn={checkIn}
            checkOut={checkOut}
            childCount={childCount}
            adultCount={adultCount}
          />
        ))}
      {isError && (
        <span className="text-3xl text-red-600 mx-8 block text-center mt-5">
          Occured some error with fetching bookings
        </span>
      )}
    </div>
  )
}

export default MyBookings
