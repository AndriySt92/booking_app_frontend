import React, { useCallback, useMemo, useState } from 'react'
import { getSessionValue, setSessionValue } from '../utils/sessionStorageUtils'
import { SaveSearchValues } from '../types/hotelTypes'
import { useQueryParams } from '../hooks'

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
  const { params } = useQueryParams()

  const parseDate = (dateString: string | null) => (dateString ? new Date(dateString) : new Date())

  const [destination, setDestination] = useState<string>(
    () => params.destination || getSessionValue('destination') || '',
  )
  const [checkIn, setCheckIn] = useState<Date>(() =>
    parseDate(params.checkIn || getSessionValue('checkIn')),
  )
  const [checkOut, setCheckOut] = useState<Date>(() =>
    parseDate(params.checkOut || getSessionValue('checkOut')),
  )
  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(params.adultCount || getSessionValue('adultCount') || '1'),
  )
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(params.childCount || getSessionValue('childCount') || '0'),
  )
  const [hotelId, setHotelId] = useState<string>(
    () => params.hotelId || getSessionValue('hotelId') || '',
  )

  const saveSearchValues = useCallback(
    ({ destination, checkIn, checkOut, adultCount, childCount, hotelId }: SaveSearchValues) => {
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
    },
    [],
  )

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
    [destination, checkIn, checkOut, adultCount, childCount, hotelId, saveSearchValues],
  )

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>
}

export default SearchContext
