import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { ImSpinner8 } from 'react-icons/im'
import { useAddFavorite, useRemoveFavorite } from '../../hooks'

interface Props {
  imageUrl: string
  isFavorite: boolean
  hotelId: string
  className?: string
}

const HotelImage = ({ imageUrl, isFavorite, hotelId }: Props) => {
  const { mutate: addFavorite, isLoading: isAdding } = useAddFavorite(hotelId)
  const { mutate: removeFavorite, isLoading: isRemoving } = useRemoveFavorite(hotelId)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    isFavorite ? removeFavorite() : addFavorite()
  }

  const isLoading = isAdding || isRemoving

  return (
    <div className="relative h-[300px] shadow-lg rounded overflow-hidden cursor-pointer group group-hover:animate-flash duration-300">
      <img
        src={imageUrl}
        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
        alt="Hotel room"
      />
      <div className="absolute top-3 right-3 text-2xl cursor-pointer" onClick={handleFavoriteClick}>
        <div className="flex justify-center items-center w-[35px] h-[35px] rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow">
          {isLoading ? (
            <ImSpinner8 className="text-blue-600 animate-spin" size={20} />
          ) : isFavorite ? (
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
