const SkeletonHotelDetailsPage = () => {
  return (
    <div className="space-y-7">
      {/* Title & Hotel stars */}
      <div className="space-y-2">
        <div className="h-7 w-[200px] bg-gray-200 rounded" />
        <div className="h-5 w-28 bg-gray-200 rounded" />
      </div>

      {/* Gallery */}
      <div className="grid min-h-[350px] sm:min-h-[400px] lg:min-h-[700px] gap-2 sm:grid-cols-12 sm:grid-rows-5 sm:gap-4 grid-cols-10 grid-rows-5">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`group 
            ${i === 0 ? 'sm:col-span-8 sm:row-span-4 col-span-10 row-span-4' : ''} 
            ${i === 1 ? 'sm:col-span-4 sm:row-span-2 sm:col-start-9 col-span-2 row-start-5' : ''} 
            ${
              i === 2
                ? 'sm:col-span-4 sm:row-span-2 sm:col-start-9 sm:row-start-3 col-span-2 col-start-3 row-start-5'
                : ''
            } 
            ${i > 2 ? 'sm:col-span-2 sm:row-start-5 sm:col-start-auto col-span-2' : ''} 
            ${
              i > 5
                ? 'hidden sm:block sm:col-span-2 sm:row-start-5' /* Hide images after the 6th for screens under `sm` */
                : ''
            } 
            ${
              i > 8
                ? 'block sm:hidden sm:col-span-2 sm:row-start-5' /* Hide images after the 9th for screens above `sm` */
                : ''
            } 
          `}>
            <div className="bg-gray-200 rounded-md w-full h-full" />
          </div>
        ))}
      </div>

      {/* Description & Booking form */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="h-[280px] bg-gray-200" />
      </div>

      {/* Calendar Skeleton */}
      <div className="w-full space-y-3 pt-5">
        <div className="h-8 w-64 bg-gray-200 rounded-lg" />
        <div className="h-6 w-32 bg-gray-200 rounded-lg" />
        <div className="h-6 w-32 bg-gray-200 rounded-lg" />
        <div className="w-full min-h-[250px] sm:min-h-[350px] lg:min-h-[500px] bg-gray-200 rounded" />
      </div>
    </div>
  )
}

export default SkeletonHotelDetailsPage
