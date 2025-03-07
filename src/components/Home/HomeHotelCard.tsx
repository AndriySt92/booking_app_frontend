import { useNavigate } from 'react-router-dom'
import { IHotel } from '../../types/hotelTypes'
import { AiFillStar } from 'react-icons/ai'
import { HotelImage } from '../'

interface Props {
  hotel: IHotel
  isFavorite: boolean
}

const HomeHotelCard = ({ hotel, isFavorite }: Props) => {
  const { _id, name, imageUrls, city, country, starRating } = hotel
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/detail/${_id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer animate-slideIn group custom-shadow-rounded">
      <HotelImage imageUrl={imageUrls[0]} isFavorite={isFavorite} hotelId={hotel._id} />

      <div className="absolute bottom-0 flex justify-between px-2 py-1 bg-black bg-opacity-40 w-full rounded-b-xl">
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-tight">{name}</span>
          <span className="text-white  tracking-tight">
            {city}, {country}
          </span>
        </div>
        <div className="flex justify-center items-center ">
          {Array.from({ length: starRating }).map((_, i) => (
            <AiFillStar className="fill-yellow-400" key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeHotelCard
