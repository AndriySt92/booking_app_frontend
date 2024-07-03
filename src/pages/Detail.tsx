import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchHotelById } from '../services/hotelApi'
import { AiFillStar } from 'react-icons/ai'
import GuestInfoForm from '../forms/guestInfoForm/GuestInfoForm'

const Detail = () => {
  const { hotelId } = useParams()

  const { data: hotel } = useQuery('fetchHotelById', () => fetchHotelById(hotelId || ''))

  if (!hotel) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
        <span className="flex mt-2">
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <AiFillStar className="fill-yellow-400" key={i} />
          ))}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image) => (
          <div className="h-[300px]" key={image}>
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3" key={facility}>
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
        </div>
      </div>
    </div>
  )
}

export default Detail
