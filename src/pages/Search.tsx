import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchContext } from '../contexts/SearchContext'
import { searchHotels } from '../services/hotelApi'
import { Pagination, SearchResultsCard, Modal, Button, Loader, Filter } from '../components'
import { useAppContext } from '../contexts/AppContext'
import { sortOptions } from '../config/hotelOptionsConfig'

const Search = () => {
  const search = useSearchContext()
  const { showToast } = useAppContext()
  const [page, setPage] = useState<number>(1)
  const [selectedStars, setSelectedStars] = useState<string[]>([])
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
  const [sortOption, setSortOption] = useState<string>('')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)

  const searchParams = useMemo(
    () => ({
      destination: search.destination,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      adultCount: search.adultCount.toString(),
      childCount: search.childCount.toString(),
      page: page.toString(),
      stars: selectedStars,
      types: selectedHotelTypes,
      facilities: selectedFacilities,
      maxPrice: selectedPrice?.toString(),
      sortOption,
    }),
    [
      sortOption,
      selectedPrice,
      selectedFacilities,
      selectedStars,
      selectedHotelTypes,
      search.destination,
      search.checkIn,
      search.checkOut,
      search.adultCount,
      search.childCount,
      page,
    ],
  )

  const { data: hotelData, isLoading } = useQuery(
    ['searchHotels', searchParams],
    () => searchHotels(searchParams),
    {
      onError: () => {
        showToast({ message: 'Error fetching hotel data', type: 'ERROR' })
      },
    },
  )

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating),
    )
  }

  const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType),
    )
  }

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility),
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit top-10 hidden lg:block">
        <Filter
          selectedStars={selectedStars}
          handleStarsChange={handleStarsChange}
          selectedHotelTypes={selectedHotelTypes}
          handleHotelTypeChange={handleHotelTypeChange}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          selectedFacilities={selectedFacilities}
          handleFacilityChange={handleFacilityChange}
        />
      </div>
      {isFilterModalOpen && (
        <Modal onClose={() => setIsFilterModalOpen(false)}>
            <Filter
              selectedStars={selectedStars}
              handleStarsChange={handleStarsChange}
              selectedHotelTypes={selectedHotelTypes}
              handleHotelTypeChange={handleHotelTypeChange}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              selectedFacilities={selectedFacilities}
              handleFacilityChange={handleFacilityChange}
            />
        </Modal>
      )}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="text-xl font-bold mb-5 lg:mb-0">
            {hotelData?.pagination.total} Hotels found
            {search.destination && ` in ${search.destination}`}
          </div>
          <div className="flex justify-between w-full lg:w-auto">
            <div className="lg:hidden flex justify-end ">
              <Button
                classes="bg-blue-600 text-white hover:bg-blue-500"
                onClick={() => setIsFilterModalOpen(true)}>
                Filter
              </Button>
            </div>
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="p-2 border rounded-md">
              <option value="">Sort By</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {isLoading && <Loader />}
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} key={hotel._id}/>
        ))}
        <Pagination
          page={hotelData?.pagination.page || 1}
          pages={hotelData?.pagination.pages || 1}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  )
}

export default Search
