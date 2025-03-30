import { useCallback, useEffect } from 'react'
import {
  Button,
  Error,
  NotFoundData,
  SkeletonMyHotels,
  MyHotelCard,
  Title,
  DeleteModal,
  Pagination,
} from '../components'
import { useDeleteMyHotel, useGetMyHotels, useModalManager, usePagination } from '../hooks'

const LIMIT = 5

const MyHotels = () => {
  const { page, handlePageChange, scrollRef } = usePagination()
  const { closeModal, currentModal, openModal, entityId } = useModalManager()

  const { mutate, isLoading: isDeleting } = useDeleteMyHotel(closeModal)
  const { data, isLoading, isError, isSuccess } = useGetMyHotels({ page, limit: LIMIT })

  const hotels = data?.data
  const hasHotels = Boolean(hotels?.length)
  const pages = data?.pagination?.pages

  // Ensure page correction in case removing last item on page
  useEffect(() => {
    if (pages && page > pages) {
      handlePageChange(pages)
    }
  }, [pages, page, handlePageChange])

  // Cleanup effect for Modal component
  useEffect(() => () => closeModal(), [closeModal])

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
  }, [entityId, mutate])

  const handleCancelDelete = useCallback(() => {
    closeModal()
  }, [closeModal])

  if (isLoading) {
    return <SkeletonMyHotels />
  }

  return (
    <div className="space-y-7 scroll-m-20 sm:scroll-m-24" ref={scrollRef}>
      <div className="flex justify-between">
        <Title as="h1">My Hotels</Title>

        <Button role="link" to="/add-hotel" className="bg-blue-600 text-white hover:bg-blue-500">
          Add Hotel
        </Button>
      </div>

      {/* My hotels list */}
      {hasHotels && (
        <div className="grid grid-cols-1 gap-8">
          {data?.data.map((hotel) => (
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
      {!hasHotels && isSuccess && (
        <NotFoundData
          title="You haven’t added any hotels yet"
          description="Showcase your properties and start attracting guests. Add your first hotel now!"
        />
      )}

      {/* Error */}
      {isError && (
        <Error message="An error occurred while fetching the data." size="large" center />
      )}

      {/* Pagination */}
      {hasHotels && <Pagination page={page} pages={pages || 1} onPageChange={handlePageChange} />}

      {currentModal === 'deleteModal' && entityId && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onClose={handleCancelDelete}
          isDeleting={isDeleting}
          entityName={data?.data.find((h) => h._id === entityId)?.name as string}
        />
      )}
    </div>
  )
}

export default MyHotels
