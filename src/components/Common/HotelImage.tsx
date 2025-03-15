import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { ImSpinner8 } from 'react-icons/im'
import { useAddFavorite, useAppContext, useRemoveFavorite } from '../../hooks'
import cn from 'classnames'
import { useNavigate, useLocation } from 'react-router-dom'

interface Props {
  imageUrl: string
  isFavorite: boolean
  hotelId: string
  className?: string
}

const HotelImage = ({ imageUrl, isFavorite, hotelId, className }: Props) => {
  const { mutate: addFavorite, isLoading: isAdding } = useAddFavorite(hotelId)
  const { mutate: removeFavorite, isLoading: isRemoving } = useRemoveFavorite(hotelId)
  const { isLoggedIn } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()

  const handleFavoriteAction = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!isLoggedIn) {
      navigate('/sign-in', { state: { from: location } })
      return
    }

    isFavorite ? removeFavorite() : addFavorite()
  }

  const isLoading = isAdding || isRemoving

  return (
    <div
      className={cn(
        className,
        'relative h-[300px] shadow-lg rounded overflow-hidden cursor-pointer group group-hover:animate-flash duration-300',
      )}>
      <img
        src={imageUrl}
        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
        alt="Hotel room"
      />
      <div
        className="absolute top-3 right-3 text-2xl cursor-pointer"
        onClick={handleFavoriteAction}>
        <div className="flex justify-center items-center w-[35px] h-[35px] rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow">
          {isLoading ? (
            <ImSpinner8 className="text-blue-600 animate-spin" size={20} />
          ) : isLoggedIn && isFavorite ? (
            <FaHeart
              className="text-red-500 transition-transform duration-300 hover:scale-110"
              size={20}
            />
          ) : (
            <FaRegHeart
              className="text-red-500 hover:text-red-600 transition-colors duration-300 hover:scale-110"
              size={20}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default HotelImage
