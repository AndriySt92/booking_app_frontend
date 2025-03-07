import React from 'react'
import { useGetHotel } from '../../hooks'
import { HotelCard } from '../'

interface Props {
  hotelId: string
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
  isFavorite: boolean
}

const BookingItem: React.FC<Props> = ({
  hotelId,
  checkIn,
  checkOut,
  adultCount,
  childCount,
  isFavorite,
}) => {
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
      isFavorite={isFavorite}
    />
  )
}

export default BookingItem
