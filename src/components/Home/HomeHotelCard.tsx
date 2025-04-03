import { useNavigate } from 'react-router-dom'
import { IHotel } from '../../types/hotelTypes'
import { Button, HotelImage, StarRating, Text, Title } from '../'

interface Props {
  hotel: IHotel
  isFavorite: boolean
}

const HomeHotelCard = ({ hotel, isFavorite }: Props) => {
  const { _id, name, imageUrls, city, country, starRating, pricePerNight, facilities, type } = hotel
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/detail/${_id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group">
      {/* Hotel Image */}
      <HotelImage
        imageUrl={imageUrls[0]}
        isFavorite={isFavorite}
        hotelId={hotel._id}
        className="rounded-b-none"
      />

      {/* Hotel Info */}
      <div className="space-y-1 bg-white p-4 rounded-b-lg">
        <div className="">
          <div className="flex justify-between items-baseline">
            <div className="line-clamp-1 basis-[80%] mr-2">
              <Title color="gradient" size="sm" as="h4">
                {name}
              </Title>
            </div>
            <Text
              className="!whitespace-nowrap !font-semibold sm:!font-normal"
              weight="semibold"
              size="md">
              {pricePerNight}€ / night
            </Text>
          </div>
          <Text weight="semibold" size="base">
            {city}, {country}
          </Text>
        </div>

        {/* Additional Info */}
        <div className="space-y-2">
          <Text color="gray-600" size="sm">
            {type} • {facilities.slice(0, 2).join(', ')}...
          </Text>
        </div>

        {/* Star Rating with Animated Color Change */}
        <div className="flex justify-between items-center">
          <StarRating starRating={starRating} />

          {/* Hover Button */}
          <div className="align-bottom opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button className="!px-4 !py-2 bg-blue-600 text-white !rounded-full !text-sm hidden md:block">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHotelCard
