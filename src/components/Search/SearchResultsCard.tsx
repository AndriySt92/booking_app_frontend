import { Link } from 'react-router-dom'
import { IHotel } from '../../types/hotelTypes'
import { AiFillStar } from 'react-icons/ai'
import Button from '../Button'

interface Props {
  hotel: IHotel
}

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-3 md:p-8 gap-8">
      <div className="w-full h-[300px]">
        <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" />
      </div>
      
      <div className="grid gap-4 md:grid-rows-[1fr_2fr_1fr] md:gap-0">
        <div>
          <div className="flex items-center">
            {/* <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar className="fill-yellow-400" key={index} />
              ))}
            </span> */}
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer">
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="grid grid-rows-2 grid-cols-1 gap-4 md:gap-0 md:grid-rows-1 md:grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap" key={facility}>
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}
            </span>
          </div>

          <div className="flex flex-row items-center justify-between md:flex-col md:items-end gap-1">
            <span className="font-bold">€{hotel.pricePerNight} per night</span>
            <Button classes='bg-blue-600 text-white hover:bg-blue-500' role='link' to={`/detail/${hotel._id}`}>View More</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsCard
