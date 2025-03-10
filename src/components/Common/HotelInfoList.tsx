import { BsBuilding, BsMap } from 'react-icons/bs'
import { FaPerson } from 'react-icons/fa6'
import { BiMoney, BiStar } from 'react-icons/bi'
import { MdChildCare } from 'react-icons/md'
import cn from 'classnames'
import { HotelInfoBox } from '../'

interface Props {
  city: string
  type: string
  pricePerNight: number
  childCount: number
  adultCount: number
  starRating: number
  className?: string
}

const HotelInfoList = ({
  city,
  type,
  pricePerNight,
  childCount,
  adultCount,
  starRating,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4',
        className,
      )}>
      <HotelInfoBox
        icon={<BsMap className="text-blue-600" size={20} />}
        title="Location"
        text={`${city}`}
      />
      <HotelInfoBox
        icon={<BsBuilding className="text-green-600" size={20} />}
        title="Property Type"
        text={type}
      />
      <HotelInfoBox
        icon={<BiMoney className="text-purple-600" size={20} />}
        title="Price"
        text={`€${pricePerNight}/night`}
      />
      <HotelInfoBox
        icon={<MdChildCare className="text-orange-600" size={20} />}
        title="Children capacity"
        text={`${childCount} guests`}
      />
      <HotelInfoBox
        icon={<FaPerson className="text-red-600" size={20} />}
        title="Adult capacity"
        text={`${adultCount} guests`}
      />
      <HotelInfoBox
        icon={<BiStar className="text-yellow-600" size={20} />}
        title="Rating"
        text={`${starRating} Stars`}
      />
    </div>
  )
}

export default HotelInfoList
