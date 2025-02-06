const SkeletonHomePage = () => {
  return (
    <div className="animate-pulse space-y-7">
      {[...Array(2)].map((_, i) => (
        <div key={i}>
          {/* Title & subtitle */}
          <div className="h-7 w-[300px] bg-gray-200 rounded-lg" />
          <div className="h-5 w-[350px] mt-2 mb-4 bg-gray-200 rounded-lg" />

          {/* List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {[...Array(3)].map((_, j) => (
              <div
                key={j}
                className={`w-full h-[300px] bg-gray-200 rounded-lg ${
                  j === 0 ? 'block' : j === 1 ? 'hidden lg:block' : 'hidden xl:block'
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonHomePage
