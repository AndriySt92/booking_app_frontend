const SkeletonMyHotels = () => {
  return (
    <div className="space-y-7 animate-pulse">
      {/* Page title & Button */}
      <div className="flex justify-between">
        <div className="h-8 w-[200px] bg-gray-200 rounded" />
        <div className="h-8 sm:h-10 w-28 bg-gray-200 rounded" />
      </div>

      {/* Hotel content */}
      <div className="grid grid-cols-1 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            className="flex flex-col justify-between p-3 md:p-8 gap-5 sm:text-lg custom-shadow-rounded"
            key={i}>
            {/* Title */}
            <div className="h-7 w-[200px] bg-gray-200 rounded" />

            {/* Description */}
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-200 rounded-full" />
              ))}
            </div>

            {/* Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-lg" />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex  justify-between sm:justify-end gap-4">
              <div className="h-8 sm:h-10 w-28 bg-gray-200 rounded" />
              <div className="h-8 sm:h-10 w-28 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkeletonMyHotels
