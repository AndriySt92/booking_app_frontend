import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { HomeCard, Loader } from '../components'
import useGetHotels from '../hooks/useGetHotels'

const Home = () => {
  const limit = 12
  const { hotels, isError, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetHotels(limit)

  const { ref, inView } = useInView({
    threshold: 1,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (isFetching && !isFetchingNextPage) {
    return <Loader />
  }

  return (
    <div>
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p className="text-md sm:text-lg mb-5">Most recent desinations added by our hosts</p>
      <div className="grid">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {hotels.map((hotel) => (
            <HomeCard hotel={hotel} key={hotel._id} />
          ))}
        </div>
      </div>
      {isError && (
        <span className="text-3xl text-red-600 mx-8 block text-center mt-5">
          Occured some error with fetching hotels
        </span>
      )}
      <div ref={ref}></div>
    </div>
  )
}

export default Home
