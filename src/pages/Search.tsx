import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
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
  Title,
} from '../components'
import { initialFilterValue, sortOptions } from '../config/hotelConfigs'
import {
  useGetSearchHotels,
  useModalManager,
  useFavoritesContext,
  useSearchContext,
  usePagination,
  useQueryParams,
} from '../hooks'
import { IFilterHotels } from '../types/hotelTypes'

const Search = () => {
  const { page, handlePageChange, scrollRef } = usePagination()
  const { closeModal, currentModal, openModal } = useModalManager()
  const { params, updateQueryParams, getArrayParam } = useQueryParams()
  const { stars, types, facilities, maxPrice } = params

  // Initialize state from URL params
  const [filter, setFilter] = useState<IFilterHotels>({
    stars: getArrayParam(stars),
    types: getArrayParam(types),
    facilities: getArrayParam(facilities),
    maxPrice: maxPrice || null,
  })

  const { favoritesIds } = useFavoritesContext()
  const { destination, checkIn, checkOut, childCount, adultCount } = useSearchContext()

  const { register, watch, reset } = useForm<{ sortOption: string }>({
    defaultValues: {
      sortOption: '',
    },
  })
  const sortOption = watch('sortOption')

  const queryObj = useMemo(
    () => ({
      destination,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      adultCount: adultCount.toString(),
      childCount: childCount.toString(),
      sortOption,
      ...filter,
    }),
    [filter, sortOption, destination, checkIn, checkOut, childCount, adultCount],
  )

  // Update the URL query params when the search state changes
  useEffect(() => {
    const handler = setTimeout(() => {
      updateQueryParams(queryObj)
    }, 300)

    return () => clearTimeout(handler)
  }, [queryObj, updateQueryParams])

  const { data, isLoading, isError, isSuccess, refetch } = useGetSearchHotels(queryObj)

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

  useEffect(() => {
    reset({ sortOption: '' })
  }, [destination, checkIn, checkOut, childCount, adultCount, filter, reset])

  useEffect(() => {
    handlePageChange(1)
  }, [filter, handlePageChange])

  const pages = data?.pagination?.pages
  const hotels = data?.data
  const hasHotels = Boolean(hotels?.length)

  return (
    <>
      {/* Main Content */}
      <div className="mb-7 scroll-mt-[60px] sm:scroll-mt-[90px]" ref={scrollRef}>
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
                  <Title as="h3" size="sm" color="gray">
                    {data?.pagination.total} Hotels found
                    {destination ? ` in ${destination}` : ''}
                  </Title>
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
                  disabled={!hasHotels}
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
                {hasHotels &&
                  hotels?.map((hotel) => (
                    <HotelCard
                      role="searchCard"
                      hotel={hotel}
                      key={hotel._id}
                      isFavorite={favoritesIds.includes(hotel._id)}
                    />
                  ))}
              </>
            )}

            {/* No Hotels Found */}
            {!hasHotels && isSuccess && <NotFoundData title="No hotels match your criteria" />}

            {/* Error */}
            {isError && <Error message="Unable to fetch hotels." size="large" center />}

            {/* Pagination */}
            {hasHotels && (
              <Pagination page={page} pages={pages || 1} onPageChange={handlePageChange} />
            )}
          </div>
        </div>
      </div>

      {/* Filter Modal for tablets and mobiles */}
      {currentModal === 'filterModal' && (
        <Modal onClose={closeModal} variant="filter">
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
