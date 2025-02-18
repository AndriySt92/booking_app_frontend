import { useParams } from 'react-router-dom'
import GuestInfoForm from '../forms/guestInfoForm/GuestInfoForm'
import DatePicker from 'react-datepicker'
import { transformBookedDates } from '../utils/dateUtils'
import { useGetBookedDates, useGetHotel } from '../hooks'
import { StarRating, Gallery, SkeletonHotelDetailsPage, Error } from '../components'

const HotelDetail = () => {
  const { hotelId } = useParams()
  const {
    data: hotel,
    isFetching: isFetchingDetail,
    isError: isErrorFetchingDetail,
  } = useGetHotel((hotelId as string) || '')
  const {
    data: bookedDates,
    isFetching: isFetchingDates,
    isError: isErrorFetchingDates,
  } = useGetBookedDates((hotelId as string) || '')

  const isLoading = isFetchingDetail || isFetchingDates
  const isError = isErrorFetchingDetail || isErrorFetchingDates

  if (isLoading) {
    return <SkeletonHotelDetailsPage />
  }

  if (!hotel || !bookedDates) {
    return null
  }

  return (
    <div className="space-y-7 detail">
      <div>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
        <div className="flex mt-2">
          <StarRating starRating={hotel.starRating} />
        </div>
      </div>

      <Gallery images={hotel.imageUrls} />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div>
          <div className="text-lg sm:text-xl font-semibold">
            {hotel.city}, {hotel.country}
          </div>
          <div className="whitespace-pre-line sm:text-lg">{hotel.description}</div>
        </div>
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
          <div className="flex items-center sm:text-lg mb-4">
            <span className="h-8 w-10 sm:w-16 mr-4 inline-block bg-red-500 rounded-sm border-gray-500 border-2"></span>
            <span>Booked dates</span>
          </div>
          <div className="flex items-center sm:text-lg">
            <span className="h-8 w-10 sm:w-16 mr-4 inline-block rounded-sm border-gray-500 border-2"></span>
            <span>Free dates</span>
          </div>
        </div>
        <div className="w-full datail__calender">
          <DatePicker
            inline
            excludeDates={transformBookedDates(bookedDates)}
            calendarClassName="w-full h-full"
          />
        </div>
      </div>

      {/* Error */}
      {isError && (
        <Error message="An error occurred while fetching the data." size="large" center />
      )}
    </div>
  )
}

export default HotelDetail
