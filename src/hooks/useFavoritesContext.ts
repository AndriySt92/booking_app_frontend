import { useContext } from 'react'
import { FavoritesContext } from '../contexts/FavoritesContext'

const useFavoritesContext = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesContext')
  }
  return context
}

export default useFavoritesContext
