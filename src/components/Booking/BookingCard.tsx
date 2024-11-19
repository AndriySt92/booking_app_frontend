import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useGetHotel } from '../../hooks'

interface Props {
  hotelId: string
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
}

const BookingCard = ({ hotelId, checkIn, checkOut, adultCount, childCount }: Props) => {
  const { data: hotel } = useGetHotel((hotelId as string) || '')

  if (!hotel) {
    return null
  }

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
        <div>
          <div>
            <span className="text-md sm:text-lg font-bold mr-2">Dates: </span>
            <span className="text-md sm:text-lg">
              {new Date(checkIn).toDateString()} - {new Date(checkOut).toDateString()}
            </span>
          </div>
          <div>
            <span className="text-md sm:text-lg font-bold mr-2">Guests:</span>
            <span className="text-md sm:text-lg">
              {adultCount} adults, {childCount} children
            </span>
          </div>
        </div>

        <div>
          <div className="text-md sm:text-lg line-clamp-4">{hotel.description}</div>
        </div>

        <div>
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span
                className="bg-slate-300 px-2 py-1 rounded-lg font-semibold text-xs sm:text-lg whitespace-nowrap"
                key={facility}>
                {facility}
              </span>
            ))}
            <span className="text-xs sm:text-lg">
              {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingCard
