import { SkeletonHotelCard } from '..'

const SkeletonHotelList = () => {
  return (
    <div className="space-y-7">
      {/* Title */}
      <div className="h-7 w-32 bg-gray-200 rounded" />

      {/* My bookings list  */}
      {[...Array(5)].map((_, i) => (
        <SkeletonHotelCard key={i} role="bookingCard" />
      ))}
    </div>
  )
}

export default SkeletonHotelList
