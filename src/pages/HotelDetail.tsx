import { useParams } from 'react-router-dom'
import GuestInfoForm from '../forms/guestInfoForm/GuestInfoForm'
import DatePicker from 'react-datepicker'
import { transformBookedDates } from '../utils/dateUtils'
import { useGetBookedDates, useGetHotel } from '../hooks'
import { StarRating } from '../components'

const HotelDetail = () => {
  const { hotelId } = useParams()
  const { data: hotel } = useGetHotel((hotelId as string) || '')
  const { data: bookedDates } = useGetBookedDates((hotelId as string) || '')

  if (!hotel || !bookedDates) {
    return null
  }

  return (
    <div>
      <div className="space-y-6 detail">
        <div>
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <div className="flex mt-2">
            <StarRating starRating={hotel.starRating} />
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-12 sm:grid-rows-5 sm:gap-4 grid-cols-10 grid-rows-5">
          {hotel.imageUrls.map((image, index) => (
            <div
              key={image}
              className={`group 
        ${index === 0 ? 'sm:col-span-8 sm:row-span-4 col-span-10 row-span-4' : ''} 
        ${index === 1 ? 'sm:col-span-4 sm:row-span-2 sm:col-start-9 col-span-2 row-start-5' : ''} 
        ${
          index === 2
            ? 'sm:col-span-4 sm:row-span-2 sm:col-start-9 sm:row-start-3 col-span-2 col-start-3 row-start-5'
            : ''
        } 
        ${index > 2 ? 'sm:col-span-2 sm:row-start-5 col-span-2 col-start-5 row-start-5' : ''} 
      `}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="rounded-md w-full h-full object-cover object-center opacity-100 group-hover:opacity-100 group-hover:animate-flash cursor-pointer"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="whitespace-pre-line text-base lg:text-lg">{hotel.description}</div>
          <div className="h-fit">
            <GuestInfoForm
              bookedDates={bookedDates}
              pricePerNight={hotel.pricePerNight}
              hotelId={hotel._id}
              adultCount={hotel.adultCount}
              childCount={hotel.childCount}
            />
          </div>
        </div>

        <div className="w-full pt-5">
          <h1 className="text-2xl font-bold mb-5">Calendar of booked dates</h1>
          <div className="mb-6">
            <div className="flex items-center text-base lg:text-lg mb-4">
              <span className="h-8 w-10 sm:w-16 mr-4 inline-block bg-red-500 rounded-sm border-gray-500 border-2"></span>
              <span>Booked dates</span>
            </div>
            <div className="flex items-center text-base lg:text-lg">
              <span className="h-8 w-10 sm:w-16 mr-4 inline-block rounded-sm border-gray-500 border-2"></span>
              <span>Free dates</span>
            </div>
          </div>
          <div className="w-full h-[370px] md:h-[500px] datail__calender">
            <DatePicker
              inline
              excludeDates={transformBookedDates(bookedDates)}
              calendarClassName="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelDetail
