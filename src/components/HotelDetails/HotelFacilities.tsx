import { BsWifi, BsCarFrontFill } from 'react-icons/bs'
import { FaShuttleVan } from 'react-icons/fa'
import { MdFamilyRestroom, MdSmokeFree, MdPool } from 'react-icons/md'
import { GiMeditation, GiGymBag } from 'react-icons/gi'
import cn from 'classnames'
import HotelFacilityItem from './HotelFacilityItem'

const SIZE = 24

interface FacilityConfig {
  icon: JSX.Element
  description: string
}

type FacilityName =
  | 'Free WiFi'
  | 'Parking'
  | 'Airport Shuttle'
  | 'Family Rooms'
  | 'Non-Smoking Rooms'
  | 'Outdoor Pool'
  | 'Spa'
  | 'Fitness Center'

type FacilityConfigs = Record<FacilityName, FacilityConfig>

const FACILITY_CONFIG: FacilityConfigs = {
  'Free WiFi': {
    icon: <BsWifi className="text-blue-600" size={SIZE} />,
    description: 'Internet access available in all areas',
  },
  Parking: {
    icon: <BsCarFrontFill className="text-emerald-600" size={SIZE} />,
    description: 'Convenient parking options available',
  },
  'Airport Shuttle': {
    icon: <FaShuttleVan className="text-violet-600" size={SIZE} />,
    description: 'Shuttle service to airport available',
  },
  'Family Rooms': {
    icon: <MdFamilyRestroom className="text-rose-600" size={SIZE} />,
    description: 'Comfortable accommodations suitable for families',
  },
  'Non-Smoking Rooms': {
    icon: <MdSmokeFree className="text-amber-600" size={SIZE} />,
    description: 'Rooms and areas designated for non-smoking guests',
  },
  'Outdoor Pool': {
    icon: <MdPool className="text-cyan-600" size={SIZE} />,
    description: 'Seasonal pool with seating area',
  },
  Spa: {
    icon: <GiMeditation className="text-fuchsia-600" size={SIZE} />,
    description: 'Relaxation and wellness services offered',
  },
  'Fitness Center': {
    icon: <GiGymBag className="text-orange-600" size={SIZE} />,
    description: 'Well-equipped exercise area for guest use',
  },
}

interface Props {
  facilities: string[]
  className?: string
}

const HotelFacilities = ({ facilities, className }: Props) => {
  return (
    <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 cursor-pointer', className)}>
      {facilities.map((facilityName) => {
        const facility = FACILITY_CONFIG[facilityName as FacilityName]
        return (
          <HotelFacilityItem
            key={facilityName}
            icon={facility.icon}
            title={facilityName}
            description={facility.description}
          />
        )
      })}
    </div>
  )
}

export default HotelFacilities
