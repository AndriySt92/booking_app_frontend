import React from 'react'
import { useQuery } from 'react-query'
import { fetchHotelById } from '../../services/hotelApi'
import Loader from '../Common/Loader'
import { useAppContext } from '../../contexts/AppContext'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

interface Props {
  hotelId: string
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
}

const BookingCard = ({ hotelId, checkIn, checkOut, adultCount, childCount }: Props) => {
  const { showToast } = useAppContext()
  const { data: hotel } = useQuery(
    ['fetchHotelById', hotelId],
    () => fetchHotelById(hotelId || ''),
    {
      enabled: !!hotelId,
      onError: () => {
        showToast({ message: 'Error fetching hotel', type: 'ERROR' })
      },
    },
  )

  if (!hotel) {
    return null
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-3 md:p-8 gap-8">
      <div className="w-full h-[300px]">
        <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" />
      </div>

      <div className="grid gap-4 grid-rows-[1fr_1fr_2fr_32px] ">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar className="fill-yellow-400" key={index} />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer">
            {hotel.name}
          </Link>
        </div>
        <div>
          <div>
            <span className="font-bold mr-2">Dates: </span>
            <span>
              {new Date(checkIn).toDateString()} - {new Date(checkOut).toDateString()}
            </span>
          </div>
          <div>
            <span className="font-bold mr-2">Guests:</span>
            <span>
              {adultCount} adults, {childCount} children
            </span>
          </div>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div>
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span
                className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
                key={facility}>
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingCard
