import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetFavoritesIds } from '../hooks'

interface IFavoritesContext {
  favoritesIds: string[]
}

interface IFavoritesActionsContext {
  addFavoritesIds: (hotelId: string) => void
  removeFavoritesIds: (hotelId: string) => void
}

//This separation prevents unnecessary re-renders in components that only consume actions
export const FavoritesContext = React.createContext<IFavoritesContext | undefined>(undefined)
export const FavoritesActionsContext = React.createContext<IFavoritesActionsContext | undefined>(
  undefined,
)

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

  const value = useMemo(
    () => ({
      favoritesIds,
    }),
    [favoritesIds],
  )

  const actions = useMemo(
    () => ({
      addFavoritesIds,
      removeFavoritesIds,
    }),
    [addFavoritesIds, removeFavoritesIds],
  )

  return (
    <FavoritesContext.Provider value={value}>
      <FavoritesActionsContext.Provider value={actions}>
        {children}
      </FavoritesActionsContext.Provider>
    </FavoritesContext.Provider>
  )
}
