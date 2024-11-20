import React from 'react'
import { useGetHotel } from '../../hooks'
import { HotelCard } from '../'

interface Props {
  hotelId?: string
  checkIn?: Date
  checkOut?: Date
  adultCount?: number
  childCount?: number
}

const BookingItem: React.FC<Props> = ({ hotelId, checkIn, checkOut, adultCount, childCount }) => {
  const { data: hotel } = useGetHotel((hotelId as string) || '')

  if (!hotel) {
    return null
  }

  return (
    <HotelCard
      role="bookingCard"
      hotel={hotel}
      checkIn={checkIn}
      checkOut={checkOut}
      adultCount={adultCount}
      childCount={childCount}
    />
  )
}

export default BookingItem
