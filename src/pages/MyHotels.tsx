import { useCallback, useEffect } from 'react'
import {
  Button,
  Error,
  NotFoundData,
  SkeletonMyHotels,
  MyHotelCard,
  Title,
  DeleteModal,
} from '../components'
import { useDeleteMyHotel, useGetMyHotels, useModalManager } from '../hooks'

const MyHotels = () => {
  const { closeModal, currentModal, openModal, entityId } = useModalManager()

  const { data: hotels, isLoading, isError } = useGetMyHotels()
  const { mutate, isLoading: isDeleting } = useDeleteMyHotel(closeModal)

  const handleDeleteRequest = useCallback(
    (hotelId: string) => {
      openModal('deleteModal', hotelId)
    },
    [openModal],
  )

  const handleConfirmDelete = useCallback(() => {
    if (entityId) {
      mutate(entityId)
    }
  }, [entityId, mutate, closeModal])

  const handleCancelDelete = useCallback(() => {
    closeModal()
  }, [closeModal])

  // Cleanup effect
  useEffect(() => () => closeModal(), [closeModal])

  if (isLoading) {
    return <SkeletonMyHotels />
  }

  return (
    <div className="space-y-7">
      <div className="flex justify-between">
        <Title as="h1">My Hotels</Title>

        <Button role="link" to="/add-hotel" className="bg-blue-600 text-white hover:bg-blue-500">
          Add Hotel
        </Button>
      </div>

      {/* My hotels list */}
      {hotels && hotels?.length > 0 && (
        <div className="grid grid-cols-1 gap-8">
          {hotels.map((hotel) => (
            <MyHotelCard
              key={hotel._id}
              isDeleting={isDeleting}
              hotel={hotel}
              onDelete={handleDeleteRequest}
            />
          ))}
        </div>
      )}

      {/* My hotels data is empty */}
      {hotels?.length === 0 && !isError && (
        <NotFoundData
          title="You haven’t added any hotels yet"
          description="Showcase your properties and start attracting guests. Add your first hotel now!"
        />
      )}

      {/* Error */}
      {isError && (
        <Error message="An error occurred while fetching the data." size="large" center />
      )}

      {currentModal === 'deleteModal' && entityId && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onClose={handleCancelDelete}
          isDeleting={isDeleting}
          entityName={hotels?.find((h) => h._id === entityId)?.name as string}
        />
      )}
    </div>
  )
}

export default MyHotels
