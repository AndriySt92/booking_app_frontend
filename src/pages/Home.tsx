import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Error, HomeHotels, HomeSlider, Loader } from '../components'
import { useGetHotelsCountriesSummery, useGetHotels } from '../hooks'

const LIMIT = 12

const Home = () => {
  const {
    hotels,
    isError: isErrorHotels,
    isFetching: isFetchingHotels,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetHotels(LIMIT)

  const {
    data: hotelsCountriesSummary,
    isFetching: isFetchingSlider,
    isError: isErrorSlider,
  } = useGetHotelsCountriesSummery(LIMIT)

  const { ref, inView } = useInView({
    threshold: 1,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const isLoading = isFetchingHotels || isFetchingSlider || isFetchingNextPage
  const isError = isErrorHotels || isErrorSlider

  return (
    <div className="space-y-7">
      {hotelsCountriesSummary?.length && (
        <HomeSlider hotelsCountriesSummary={hotelsCountriesSummary} />
      )}
      {hotels?.length && <HomeHotels hotels={hotels} />}

      {isLoading && <Loader />}

      {isError && (
        <div className="text-center">
          <Error message="An error occurred while fetching the data." />
        </div>
      )}

      {!hotels?.length && !hotelsCountriesSummary?.length && (
        <div className="text-center text-2xl">No data available</div>
      )}

      {hotels.length && <div ref={ref}></div>}
    </div>
  )
}

export default Home
