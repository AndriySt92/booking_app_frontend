interface Props {
  role: 'searchCard' | 'bookingCard'
}

const SkeletonHotelCard = ({ role }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] custom-shadow-rounded p-3 md:p-8 gap-4 xl:gap-8 animate-pulse">
      {/* Image */}
      <div className="w-full h-[240px] sm:h-[300px] bg-gray-200 rounded-lg" />

      {/* Content */}
      <div className="flex flex-col justify-between gap-4 xl:gap-0 h-full">
        <div className="space-y-4">
          {/* Star rating & type */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          {/* Title */}
          <div className="h-7 w-[200px] bg-gray-200 rounded" />

          {/* Booking info */}
          {role === 'bookingCard' && (
            <div className="flex flex-col gap-2">
              <div className="h-5 bg-gray-200 rounded-full w-3/5" />
              <div className="h-5 bg-gray-200 rounded-full w-2/5" />
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>

        {/* Facilities & Price */}
        <div className="flex flex-col gap-4 sm:gap-2 sm:flex-row justify-between sm:items-end">
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-gray-200 rounded-lg" />
            ))}
          </div>

          {role === 'searchCard' && (
            <div className="flex flex-row sm:flex-col gap-2 justify-between sm:items-end">
              <div className="h-6 w-24 bg-gray-200 rounded" />
              <div className="h-8 w-28 bg-gray-200 rounded" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SkeletonHotelCard
