import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import {
  Pagination,
  Modal,
  Button,
  Loader,
  Filter,
  HotelCard,
  Select,
  NotFoundData,
} from '../components'
import { initialFilterValue, sortOptions } from '../config/hotelConfigs'
import { useGetSearchHotels, useModalManager } from '../hooks'
import { IFilterHotels } from '../types/hotelTypes'
import { useForm } from 'react-hook-form'

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

  const { data: hotelData, isLoading, refetch } = useGetSearchHotels(searchParams)

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
  }, [destination, checkIn, checkOut, childCount, adultCount, filter])

  const isHotelAvailble = hotelData?.data && hotelData.data.length > 0

  return (
    <div className="w-full mb-7">
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div className="custom-shadow-rounded p-5 h-fit top-10 hidden lg:block">
          <Filter
            handleFilterApply={handleFilterApply}
            handleClearFilters={handleClearFilters}
            isLoading={isLoading}
          />
        </div>
        {currentModal === 'filterModal' && (
          <Modal onClose={closeModal}>
            <Filter
              handleFilterApply={handleFilterApply}
              handleClearFilters={handleClearFilters}
              isLoading={isLoading}
            />
          </Modal>
        )}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="text-xl font-bold mb-5 lg:mb-0">
              {hotelData?.pagination.total} Hotels found
              {destination ? ` in ${destination}` : ''}
            </div>
            <div className="flex justify-between w-full lg:w-auto">
              <div className="lg:hidden flex justify-end">
                <Button
                  classes="bg-blue-600 text-white hover:bg-blue-500"
                  onClick={() => openModal('filterModal')}>
                  Filter
                </Button>
              </div>

              <Select
                name="sortOption"
                options={sortOptions}
                placeholder="Sort by"
                register={register}
                disabled={!isHotelAvailble}
              />
            </div>
          </div>
          {isLoading && <Loader />}
          {isHotelAvailble ? (
            hotelData.data.map((hotel) => (
              <HotelCard role="searchCard" hotel={hotel} key={hotel._id} />
            ))
          ) : (
            <NotFoundData title="No hotels match your criteria" />
          )}

          {isHotelAvailble && (
            <Pagination
              page={hotelData?.pagination.page || 1}
              pages={hotelData?.pagination.pages || 1}
              onPageChange={(page) => setPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
