import DatePicker from 'react-datepicker'
import GuestInfoForm from '../../forms/guestInfoForm/GuestInfoForm'
import { transformBookedDates } from '../../utils/dateUtils'
import { useGetBookedDates } from '../../hooks'
import { Text, Title } from '../'

interface Props {
  pricePerNight: number
  hotelId: string
  adultCount: number
  childCount: number
}

const HotelAvailability = ({ pricePerNight, hotelId, adultCount, childCount }: Props) => {
  const { data: bookedDates } = useGetBookedDates((hotelId as string) || '')

  if (!bookedDates) {
    return null
  }

  return (
    <div className="space-y-4">
      <Title as="h3" size="md" color="gray">
        Booking Available Dates
      </Title>
      <div className="w-full space-y-3">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-red-400 border-2 border-gray-700 rounded-sm" />
            <Text as="span" size="md">
              Booked Dates
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-white border-2 border-gray-700 rounded-sm" />
            <Text as="span" size="md">
              Available Dates
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 lg:gap-3">
          <div className="w-full detail__calender">
            <DatePicker
              inline
              excludeDates={transformBookedDates(bookedDates)}
              calendarClassName="w-full h-full"
            />
          </div>
          <div className="h-fit">
            <GuestInfoForm
              bookedDates={bookedDates}
              pricePerNight={pricePerNight}
              hotelId={hotelId}
              adultCount={adultCount}
              childCount={childCount}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelAvailability
