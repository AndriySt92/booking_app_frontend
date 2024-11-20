import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import { IHotel } from '../../types/hotelTypes'

interface Props {
  hotel: IHotel
  checkIn?: Date
  checkOut?: Date
  adultCount?: number
  childCount?: number
  role: 'searchCard' | 'bookingCard'
}

const HotelCard = ({ hotel, checkIn, checkOut, adultCount, childCount, role }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] custom-shadow-rounded animate-slideIn p-3 md:p-8 gap-4 xl:gap-8">
      <div className="w-full h-[240px] sm:h-[300px]">
        <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" />
      </div>

      <div className="flex flex-col justify-between gap-4 xl:gap-0 h-full">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar className="fill-yellow-400 h-5 w-5" key={index} />
              ))}
            </span>
            <span className="ml-1 text-md sm:text-lg">{hotel.type}</span>
          </div>
          <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer">
            {hotel.name}
          </Link>
        </div>
        {role === 'bookingCard' && (
          <div>
            <div>
              <span className="text-md sm:text-lg font-bold mr-2">Dates: </span>
              <span className="text-md sm:text-lg">
                {new Date(checkIn as Date).toDateString()} -{' '}
                {new Date(checkOut as Date).toDateString()}
              </span>
            </div>
            <div>
              <span className="text-md sm:text-lg font-bold mr-2">Guests:</span>
              <span className="text-md sm:text-lg">
                {adultCount} adults, {childCount} children
              </span>
            </div>
          </div>
        )}

        <div>
          <div className="text-md sm:text-lg line-clamp-4">{hotel.description}</div>
        </div>

        {role === 'searchCard' ? (
          <div className="grid grid-rows-2 grid-cols-1 gap-4 2xl:gap-0 2xl:grid-rows-1 2xl:grid-cols-2 items-end whitespace-nowrap">
            <div className="flex gap-1 items-center">
              {hotel.facilities.slice(0, 3).map((facility) => (
                <span
                  className="bg-slate-300 px-2 py-1 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap"
                  key={facility}>
                  {facility}
                </span>
              ))}
              <span className="text-xs sm:text-sm">
                {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}
              </span>
            </div>

            <div className="flex flex-row items-center justify-between 2xl:flex-col 2xl:items-end gap-1">
              <span className="font-bold">€{hotel.pricePerNight} per night</span>
              <Button
                classes="bg-blue-600 text-white hover:bg-blue-500"
                role="link"
                to={`/detail/${hotel._id}`}>
                View More
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex gap-1 items-center">
              {hotel.facilities.slice(0, 3).map((facility) => (
                <span
                  className="bg-slate-300 px-2 py-1 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap"
                  key={facility}>
                  {facility}
                </span>
              ))}
              <span className="text-xs sm:text-sm">
                {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HotelCard
