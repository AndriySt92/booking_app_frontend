import { useSearchContext } from '../../hooks'
import { IHotelsCountriesSummary } from '../../types/hotelTypes'
import { useNavigate } from 'react-router-dom'
import { Text } from '../'

interface Props {
  hotelsCountriesSummaryItem: IHotelsCountriesSummary
}

const HomeSliderCard = ({ hotelsCountriesSummaryItem }: Props) => {
  const { total, country, hotelImageUrl } = hotelsCountriesSummaryItem
  const { saveSearchValues } = useSearchContext()
  const navigate = useNavigate()

  const handleClick = () => {
    saveSearchValues({ destination: country })
    navigate('/search')
  }

  return (
    <div className="relative cursor-pointer animate-slideIn mx-[6px] group" onClick={handleClick}>
      {/* Hotel Image */}
      <div className="relative h-[330px] shadow-lg rounded overflow-hidden cursor-pointer group">
        <img
          src={hotelImageUrl}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          alt="Hotel slide"
        />
      </div>

      {/* Hotel number*/}
      <div
        className="absolute top-4 right-4 flex items-center gap-1 bg-white/70
                   px-3 py-1 rounded-full shadow-sm transform transition-all
                   duration-300 group-hover:bg-white/90">
        <Text className="text-gray-700 font-medium" as="span">
          <Text className="text-lg" size="md" as="span">
            {total}
          </Text>
          <Text className="!text-sm ml-1" as="span">
            HOTELS
          </Text>
        </Text>
      </div>

      {/* Hotel country */}
      <div className="absolute bottom-0 flex justify-between px-2 py-3 w-full bg-black bg-opacity-50 p-3 backdrop-blur-sm rounded-b-lg">
        <div
          className="flex items-center gap-2 opacity-90 group-hover:opacity-100
                     transition-opacity duration-300">
          <Text className="text-white" size="lg" as="span">
            {country}
          </Text>
          <Text className="text-white" size="lg" as="span">
            •
          </Text>
          <Text
            className="text-gray-900 bg-white/60 px-2 py-1 rounded-full
                        transition-all duration-200 group-hover:bg-white/70
                        group-hover:translate-x-2"
            size="sm"
            as="span">
            Explore Now →
          </Text>
        </div>
      </div>
    </div>
  )
}

export default HomeSliderCard
