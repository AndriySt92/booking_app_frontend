import { useEffect } from 'react'
import HomeCard from '../Common/HomeCard'
import { useGetHotels } from '../../hooks'
import { useInView } from 'react-intersection-observer'
import Loader from '../Common/Loader'
import Error from '../Common/Error'

const LIMIT = 12

const HotelList = () => {
  const {
    hotels,
    isError: isError,
    isFetching: isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetHotels(LIMIT)

  const { ref, inView } = useInView({
    threshold: 1,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (isFetching || isFetchingNextPage) {
    return <Loader />
  }

  return (
    <div>
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p className="sm:text-lg mb-5">Most recent desinations added by our hosts</p>
      <div className="grid">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {hotels.map((hotel) => (
            <HomeCard hotel={hotel} key={hotel._id} />
          ))}
        </div>
      </div>
      <div ref={ref}></div>

      {!isError && (
        <div className="text-center">
          <Error message="An error occurred while fetching the data." />
        </div>
      )}
    </div>
  )
}

export default HotelList
