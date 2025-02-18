import React, { useMemo, useState } from 'react'
import { getSessionValue, setSessionValue } from '../utils/sessionStorageUtils'
import { SaveSearchValues } from '../types/hotelTypes'

interface ISearchContext {
  destination: string
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
  hotelId: string
  saveSearchValues: (values: SaveSearchValues) => void
}

const SearchContext = React.createContext<ISearchContext | undefined>(undefined)

export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [destination, setDestination] = useState<string>(() => getSessionValue('destination') || '')
  const [checkIn, setCheckIn] = useState<Date>(
    () => new Date(getSessionValue('checkIn') || new Date()),
  )
  const [checkOut, setCheckOut] = useState<Date>(
    () => new Date(getSessionValue('checkOut') || new Date()),
  )
  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(getSessionValue('adultCount') || '1'),
  )
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(getSessionValue('childCount') || '0'),
  )
  const [hotelId, setHotelId] = useState<string>(() => getSessionValue('hotelID') || '')

  const saveSearchValues = ({
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    hotelId,
  }: SaveSearchValues) => {
    const today = new Date()
    const updatedCheckIn = checkIn || today
    const updatedCheckOut = checkOut || today

    setDestination(destination)
    setCheckIn(updatedCheckIn)
    setCheckOut(updatedCheckOut)
    setAdultCount(adultCount ?? 1)
    setChildCount(childCount ?? 0)
    setHotelId(hotelId || '')

    setSessionValue('destination', destination)
    setSessionValue('checkIn', updatedCheckIn)
    setSessionValue('checkOut', updatedCheckOut)
    setSessionValue('adultCount', (adultCount ?? 1).toString())
    setSessionValue('childCount', (childCount ?? 0).toString())
    if (hotelId) sessionStorage.setItem('hotelId', hotelId)
  }

  // Memoize the context value to avoid re-renders
  const contextValue = useMemo(
    () => ({
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
      hotelId,
      saveSearchValues,
    }),
    [destination, checkIn, checkOut, adultCount, childCount, hotelId],
  )

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>
}

export default SearchContext
