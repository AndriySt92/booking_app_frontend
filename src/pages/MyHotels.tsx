import { useCallback } from 'react'
import { Button, Error, NotFoundData, SkeletonMyHotels, MyHotelCard } from '../components'
import { useDeleteMyHotel, useGetMyHotels } from '../hooks'

const MyHotels = () => {
  const { data: hotels, isLoading, isError } = useGetMyHotels()
  const { mutate, isLoading: isDeleting } = useDeleteMyHotel()

  const onDelete = useCallback(
    (hotelId: string) => {
      mutate(hotelId)
    },
    [mutate],
  )

  if (isLoading) {
    return <SkeletonMyHotels />
  }

  return (
    <div className="space-y-7">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Button role="link" to="/add-hotel" className="bg-blue-600 text-white hover:bg-blue-500">
          Add Hotel
        </Button>
      </div>

      {/* My hotels list */}
      {hotels && (
        <div className="grid grid-cols-1 gap-8">
          {hotels.map((hotel) => (
            <MyHotelCard
              hotel={hotel}
              onDelete={onDelete}
              isDeleting={isDeleting}
              key={hotel._id}
            />
          ))}
        </div>
      )}

      {/* No data available */}
      {hotels?.length && !isError && <NotFoundData title="You haven't added any hotels yet." />}

      {/* Error */}
      {!isError && <Error message="An error occurred while fetching the data." center />}
    </div>
  )
}

export default MyHotels
