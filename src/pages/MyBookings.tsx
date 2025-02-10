import { BookingItem, NotFoundData, Error, SkeletonMyBookings } from '../components'
import { useGetMyBooking } from '../hooks'

const MyBookings = () => {
  const { data: bookings, isLoading, isError } = useGetMyBooking()

  if (isLoading) {
    return <SkeletonMyBookings />
  }

  return (
    <div className="space-y-7">
      <h1 className="text-3xl font-bold">My Bookings</h1>

      {/* My booking list  */}
      {bookings &&
        bookings.map(({ hotelId, checkIn, checkOut, adultCount, childCount }) => (
          <BookingItem
            key={adultCount}
            hotelId={hotelId}
            checkIn={checkIn}
            checkOut={checkOut}
            childCount={childCount}
            adultCount={adultCount}
          />
        ))}

      {/* My booking data is empty */}
      {bookings?.length === 0 && !isError && (
        <NotFoundData
          title="Your booking history is empty"
          description="Ready for your next adventure? Browse hotels to plan your perfect stay."
        />
      )}

      {/* Error */}
      {isError && (
        <Error message="An error occurred while fetching the data." size="large" center />
      )}
    </div>
  )
}

export default MyBookings
