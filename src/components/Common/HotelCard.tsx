import { Link } from 'react-router-dom'
import { Button, HotelImage, StarRating } from '../'
import { IHotel } from '../../types/hotelTypes'

interface CommonProps {
  hotel: IHotel
  isFavorite: boolean
}

interface SearchOrFavoritesProps extends CommonProps {
  role: 'searchCard' | 'favoritesCard'
}

interface BookingProps extends CommonProps {
  role: 'bookingCard'
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
}

type Props = SearchOrFavoritesProps | BookingProps

const HotelCard = (props: Props) => {
  const { hotel, isFavorite, role } = props

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] custom-shadow-rounded animate-slideIn p-3 md:p-8 gap-4 xl:gap-8 rounded-2xl shadow-lg hover:shadow-xl">
      {/* Hotel Image */}
      <HotelImage imageUrl={hotel.imageUrls[0]} isFavorite={isFavorite} hotelId={hotel._id} />

      {/* Hotel Name and Rating */}
      <div className="flex flex-col justify-between gap-4 xl:gap-0 h-full">
        <div>
          <div className="flex items-center">
            <StarRating starRating={hotel.starRating} />

            <span className="text-lg ml-3 font-medium text-gray-600">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent cursor-pointer">
            {hotel.name}
          </Link>
        </div>

        {/* Booking Info (only for `bookingCard`) */}
        {role === 'bookingCard' && (
          <div>
            <div>
              <span className="sm:text-lg font-bold mr-2">Dates: </span>
              <span className="sm:text-lg">
                {new Date(props.checkIn).toDateString()} - {new Date(props.checkOut).toDateString()}
              </span>
            </div>
            <div>
              <span className="sm:text-lg font-bold mr-2">Guests:</span>
              <span className="sm:text-lg">
                {props.adultCount} adults, {props.childCount} children
              </span>
            </div>
          </div>
        )}

        {/* Hotel Description */}
        <p className="text-gray-600 leading-relaxed line-clamp-4 border-t pt-4">
          {hotel.description}
        </p>

        {/* Common Section for Search & Favorites */}
        {role !== 'bookingCard' && (
          <div className="grid grid-rows-2 grid-cols-1 gap-4 2xl:gap-0 2xl:grid-rows-1 2xl:grid-cols-[80%_20%] items-end whitespace-nowrap">
            <div className="flex flex-wrap gap-1 items-center">
              {hotel.facilities.slice(0, 3).map((facility) => (
                <span
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold text-xs sm:text-sm whitespace-nowrap hover:bg-blue-200 transition-colors"
                  key={facility}>
                  {facility}
                </span>
              ))}
              <span className="text-xs sm:text-sm">
                {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}
              </span>
            </div>

            <div className="flex flex-row items-center justify-between 2xl:flex-col 2xl:items-end gap-1">
              <span className="font-bold text-gray-700">€{hotel.pricePerNight} per night</span>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-500"
                role="link"
                to={`/detail/${hotel._id}`}>
                View More
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HotelCard
