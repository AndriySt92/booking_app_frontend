import {
  BookingItem,
  NotFoundData,
  Error,
  SkeletonHotelList,
  Title,
  Pagination,
} from '../components'
import { useFavoritesContext, useGetMyBooking, usePagination } from '../hooks'

const LIMIT = 5

const MyBookings = () => {
  const { page, handlePageChange, scrollRef } = usePagination()

  const { data, isLoading, isError, isSuccess } = useGetMyBooking({ page, limit: LIMIT })
  const { favoritesIds } = useFavoritesContext()

  if (isLoading) {
    return <SkeletonHotelList />
  }

  const bookings = data?.data
  const hasBookings = Boolean(bookings?.length)

  return (
    <div className="space-y-7 scroll-m-20 sm:scroll-m-24" ref={scrollRef}>
      <Title as="h1">My Bookings</Title>

      {/* My booking list  */}
      {hasBookings &&
        bookings?.map(({ hotelId, checkIn, checkOut, adultCount, childCount }, i) => (
          <BookingItem
            key={`${hotelId}_${i}`}
            hotelId={hotelId}
            checkIn={checkIn}
            checkOut={checkOut}
            childCount={childCount}
            adultCount={adultCount}
            isFavorite={favoritesIds.includes(hotelId)}
          />
        ))}

      {/* My booking data is empty */}
      {!hasBookings && isSuccess && (
        <NotFoundData
          title="Your booking history is empty"
          description="Ready for your next adventure? Browse hotels to plan your perfect stay."
        />
      )}

      {/* Error */}
      {isError && (
        <Error message="An error occurred while fetching the data." size="large" center />
      )}

      {/* Pagination */}
      {hasBookings && (
        <Pagination
          page={page}
          pages={data?.pagination.pages || 1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default MyBookings
