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

  const isSliderDataAvailible = hotelsCountriesSummary && hotelsCountriesSummary.length > 0
  const isHotelsDataAvailible = hotels && hotels.length > 0
  const isHotelsDataEmpty = hotels && hotels.length === 0

  return (
    <div className="space-y-7">
      {/* Slider section */}
      {isSliderDataAvailible && <HomeSlider hotelsCountriesSummary={hotelsCountriesSummary} />}

      {/* Hotels section */}
      {isHotelsDataAvailible && <HomeHotels hotels={hotels} />}

      {/* No data available */}
      {isHotelsDataEmpty && !isLoading && (
        <div className="text-center text-2xl">No data available</div>
      )}

      {/* Loader */}
      {isLoading && <Loader />}

      {/* Error */}
      {isError && <Error message="An error occurred while fetching the data." center />}

      {/* Load more trigger (infinite scroll) */}
      {isHotelsDataAvailible && <div ref={ref}></div>}
    </div>
  )
}

export default Home
