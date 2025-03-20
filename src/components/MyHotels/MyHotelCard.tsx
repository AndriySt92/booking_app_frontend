import { useCallback } from 'react'
import { IHotel } from '../../types/hotelTypes'
import { Button, HotelInfoList, Title, Text, LoadingButton } from '../'

interface Props {
  hotel: IHotel
  onDelete: (hotelId: string) => void
  isDeleting: boolean
}

const MyHotelCard = ({ hotel, onDelete, isDeleting }: Props) => {
  const { _id, name, description, city, type, pricePerNight, childCount, adultCount, starRating } =
    hotel

  const handleDelete = useCallback(() => {
    onDelete(_id)
  }, [_id, onDelete])

  return (
    <div className="flex flex-col justify-between p-3 md:p-8 gap-5 sm:text-lg custom-shadow-rounded animate-slideIn">
      <div className="space-y-4">
        <Title color="gradient" size="md" as="h3">
          {name}
        </Title>
        <Text className="line-clamp-4" size="md">
          {description}
        </Text>

        <HotelInfoList
          city={city}
          type={type}
          pricePerNight={pricePerNight}
          childCount={childCount}
          adultCount={adultCount}
          starRating={starRating}
        />
      </div>

      <div className="flex justify-between sm:justify-end gap-4">
        {!isDeleting ? (
          <Button
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-500"
            disabled={isDeleting}>
            Delete
          </Button>
        ) : (
          <LoadingButton className="bg-red-600 text-white">Deleting...</LoadingButton>
        )}
        <Button
          role="link"
          to={`/edit-hotel/${hotel._id}`}
          className="bg-blue-600 text-white hover:bg-blue-500">
          Edit Hotel
        </Button>
      </div>
    </div>
  )
}

export default MyHotelCard
