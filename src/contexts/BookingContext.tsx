import React, { useContext, useState } from 'react'

interface IBookingContext {
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
  hotelId: string
  saveBookingValues: (
    hotelId: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
  ) => void
}

const BookingContext = React.createContext<IBookingContext | undefined>(undefined)

export const BookingContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [checkIn, setCheckIn] = useState<Date>(() => new Date())
  const [checkOut, setCheckOut] = useState<Date>(new Date())
  const [adultCount, setAdultCount] = useState<number>(1)
  const [childCount, setChildCount] = useState<number>(1)
  const [hotelId, setHotelId] = useState<string>('')

  const saveBookingValues = (
    hotelId: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
  ) => {
    setCheckIn(checkIn)
    setCheckOut(checkOut)
    setAdultCount(adultCount)
    setChildCount(childCount)
    setHotelId(hotelId)
  }

  return (
    <BookingContext.Provider
      value={{
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveBookingValues,
      }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBookingContext = () => {
  const context = useContext(BookingContext)
  return context as IBookingContext
}
