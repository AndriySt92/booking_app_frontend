import React from 'react'
import StarRatingFilter from './StarRatingFilter'
import HotelTypesFilter from './HotelTypesFilter'
import FacilitiesFilter from './FacilitiesFilter'
import PriceFilter from './PriceFilter'

interface Props {
  selectedStars: string[]
  handleStarsChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  selectedHotelTypes: string[]
  handleHotelTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  selectedPrice?: number
  setSelectedPrice: (value?: number) => void
  selectedFacilities: string[]
  handleFacilityChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Filter = ({
  selectedFacilities,
  handleFacilityChange,
  selectedPrice,
  setSelectedPrice,
  selectedStars,
  handleStarsChange,
  selectedHotelTypes,
  handleHotelTypeChange,
}: Props) => {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
      <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
      <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
      <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange} />
      <PriceFilter selectedPrice={selectedPrice} onChange={setSelectedPrice} />
    </div>
  )
}

export default Filter
