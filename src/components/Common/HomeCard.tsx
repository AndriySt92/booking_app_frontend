import { Link } from 'react-router-dom'
import { IHotel } from '../../types/hotelTypes'
import { AiFillStar } from 'react-icons/ai'

interface Props {
  hotel: IHotel
}

const HomeCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md shadow-[0px_6px_20px_3px_#00000024] animate-slideIn">
      <div className="h-[300px]">
        <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" />
        <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center items-center h-full w-full overflow-hidden bg-white bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-20"></div>
      </div>
      <div className="absolute bottom-0 flex justify-between px-2 py-1 bg-black bg-opacity-40 w-full rounded-b-md">
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-tight text-md">{hotel.name}</span>
          <span className="text-white  tracking-tight text-md">
            {hotel.city}, {hotel.country}
          </span>
        </div>
        <div className="flex justify-center items-center ">
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <AiFillStar className="fill-yellow-400" key={i} />
          ))}
        </div>
      </div>
    </Link>
  )
}

export default HomeCard
