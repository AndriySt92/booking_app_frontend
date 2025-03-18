import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetFavoritesIds } from '../hooks'

interface IFavoritesContext {
  favoritesIds: string[]
  addFavoritesIds: (hotelId: string) => void
  removeFavoritesIds: (hotelId: string) => void
}

const FavoritesContext = React.createContext<IFavoritesContext | undefined>(undefined)

export const FavoritesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoritesIds, setFavoritesIds] = useState<string[]>([])
  const { data } = useGetFavoritesIds()

  useEffect(() => {
    if (data) {
      setFavoritesIds(data)
    }
  }, [data])

  const addFavoritesIds = useCallback((hotelId: string) => {
    setFavoritesIds((hotelsIds) => [...hotelsIds, hotelId])
  }, [])

  const removeFavoritesIds = useCallback(
    (hotelId: string) => {
      const filtredFavoritesIds = favoritesIds.filter((id) => hotelId !== id)
      setFavoritesIds(filtredFavoritesIds)
    },
    [favoritesIds],
  )

  const contextValue = useMemo(
    () => ({
      favoritesIds,
      addFavoritesIds,
      removeFavoritesIds,
    }),
    [favoritesIds, addFavoritesIds, removeFavoritesIds],
  )

  return <FavoritesContext.Provider value={contextValue}>{children}</FavoritesContext.Provider>
}

export default FavoritesContext
