import { useContext } from 'react'
import { FavoritesActionsContext } from '../contexts/FavoritesContext'

const useFavoritesActionsContext = () => {
  const context = useContext(FavoritesActionsContext)
  if (!context) {
    throw new Error('useFavoritesActionsContext must be used within a FavoritesContext')
  }
  return context
}

export default useFavoritesActionsContext
