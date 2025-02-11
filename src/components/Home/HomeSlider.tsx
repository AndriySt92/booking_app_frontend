import Slider from 'react-slick'
import { IHotelsCountriesSummary } from '../../types/hotelTypes'
import { sliderSettings } from '../../config/sliderConfig'
import { HomeSliderCard } from '../'

interface Props {
  hotelsCountriesSummary: IHotelsCountriesSummary[]
}

const HomeSlider = ({ hotelsCountriesSummary }: Props) => {
  return (
    <div>
      <h2 className="text-3xl font-bold">Explore Popular Destinations</h2>
      <div className="sm:text-lg mb-5">
        Discover the most popular countries and their unique stays, handpicked for you.
      </div>
      <div className="-mx-[6px]">
        <Slider {...sliderSettings}>
          {hotelsCountriesSummary.map((item) => (
            <HomeSliderCard key={item.hotelImageUrl} hotelsCountriesSummaryItem={item} />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default HomeSlider
