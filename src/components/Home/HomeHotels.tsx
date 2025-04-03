import { IHotel } from '../../types/hotelTypes'
import { HomeHotelCard, Text, Title } from '../'
import { useFavoritesContext } from '../../hooks'

interface Props {
  hotels: IHotel[]
}

const HomeHotels = ({ hotels }: Props) => {
  const { favoritesIds } = useFavoritesContext()

  return (
    <div>
      <Title className="text-center sm:text-left">Latest Destinations</Title>
      <Text className="text-center sm:text-left" weight="normal" size="lg">
        Most recent desinations added by our hosts
      </Text>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-2 sm:mt-4">
        {hotels.map((hotel) => (
          <HomeHotelCard
            hotel={hotel}
            key={hotel._id}
            isFavorite={favoritesIds.includes(hotel._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default HomeHotels
