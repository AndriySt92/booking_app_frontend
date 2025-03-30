import { useEffect } from 'react'
import { NotFoundData, Error, SkeletonHotelList, HotelCard, Title, Pagination } from '../components'
import { useGetFavorites, useFavoritesContext, usePagination } from '../hooks'

const LIMIT = 5

const Favorites = () => {
  const { page, handlePageChange, scrollRef } = usePagination()

  const { favoritesIds } = useFavoritesContext()
  const { data, isLoading, isError, isSuccess } = useGetFavorites({ page, limit: LIMIT })

  const hotels = data?.data
  const hasHotels = Boolean(hotels?.length)
  const pages = data?.pagination?.pages

  // Ensure page correction in case removing last item on page
  useEffect(() => {
    if (pages && page > pages) {
      handlePageChange(pages)
    }
  }, [pages, page, handlePageChange])

  if (isLoading) {
    return <SkeletonHotelList />
  }

  return (
    <div className="space-y-7 scroll-m-20 sm:scroll-m-24" ref={scrollRef}>
      <Title as="h1">My Favorite Hotels</Title>

      {/* Favorite hotels list  */}
      {hasHotels &&
        hotels?.map((hotel) => (
          <HotelCard
            key={hotel._id}
            role="searchCard"
            hotel={hotel}
            isFavorite={favoritesIds.includes(hotel._id)}
          />
        ))}

      {/* Favorite hotels data is empty */}
      {!hasHotels && isSuccess && (
        <NotFoundData
          title="You haven't added favorite hotels yet"
          description="Ready for your next adventure? Browse hotels to plan your perfect stay."
        />
      )}

      {/* Error */}
      {isError && (
        <Error message="An error occurred while fetching the data." size="large" center />
      )}

      {/* Pagination */}
      {hasHotels && <Pagination page={page} pages={pages || 1} onPageChange={handlePageChange} />}
    </div>
  )
}

export default Favorites
