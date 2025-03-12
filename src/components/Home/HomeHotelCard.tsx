import { useNavigate } from 'react-router-dom'
import { IHotel } from '../../types/hotelTypes'
import { AiFillStar } from 'react-icons/ai'
import { Button, HotelImage, Text, Title } from '../'

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
          <div className="flex justify-between items-center">
            <Title className="line-clamp-1 basis-[80%]" size="sm" as='h4'>
              {name}
            </Title>
            <Text className="!whitespace-nowrap font-semibold sm:!font-normal" size="md">
              {pricePerNight}€ / night
            </Text>
          </div>
          <Text className="!text-base font-semibold">
            {city}, {country}
          </Text>
        </div>

        {/* Additional Info */}
        <div className="space-y-2">
          <Text className="opacity-80 text-sm">
            {type} • {facilities.slice(0, 2).join(', ')}...
          </Text>
        </div>

        {/* Star Rating with Animated Color Change */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            {Array.from({ length: starRating }).map((_, i) => (
              <AiFillStar
                key={i}
                className="star-animation transition-transform duration-300 text-yellow-500"
                style={{ animationDelay: `${i * 0.3}s` }}
                size={20}
              />
            ))}
          </div>

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
