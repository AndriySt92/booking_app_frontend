import { NotFoundData, Error, SkeletonHotelList, HotelCard } from '../components'
import { useGetFavorites, useFavoritesContext } from '../hooks'

const Favorites = () => {
  const { data: favorites, isLoading: isLoading, isError: isError } = useGetFavorites()
  const { favoritesIds } = useFavoritesContext()

  if (isLoading) {
    return <SkeletonHotelList />
  }

  return (
    <div className="space-y-7">
      <h1 className="text-3xl font-bold">My Favorite Hotels</h1>

      {/* Favorite hotels list  */}
      {favorites &&
        favorites.map((hotel) => (
          <HotelCard
            key={hotel._id}
            role="searchCard"
            hotel={hotel}
            isFavorite={favoritesIds.includes(hotel._id)}
          />
        ))}

      {/* Favorite hotels data is empty */}
      {favorites?.length === 0 && (
        <NotFoundData
          title="You haven't added favorite hotels yet"
          description="Ready for your next adventure? Browse hotels to plan your perfect stay."
        />
      )}

      {/* Error */}
      {isError && (
        <Error message="An error occurred while fetching the data." size="large" center />
      )}
    </div>
  )
}

export default Favorites
