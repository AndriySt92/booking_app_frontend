import { Link } from 'react-router-dom'
import { IHotel } from '../../types/hotelTypes'
import { AiFillStar } from 'react-icons/ai'

interface Props {
  hotel: IHotel
}

const HomeHotelCard = ({ hotel }: Props) => {
  const { _id, name, imageUrls, city, country, starRating } = hotel

  return (
    <Link
      to={`/detail/${_id}`}
      className="relative cursor-pointer animate-slideIn group custom-shadow-rounded">
      <div className="h-[300px] group-hover:animate-flash shadow-lg rounded-xl overflow-hidden">
        <img
          src={imageUrls[0]}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
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
    </Link>
  )
}

export default HomeHotelCard
