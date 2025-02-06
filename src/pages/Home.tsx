import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  Error,
  HomeHotels,
  HomeSlider,
  Loader,
  NotFoundData,
  SkeletonHomePage,
} from '../components'
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

  const isLoading = isFetchingHotels || isFetchingSlider
  const isError = isErrorHotels || isErrorSlider

  const isSliderDataAvailable = hotelsCountriesSummary && hotelsCountriesSummary.length > 0
  const isHotelsDataAvailable = hotels && hotels.length > 0
  const isHotelsDataEmpty = hotels && hotels.length === 0

  // Show skeleton only during the initial loading
  if (isLoading && !isHotelsDataAvailable) {
    return <SkeletonHomePage />
  }

  return (
    <div className="space-y-7">
      {/* Slider section */}
      {isSliderDataAvailable && <HomeSlider hotelsCountriesSummary={hotelsCountriesSummary} />}

      {/* Hotels section */}
      {isHotelsDataAvailable && <HomeHotels hotels={hotels} />}

      {/* Hotels data is empty */}
      {isHotelsDataEmpty && !isError && <NotFoundData title="There are no hotels available" />}

      {/* Loader while fetching next hotels */}
      {isFetchingNextPage && <Loader />}

      {/* Error */}
      {isError && <Error message="An error occurred while fetching the data." center />}

      {/* Load more trigger (infinite scroll) */}
      {isHotelsDataAvailable && <div ref={ref}></div>}
    </div>
  )
}

export default Home
