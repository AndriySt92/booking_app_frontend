import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchContext } from '../hooks'
import {
  Pagination,
  Modal,
  Button,
  SkeletonHotelCard,
  Filter,
  HotelCard,
  Select,
  NotFoundData,
  Error,
} from '../components'
import { initialFilterValue, sortOptions } from '../config/hotelConfigs'
import { useGetSearchHotels, useModalManager } from '../hooks'
import { IFilterHotels } from '../types/hotelTypes'

const Search = () => {
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IFilterHotels>(initialFilterValue)

  const { closeModal, currentModal, openModal } = useModalManager()
  const { destination, checkIn, checkOut, childCount, adultCount } = useSearchContext()
  const { register, watch, reset } = useForm<{ sortOption: string }>({
    defaultValues: {
      sortOption: '',
    },
  })
  const sortOption = watch('sortOption')

  // Ref for scrolling
  const topDivRef = useRef<HTMLDivElement>(null)

  const searchParams = useMemo(
    () => ({
      destination,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      adultCount: adultCount.toString(),
      childCount: childCount.toString(),
      page: page.toString(),
      sortOption,
      ...filter,
    }),
    [filter, sortOption, destination, checkIn, checkOut, childCount, adultCount, page],
  )

  const {
    data: hotelData,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useGetSearchHotels(searchParams)

  const handleFilterApply = useCallback(
    ({ stars, types, facilities, maxPrice }: IFilterHotels) => {
      setFilter({
        stars,
        types,
        facilities,
        maxPrice,
      })
      closeModal()
    },
    [closeModal],
  )

  const handleClearFilters = useCallback(() => {
    setFilter(initialFilterValue)
    refetch()
  }, [refetch])

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)

    // Scroll to the referenced div
    if (topDivRef.current) {
      topDivRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [])

  useEffect(() => {
    reset({ sortOption: '' })
  }, [destination, checkIn, checkOut, childCount, adultCount, filter, reset])

  useEffect(() => {
    handlePageChange(1)
  }, [filter, handlePageChange])

  const areHotelsAvailable = useMemo(
    () => hotelData?.data && hotelData.data.length > 0,
    [hotelData],
  )

  return (
    <>
      {/* Main Content */}
      <div className="mb-7" ref={topDivRef}>
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
          <div className="custom-shadow-rounded p-5 h-fit top-10 hidden lg:block">
            <Filter
              filter={filter}
              handleFilterApply={handleFilterApply}
              handleClearFilters={handleClearFilters}
              isLoading={isLoading}
            />
          </div>

          <div className="flex flex-col gap-5 mt-1">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="mb-5 lg:mb-0">
                {!isError && isSuccess && (
                  <div className="text-xl font-bold ">
                    {hotelData?.pagination.total} Hotels found
                    {destination ? ` in ${destination}` : ''}
                  </div>
                )}
              </div>

              <div className="flex justify-between lg:justify-end gap-2 w-full lg:w-auto">
                {/* Mobile filter button */}
                <div className="lg:hidden">
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-500 px-6 text-lg"
                    onClick={() => openModal('filterModal')}>
                    Filter
                  </Button>
                </div>

                <Select
                  name="sortOption"
                  options={sortOptions}
                  placeholder="Sort by"
                  register={register}
                  disabled={!areHotelsAvailable}
                />
              </div>
            </div>

            {/* Loading Skeleton & HotelCards */}
            {isLoading ? (
              <div className="flex flex-col gap-5">
                {[...Array(5)].map((_, index) => (
                  <SkeletonHotelCard key={index} role={'searchCard'} />
                ))}
              </div>
            ) : (
              <>
                {areHotelsAvailable &&
                  hotelData?.data.map((hotel) => (
                    <HotelCard role="searchCard" hotel={hotel} key={hotel._id} />
                  ))}
              </>
            )}

            {/* No Hotels Found */}
            {isSuccess && !areHotelsAvailable && (
              <NotFoundData title="No hotels match your criteria" />
            )}

            {/* Error */}
            {isError && <Error message="Unable to fetch hotels." size="large" center />}

            {/* Pagination */}
            {areHotelsAvailable && (
              <Pagination
                page={page}
                pages={hotelData?.pagination.pages || 1}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* Filter Modal for tablets and mobiles */}
      {currentModal === 'filterModal' && (
        <Modal onClose={closeModal}>
          <Filter
            filter={filter}
            handleFilterApply={handleFilterApply}
            handleClearFilters={handleClearFilters}
            isLoading={isLoading}
          />
        </Modal>
      )}
    </>
  )
}

export default Search
