import React, { useCallback, useMemo, useState } from 'react'

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

  const saveBookingValues = useCallback(
    (hotelId: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number) => {
      setCheckIn(checkIn)
      setCheckOut(checkOut)
      setAdultCount(adultCount)
      setChildCount(childCount)
      setHotelId(hotelId)
    },
    [],
  )

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      checkIn,
      checkOut,
      adultCount,
      childCount,
      hotelId,
      saveBookingValues,
    }),
    [checkIn, checkOut, adultCount, childCount, hotelId, saveBookingValues],
  )

  return <BookingContext.Provider value={contextValue}>{children}</BookingContext.Provider>
}

export default BookingContext
