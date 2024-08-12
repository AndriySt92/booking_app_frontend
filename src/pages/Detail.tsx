import { useParams } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import GuestInfoForm from '../forms/guestInfoForm/GuestInfoForm'
import DatePicker from 'react-datepicker'
import { transformBookedDates } from '../utils/dateUtils'
import { useGetBookedDates, useGetHotel } from '../hooks'

const Detail = () => {
  const { hotelId } = useParams()
  const { data: hotel } = useGetHotel(hotelId as string || '')
  const { data: bookedDates } = useGetBookedDates(hotelId as string || '')

  if (!hotel || !bookedDates) {
    return null
  }

  return (
    <div className="space-y-6 detail">
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
          <GuestInfoForm
            bookedDates={bookedDates}
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
            adultCount= {hotel.adultCount}
            childCount= {hotel.childCount}
          />
        </div>
      </div>
      <div className="w-full h-[370px] md:h-[500px] pt-5 pb-12 datail__calender">
        <h1 className="text-2xl font-bold mb-5">Calendar of booked dates</h1>
        <DatePicker
          inline
          excludeDates={transformBookedDates(bookedDates)}
          calendarClassName="w-full h-full"
        />
      </div>
    </div>
  )
}

export default Detail
