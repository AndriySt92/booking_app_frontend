import { IHotel } from '../../types/hotelTypes'
import { HomeHotelCard } from '../'

interface Props {
  hotels: IHotel[]
}

const HomeHotels = ({ hotels }: Props) => {
  return (
    <div>
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p className="sm:text-lg mb-5">Most recent desinations added by our hosts</p>
      <div className="grid">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {hotels.map((hotel) => (
            <HomeHotelCard hotel={hotel} key={hotel._id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeHotels
