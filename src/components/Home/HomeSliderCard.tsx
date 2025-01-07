import { useSearchContext } from '../../contexts/SearchContext'
import { IHotelsCountriesSummary } from '../../types/hotelTypes'
import { useNavigate } from 'react-router-dom'

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
      <div className="h-[300px] group-hover:animate-flash">
        <img src={hotelImageUrl} className="w-full rounded-lg h-full object-cover object-center" />
      </div>
      <div className="absolute bottom-0 flex justify-between px-2 py-1 bg-black bg-opacity-40 w-full rounded-b-md">
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-tight"> {country}</span>
          <span className="text-white  tracking-tight">
            {total} hotel{total > 1 ? 's' : ''} available
          </span>
        </div>
      </div>
    </div>
  )
}

export default HomeSliderCard
