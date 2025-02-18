import { useCallback } from 'react'
import { BsBuilding, BsMap } from 'react-icons/bs'
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi'
import { IHotel } from '../../types/hotelTypes'
import { HotelInfoBox, Button, LoadingButton } from '..'

interface Props {
  hotel: IHotel
  onDelete: (hotelId: string) => void
  isDeleting: boolean
}

const MyHotelCard = ({ hotel, onDelete, isDeleting }: Props) => {
  const {
    _id,
    name,
    description,
    city,
    country,
    type,
    pricePerNight,
    childCount,
    adultCount,
    starRating,
  } = hotel

  const handleDelete = useCallback(() => {
    onDelete(_id)
  }, [_id, onDelete])

  return (
    <div className="flex flex-col justify-between p-3 md:p-8 gap-5 sm:text-lg custom-shadow-rounded animate-slideIn">
      <h2 className="text-2xl font-bold">{name}</h2>
      <div className="sm:text-lg line-clamp-4">{description}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
        <HotelInfoBox icon={<BsMap />} text={`${city}, ${country}`} />
        <HotelInfoBox icon={<BsBuilding />} text={type} />
        <HotelInfoBox icon={<BiMoney />} text={`${pricePerNight}€ per night`} />
        <HotelInfoBox icon={<BiHotel />} text={`${adultCount + childCount} persons`} />
        <HotelInfoBox icon={<BiStar />} text={`${starRating} star rating`} />
      </div>

      <div className="flex justify-between sm:justify-end gap-4">
        {!isDeleting ? (
          <Button onClick={handleDelete} className="bg-blue-600 text-white hover:bg-blue-500">
            Delete
          </Button>
        ) : (
          <LoadingButton className="bg-blue-600 text-white hover:bg-blue-500">
            Deleting...
          </LoadingButton>
        )}
        <Button
          role="link"
          to={`/edit-hotel/${hotel._id}`}
          className="bg-blue-600 text-white hover:bg-blue-500">
          Edit
        </Button>
      </div>
    </div>
  )
}

export default MyHotelCard
